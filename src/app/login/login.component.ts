import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private authService: AuthService, private router: Router) {}
  error: string;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products/list']);
    }
  }

  onSubmit(data): void {
    this.blockUI.start('');
    this.authService
      .login(data)
      .then(() => {
        this.error = '';
        this.blockUI.stop();
        this.router.navigate(['/products/list']);
      })
      .catch((err) => {
        this.error = err;
        this.blockUI.stop();
      });
  }

  viewPublicProducts(): void {
    this.router.navigate(['/products/public-list']);
  }
}
