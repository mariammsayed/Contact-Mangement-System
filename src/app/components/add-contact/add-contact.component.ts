import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  imports: [ReactiveFormsModule , RouterLink],
  
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup | any;


  constructor(private formBuilder: FormBuilder , private router: Router , private api:ApiService) { } 

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required]
    });
  }

   submitContact(data:Iuser) {
    this.api.addContact(data).subscribe(async res => {
      this.contactForm.reset();
      await this.router.navigate(['/Contact-List']);
    });

  }
}