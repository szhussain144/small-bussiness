import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/api/user.service';
import { SessionService } from '../services/common/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
  registerForm: FormGroup;

  constructor(private fb:FormBuilder,private userService:UserService,private sessionService:SessionService,private router:Router){
    this.registerForm = this.fb.group({
      email: new FormControl("", [Validators.email,Validators.required]),
      password: new FormControl("", Validators.required)
    });
  }

  submitForm():void{
    if (this.registerForm.valid) {
      this.loginUser(this.registerForm.value);
    }
  }

  loginUser(userData:any):void{
    this.userService.loginUser(userData).subscribe((res:any)=>{
      if(res?.success){
        localStorage.setItem('user',JSON.stringify(res?.payload?.user));
        localStorage.setItem('token',res?.payload.jwt);
        this.sessionService.session.next(res?.payload?.user);
        if(res?.payload?.user.userType === 'BUYER')
          this.router.navigateByUrl('/');
        else
          this.router.navigateByUrl('/my-products');
      }
    })
  }
}
