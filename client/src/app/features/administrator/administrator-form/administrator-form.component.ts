import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ApiService } from '../../../core/service/api/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss']
})
export class AdministratorFormComponent implements OnInit {

  isInit: boolean;
  isProcessing: boolean;
  metadata: any;
  uploadedFiles: any;
  form: FormGroup;
  itemId: number;
  canChangePass: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.isInit = true;
    this.isProcessing = false;
    this.metadata = {
      jobs: [],
      selectedItem: {
        job: []
      }
    };
    this.uploadedFiles = [];
    this.canChangePass = false;
  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.itemId = +params.id;
        this.fetchData();
      } else {
        this.getMetadata();
      }
    });
  }

  initForm() {
  	this.form = this.fb.group({
  		username: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
      //re_password: ['', Validators.required],
      role_id: ['', Validators.compose([
          Validators.required,
          CustomValidators.digits
        ])
      ]
  	});
  }

  getMetadata() {
    this.api.get(['/administrators', 'getMetadata']).subscribe(
      (data: any) => {
        this.metadata.roles = data.result.roles || [];
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  fetchData() {
    this.api.get(['/administrators', 'view', this.itemId]).subscribe(
      (data: any) => {
        this.metadata.administrator = data.result.administrator || {};
        this.metadata.roles = data.result.roles || [];
        this.setDataForForm();
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  setDataForForm() {
    for (let field in this.metadata.administrator) {
      if (field === 'password') {
        this.form.setControl('password', new FormControl());
        // do nothing
      } else {
        if (this.form.controls[field]) {
          this.form.controls[field].setValue(this.metadata.administrator[field]);
        }
      }
    }
  }

  onSubmit() {
    this.isProcessing = true;
    let func: any;
    let summary: string;
    const data: any = this.form.value;
    if (this.itemId) {
      summary = 'Updated';
      func = this.api.post(['administrators', 'update', this.itemId], data);
    } else {
      summary = 'Added';
      func = this.api.post(['administrators', 'create'], data);
    }
    func.subscribe(
      (data: any) => {
        this.router.navigate(['/administrators']);
      }, () => {
        //
      }, () => {
        this.isProcessing = false;
      }
    );
  }

  setJob(e: any) {
    (<FormControl>this.form.controls['manager_id']).setValue(e.id);
    _.forEach(this.metadata.jobs, (item: any) => {
      if (item.id === e.id) {
        this.metadata.selectedItem.job.push(item);
      }
    });
  }

  onUpload(e: any) {
    for(let file of e.files) {
      this.uploadedFiles.push(file);
    }
  }

  showBox() {
    this.canChangePass = true;
    this.form.controls['password'].setValidators([Validators.required]);
    //this.form.registerControl('password', new FormControl(['', Validators.required]));
    this.form.controls['password'].updateValueAndValidity();
  }

  hideBox() {
    this.canChangePass = false;
    //this.form.controls['password'].setValidators([]);
    this.form.setControl('password', new FormControl());
    this.form.controls['password'].updateValueAndValidity();
  }

}
