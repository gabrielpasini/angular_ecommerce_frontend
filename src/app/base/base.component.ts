import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'products',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private authService: AuthService, private router: Router) {}
  public logged: boolean;
  public activeRoute: string;

  ngOnInit(): void {
    this.activeRoute = window.location.pathname;
    this.logged = this.authService.isLoggedIn();
    if (!this.logged && this.activeRoute !== '/products/public-list') {
      this.router.navigate(['/login']);
      return;
    }
  }

  logout(): void {
    this.blockUI.start('');
    this.authService.logout().then(() => {
      this.blockUI.stop();
      this.router.navigate(['/login']);
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
