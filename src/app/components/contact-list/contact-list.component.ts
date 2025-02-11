import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../../services/api.service';
import { Iuser } from '../../interfaces/iuser';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { LoderComponent } from "../loder/loder.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list',
  imports: [NavbarComponent, RouterLink, ReactiveFormsModule, FormsModule, FooterComponent, LoderComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit{
  users?:Iuser[];
  filteredUsers?:Iuser[];
  searchText:any;
  isLoading:boolean = true
  constructor(private readonly api:ApiService){

  }
  ngOnInit(): void {
    this.api.getContact().subscribe({
      next:async res=>{
        this.users = Array.isArray(res) ? res : [res];
        this.isLoading = false
        
      }
    })
    
  }


  delete(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteContact(id).subscribe({
          next: res=>{
            this.api.getContact().subscribe({
              next: async res=>{
                this.users = Array.isArray(res) ? res : [res];
              }
            })
          }
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your Contact has been deleted.",
          icon: "success"
        });
      }
    });

  }


  search(){
    this.filteredUsers = this.users?.filter(user => user.firstName.toLowerCase().includes(this.searchText.toLowerCase()));
    this.isLoading = false
  
    
  }
}
