import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ApiService } from '../../../core/service/api/api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

const apiBaseUrl = `${environment.apiBaseUrl}`;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  isInit: boolean;
  isProcessing: boolean;
  userType: string;
  metadata: any;
  uploadedFiles: any;
  form: FormGroup;
  itemId: number;
  urlUpload: any;

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
      completedDistricts: [],
      selectedItem: {
        job: []
      }
    };
    this.uploadedFiles = [];
    this.urlUpload = {};
    this.urlUpload['image'] = `${apiBaseUrl}/files/upload/images`;
    this.urlUpload['avatar'] = `${apiBaseUrl}/files/upload/avatar`;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initForm();
      if (params.id) {
        this.itemId = +params.id;
        this.urlUpload['image'] += `/${this.itemId}`;
        this.urlUpload['avatar'] += `/${this.itemId}`;
        this.fetchData();
      } else {
        this.getMetadata();
      }
      this.userType = params.slug;
    });
  }

  initForm() {
  	this.form = this.fb.group({
  		fullname: ['', Validators.required],
      code: ['', Validators.required],
      phone: '',
      email: '',
      facebook: '',
      nickname: '',
      birthday: '',
      barcode: '',
      avatar: '',
      address: '',
      province_id: ['', Validators.compose([
          CustomValidators.digits
        ])
      ],
      district_id: ['', Validators.compose([
          CustomValidators.digits
        ])
      ],
      job_id: ['', Validators.compose([
          CustomValidators.digits
        ])
      ]
  	});
  }

  getMetadata() {
    this.api.get(['users', 'getMetadata']).subscribe(
      (data: any) => {
        this.metadata.provinces = data.result.provinces || [];
        this.metadata.provinces.filter((obj: any) => {
          obj.text = obj.name;
        });

        this.metadata.jobs = data.result.jobs || [];
        this.metadata.jobs.filter((obj: any) => {
          obj.text = obj.name;
        });
        this.metadata.districts = data.result.districts || [];
        this.metadata.districts.filter((obj: any) => {
          obj.text = obj.name;
        });
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  fetchData() {
    this.api.get(['users', 'view', this.itemId, 1]).subscribe(
      (data: any) => {
        this.metadata.user = data.result.user || {};
        this.metadata.provinces = data.result.provinces || [];
        this.metadata.provinces.filter((obj: any) => {
          obj.text = obj.name;
        });

        this.metadata.jobs = data.result.jobs || [];
        this.metadata.jobs.filter((obj: any) => {
          obj.text = obj.name;
        });
        this.metadata.districts = data.result.districts || [];
        this.metadata.districts.filter((obj: any) => {
          obj.text = obj.name;
        });
        this.setDataForForm();
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  setDataForForm() {
    for (let field in this.metadata.user) {
      if (field === 'job_id' || field === 'province_id' || field === 'district_id') {
        let key: string = field.split('_')[0];
        this.metadata.selectedItem[key] = [];
        let activeItem = this.metadata[`${key}s`].find((obj: any) => {
          return +obj.id === +this.metadata.user[field];
        });
        this.metadata.selectedItem[key] = activeItem ? [activeItem] : null;
        if (field === 'province_id') {
          this.processDistricts(this.metadata.user[field]);
        }
      }
      if (this.form.controls[field]) {
        this.form.controls[field].setValue(this.metadata.user[field]);
      }
    }
  }

  onSubmit() {
    this.isProcessing = true;
    let func: any;
    let summary: string;
    const data: any = this.form.value;
    data['is_internal'] = this.userType === 'internal' ? 1 : 0;
    if (this.itemId) {
      summary = 'Updated';
      func = this.api.post(['users', 'update', this.itemId], data);
    } else {
      summary = 'Added';
      func = this.api.post(['users', 'create'], data);
    }
    func.subscribe(
      (data: any) => {
        this.router.navigate(['/users', this.userType]);
      }, () => {
        this.isProcessing = false;
      }, () => {
        this.isProcessing = false;
      }
    );
  }

  setField(e: any, field: string) {
    (<FormControl>this.form.controls[field]).setValue(e.id);
    if (field === 'province_id') {
      this.processDistricts(+e.id);
    }
  }

  processDistricts(id: number) {
    this.metadata.selectedItem.district = null;
    this.metadata.completedDistricts = [];
    _.forEach(this.metadata.districts, (item: any) => {
      if (item.province_id === id) {
        this.metadata.completedDistricts.push(item);
      }
    });
  }

  onUpload(e: any) {
    this.uploadedFiles = JSON.parse(e.xhr.response).result || [];
  }

  convertDate(e: any, field: string) {
    const date = moment(e).format('DD/MM/YYYY');
    if (this.form.controls[field]) {
      this.form.controls[field].setValue(date);
    }
  }
}
