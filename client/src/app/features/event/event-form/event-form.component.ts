import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ApiService } from '../../../core/service/api/api.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  isInit: boolean;
  isProcessing: boolean;
  metadata: any;
  uploadedFiles: any;
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
    this.uploadedFiles = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.itemId = +params.id;
        this.fetchData(params.id);
      } else {
        this.isInit = false;
      }
    });
    this.initForm();
  }

  initForm() {
  	this.form = this.fb.group({
  		title: ['', Validators.required],
      organizer: '',
      location: '',
      address: '',
      users: '',
      start_date: ['', Validators.required],
      end_date: '',
      description: '',
  	});
  }

  fetchData(id: string) {
    this.api.get(['/events', 'view', id, false]).subscribe(
      (data: any) => {
        this.metadata.event = data.result.event || {};
        // this.metadata.provinces = data.result.provinces || [];
        // this.metadata.provinces.filter((obj: any) => {
        //   obj.text = obj.name;
        // });
        // this.metadata.districts = data.result.districts || [];
        this.metadata.users = data.result.users || [];
        // this.metadata.users.filter((obj: any) => {
        //   const _cloneObj = obj;
        //   obj.label = obj.fullname;
        //   obj.value = _cloneObj;
        // });
        // console.log(this.metadata.users);
        this.setDataForForm();
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  setDataForForm() {
    for (let field in this.metadata.event) {
      if (field === 'job_id' || field === 'province_id' || field === 'district_id') {
        // for (let officer of this.team[field]) {
        //   this.addOfficer(officer);
        // }
      } else {
        if (this.form.controls[field]) {
          this.form.controls[field].setValue(this.metadata.event[field]);
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
      func = this.api.post(['events', 'update', this.itemId], data);
    } else {
      summary = 'Added';
      func = this.api.post(['events', 'create'], data);
    }
    func.subscribe(
      (data: any) => {
        this.router.navigate(['/events']);
      }, () => {
        this.isProcessing = false;
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

  setMemberData(e: any, added: boolean = true) {
    // console.log(this.form.controls.users.value);
    // console.log(e, added);
  }

  convertDate(e: any, field: string) {
    const date = moment(e).format('DD/MM/YYYY');
    if (this.form.controls[field]) {
      this.form.controls[field].setValue(date);
    }
  }

}
