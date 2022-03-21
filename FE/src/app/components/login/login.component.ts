import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MustMatch } from './MustMatch';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLogin: boolean = false;
  public isLoading: boolean = false;
  public formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public formRegister: FormGroup = this.formBuilder.group({});
  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group(
      {
        userID: uuidv4(),
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        name: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(`(84|0[3|5|7|8|9])+([0-9]{8})`),
          ],
        ],
        address: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onLogin(login: string): void {
    if (login === 'register') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  userLogin() {
    if (this.formLogin.invalid) {
      return;
    } else {
      this.loginService
        .loginUser(this.formLogin.value)
        .subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            localStorage.setItem('userID', res.data.userID);
            alert(
              'Đăng nhập thành công. Nhấn OK để chuyển sang trang mua hàng.'
            );
            this.loginService.name$.next(res.data.name);
            this.router.navigate(['/']);
          } else {
            alert('Sai email hoặc mật khẩu.');
          }
        });
    }
  }

  userRegister() {
    if (this.formRegister.invalid) {
      return;
    } else {
      this.loginService
        .registerUser(this.formRegister.value)
        .subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            alert(res.msg);
            this.isLogin = true;
          } else {
            alert(res.msg);
          }
        });
    }
  }
}
