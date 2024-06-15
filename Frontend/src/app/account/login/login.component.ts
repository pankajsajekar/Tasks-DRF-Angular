import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private accountService: AccountService,
    private router: Router,
  ){}

  loginForm!: FormGroup;
  username: any;
  password: any;

  login() {
    console.log(this.username, this.password)
    this.accountService.login(this.username, this.password).subscribe({
      next: (res:any) => {
        console.log(res) 
        const user = res.data
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/'])
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }


}
