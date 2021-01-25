import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterUserService } from './register-user.service';
import { ManageUserService } from '../manage-user/manage-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  regForm: FormGroup;
  addUserDet: any;
  userEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: RegisterUserService,
    private manageService: ManageUserService
  ) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$')]],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      middleName: ['', [Validators.pattern('^[A-Za-z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      userId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]]
    });
    this.userEdit = this.manageService.editUserData;
    if (this.userEdit) {
      this.fillUser();
    }
  }

  addUser(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'User registered successfully',
      showConfirmButton: true,
      confirmButtonColor: '#0acaca'
    }).then(res => {
      this.service.addUserDet = data;
      this.router.navigate(['/manage']);
    });
  }

  fillUser() {
    this.regForm.patchValue({
      name: this.userEdit.name,
      middleName: this.userEdit.middleName,
      lastName: this.userEdit.lastName,
      userId: this.userEdit.userId,
      email: this.userEdit.email,
      mobileNo: this.userEdit.mobileNo
    })
  }

}
