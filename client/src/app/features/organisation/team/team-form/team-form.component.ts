import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import * as _ from 'lodash';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  
  isInit: boolean;
  isProcessing: boolean;
  metadata: any;
  uploadedFiles: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.isInit = true;
    this.isProcessing = false;
    this.metadata = {
      employees: [],
      selectedItem: {
        manager: []
      },
      officerForView: []
    };
    this.uploadedFiles = [];
  }

  ngOnInit() {
    this.getMetadata();
    this.initForm();
  }

  initForm() {
  	this.form = this.fb.group({
  		name:['', Validators.required],
      manager_id: ['', Validators.compose([
          Validators.required,
          CustomValidators.digits
        ])
      ],
      officers: this.fb.array([]),
      url: ['', CustomValidators.url],
      description: ''
  	});
  }

  getMetadata() {
    this.metadata.employees = [
      {
        id: 1,
        text: 'Tien Le T. C.'
      },
      {
        id: 2,
        text: 'Diep Le C. T.'
      },
      {
        id: 3,
        text: 'Huy D. Q.'
      }
    ];
    this.isInit = false;
  }

  addOfficer() {
    let officer: FormGroup;
    officer = this.fb.group({
      officer_code: [''],
      user_id: ['',  Validators.compose([
          Validators.required,
          CustomValidators.digits
        ])
      ]
    });
    (<FormArray>this.form.controls['officers']).push(officer);
  }

  setOfficerId(e: any, i: any) {
    let isValid: boolean = true;
    let formData = this.form.value;
    let elm: any = (<FormControl>
                     (<FormGroup>
                       (<FormArray>this.form.controls['officers']).controls[i]).controls['user_id']);
    if (e.id === formData.manager_id) {
      //has role TM
      isValid = false;
    }
    let ind = _.findIndex(formData.officers, (item: any) => {
      return (item.user_id === e.id && item.officer_code === formData.officers[i].officer_code);
    });
    if (ind !== -1) {
      //user with role has exit
      isValid = false;
    }
    if (isValid) {
      elm.setValue(e.id);
    } else {
      elm.setValue('x');
    }
  }

  removeOfficer(index: any) {
    (<FormArray>this.form.controls['officers']).removeAt(index);
    this.form.updateValueAndValidity();
  }

  setManager(e: any) {
    (<FormControl>this.form.controls['manager_id']).setValue(e.id);
    _.forEach(this.metadata.employees, (item: any) => {
      if (item.id === e.id) {
        this.metadata.selectedItem.manager.push(item);
      }
    });
  }

  onUpload(e: any) {
    for(let file of e.files) {
      this.uploadedFiles.push(file);
    }
  }
}
