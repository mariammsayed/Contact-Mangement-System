import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (localStorage.getItem('loginData') || localStorage.getItem('adminData')) {
    return true;
  } else {

    router.navigate(['login']);
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Please Login First",
      showConfirmButton: false,
      timer: 1500
    });
    return false;
  }
};



