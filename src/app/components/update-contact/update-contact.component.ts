import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute,Params, RouterLink } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-contact',
  imports: [FormsModule,RouterLink],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.scss'
})
export class UpdateContactComponent implements OnInit {
  contactId:string = '';
  contactData:Iuser = {} as Iuser;
  constructor(private readonly api:ApiService , private activatedroute:ActivatedRoute , private router:Router){}
  ngOnInit(): void {
    this.activatedroute.params.subscribe((params:Params)=>{
      this.contactId = params['id'];
    })
    this.api.fetchContact(this.contactId).subscribe((data:Iuser)=>{
      this.contactData = data
      console.log(data);
      
    }
    
  );
    
    
  }


  update(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFDF00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateContact(this.contactId,this.contactData).subscribe((data)=>{
          this.router.navigate(['/Contact-List']);
        })
      }
        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success"
        });
      }
    
    );
    
  }
}