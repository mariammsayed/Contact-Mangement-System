import { Routes, CanActivateFn } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { authGuard } from './shared/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';

export const routes: Routes = [
    {path:"Contact-List" , component:ContactListComponent  , title:"Contact List" , canActivate:[authGuard]},
    {path:"Add-Conatct" , component:AddContactComponent  , title:"Add Contact", canActivate:[authGuard]},
    {path:"Update-Contact/:id" , component:UpdateContactComponent  , title:"Update Contact",canActivate:[authGuard]},
    {path:"login" , component:LoginSignupComponent  , title:"Login"},
    {path:"admin" , component:AdminComponent , title:"Admin"},
    {path:"admin-view" , component:AdminViewComponent , title:"Admin" , canActivate:[authGuard]},
    {path:"server-Error" , component:ServerErrorComponent  , title:"Server Error"},
    {path:"" , redirectTo:"login"  , title:"Login" , pathMatch:"full"},
    {path:"**" , component:PageNotFoundComponent , title:"Page Not Found" , pathMatch:"full"},
];
