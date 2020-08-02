import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  errorMsg: string;

  login(data): Promise<void> {
    return this.http
      .post(`${baseUrl}auth/local`, data)
      .toPromise()
      .then(({ jwt }: any) => {
        this.setToken(jwt);
        return Promise.resolve();
      })
      .catch((err) => {
        this.setToken(null);
        if (err.error.message[0].messages[0].message) {
          this.errorMsg = err.error.message[0].messages[0].message;
        } else {
          this.errorMsg = 'Unknown Error!';
        }
        return Promise.reject(this.errorMsg);
      });
  }

  logout(): Promise<boolean> {
    this.setToken(null);
    return Promise.resolve(true);
  }

  setToken(jwt: string | null): boolean {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
    return !!jwt;
  }

  getJwt(): string {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
