import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ApiService } from '../../../core/service/api/api.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  isInit: boolean;
  isProcessing: boolean;
  metadata: any;
  form: FormGroup;
  itemId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.isInit = true;
    this.isProcessing = false;
    this.metadata = {
      completedUsers: []
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.itemId = +params.id;
        this.fetchData(params.id);
      } else {
        this.getMetadata();
      }
    });
    this.initForm();
  }

  initForm() {
  	this.form = this.fb.group({
  		name: ['', Validators.required],
      users: '',
      description: '',
  	});
  }

  fetchData(id: string) {
    this.api.get(['groups', 'view', id, false]).subscribe(
      (data: any) => {
        this.metadata.group = data.result.group || {};
        this.metadata.users = data.result.users || [];
        this.setDataForForm();
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  getMetadata() {
    this.api.get(['groups', 'getMetadata']).subscribe(
      (data: any) => {
        this.metadata.users = data.result.users || [];
      }, (err) => {
        this.isInit = false;
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  setDataForForm() {
    for (let field in this.metadata.group) {
      if (field === 'job_id' || field === 'province_id' || field === 'district_id') {
        // for (let officer of this.team[field]) {
        //   this.addOfficer(officer);
        // }
      } else {
        if (this.form.controls[field]) {
          this.form.controls[field].setValue(this.metadata.group[field]);
        }
      }
    }
    // this.formTeam.controls['manager_id'].valueChanges.subscribe(
    //   () => {
    //     this.changedControl.manager_id = true;
    //   }
    // );
  }

  onSubmit() {
    this.isProcessing = true;
    let func: any;
    let summary: string;
    const data: any = this.form.value;
    if (this.itemId) {
      summary = 'Updated';
      func = this.api.post(['groups', 'update', this.itemId], data);
    } else {
      summary = 'Added';
      func = this.api.post(['groups', 'create'], data);
    }
    func.subscribe(
      (data: any) => {
        this.router.navigate(['/groups']);
      }, () => {
        this.isProcessing = false;
      }, () => {
        this.isProcessing = false;
      }
    );
  }

  searchUser(e: any) {
    this.metadata.completedUsers = [];
    let _query: string;
    if (e.query) {
      _query = e.query.toLowerCase();
    } else {
      _query = '';
    }
    for (let obj of this.metadata.users) {
      if (obj.fullname.toLowerCase().indexOf(_query) > -1) {
        this.metadata.completedUsers.push(obj);
      }
    }
  }

}
