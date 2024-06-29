import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if(this.loginForm.invalid){
      this.toastrService.info("Please Fill Username and Password");
      return 
    }
    this.accountService.login(this.loginForm.value).subscribe({
      next: (res:any) => {
        console.log(res) 
        localStorage.setItem('token', JSON.stringify(res['token']));
        this.router.navigate(['/'])
        this.toastrService.success("Login Successfully");
      },
      error: (error:any) => {
        console.log(error)
        this.toastrService.error(error.error['error']);
      }
    })
  }

  register(){
    if(this.loginForm.invalid){
      this.toastrService.info("Please Fill Username and Password");
      return 
    }
    this.accountService.register(this.loginForm.value).subscribe({
      next: (res:any) => {
        console.log(res) 
        this.toastrService.success("Register Successfully, now you can login");
      },
      error: (error:any) => {
        if(error.error['username']){
          this.toastrService.error(error.error['username']);
        }
        else{
          this.toastrService.error(error.error['error']);
        }
        console.log(error)
      }
    })
  }


}
