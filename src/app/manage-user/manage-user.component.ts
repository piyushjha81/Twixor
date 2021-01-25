import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterUserService } from '../register-user/register-user.service';
import { ManageUserService } from './manage-user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  stdArrList = [
    {
      name: "John",
      middleName: "Alex",
      lastName: "Doe",
      userId: 95,
      email: "john@gmail.com",
      mobileNo: 8888888888
    },
    {
      name: "John",
      middleName: "Alex",
      lastName: "Doe",
      userId: 95,
      email: "john@gmail.com",
      mobileNo: 8888888888
    }
  ]
  userData: any;

  constructor(
    private router: Router,
    private registerService: RegisterUserService,
    private service: ManageUserService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.stdArrList.push(this.registerService.addUserDet);
  }

  deleteRow(item) {
    const index = this.stdArrList.indexOf(item);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09bfbf',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.stdArrList.splice(index, 1);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your data has been deleted',
          icon: 'success',
          confirmButtonColor: '#09bfbf',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  editDetails(item) {
    this.service.editUserData = item;
    this.router.navigate(['/register']);
  }

}
