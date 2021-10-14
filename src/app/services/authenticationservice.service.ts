import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationserviceService {

  constructor() { }

  getToken() {
    if(typeof sessionStorage.getItem('auth_token') != 'undefined' && sessionStorage.getItem('auth_token') != '' && sessionStorage.getItem('auth_token') != null) {
      return sessionStorage.getItem('auth_token');
    } else {
      return '';
    }
  }
}
