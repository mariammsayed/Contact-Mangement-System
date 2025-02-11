import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-admin-page',
  imports: [RouterLink],
  templateUrl: './navbar-admin-page.component.html',
  styleUrl: './navbar-admin-page.component.scss'
})
export class NavbarAdminPageComponent {
  logOut():void{
    localStorage.removeItem('adminData');
  }
}
