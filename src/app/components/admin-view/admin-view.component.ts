import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { NavbarAdminPageComponent } from "../navbar-admin-page/navbar-admin-page.component";
import { Signup } from '../../interfaces/signup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view',
  imports: [NavbarAdminPageComponent],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {
  users!:Signup[] ; 

  constructor(private readonly apiService:ApiService){}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe( async res=>{
      this.users = Array.isArray(res) ? res : [res];
      
    }
    
    )
    
  }

  
  deleteUser(user:Signup):void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(user.id).subscribe(res=>{
          this.apiService.getUsers().subscribe( async res=>{
            this.users = Array.isArray(res) ? res : [res]; 
          }
          )
        })
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }






}


