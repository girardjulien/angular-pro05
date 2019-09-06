import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value["email"] == "julien.girard77@free.fr" && form.value["password"] == "123") {
      this.router.navigate(
        ["/albums"],
        {queryParams : {message : "success"}}
      );
    } else {
      this.messageError = "Error email or password";
    }
  }

}
