import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../../interfaces/signup';
import { Signin } from '../../interfaces/signin';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-signup',
  imports: [ReactiveFormsModule ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit{
  constructor(private formBuilder:FormBuilder , private httpClient:HttpClient , private router:Router) { }
  signUpForm!:FormGroup | any;
  loginForm!:FormGroup | any;
  isShow:boolean=false;
  valid:boolean=false

  signUp():void{
    this.isShow=true
  }

  login():void{
    this.isShow=false
  }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['' , Validators.required],
      email: ['' , Validators.required],
      password: ['' , Validators.required]
    })

    this.loginForm = this.formBuilder.group({
      email: ['' , Validators.required],
      password: ['' , Validators.required]
    })
  }

  submit():void{
    this.httpClient.post<Signup>('http://localhost:3000/signup',this.signUpForm.value).subscribe(res=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Your Sign Up Successfully ${res.name.split(' ')[0]}`,
        showConfirmButton: false,
        timer: 1500
      });
      this.signUpForm.reset();
      this.isShow=false
    })
  }

  loginUser():void{
    this.httpClient.get<Signin[]>('http://localhost:3000/signup').subscribe((res)=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if(user){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        this.loginForm.reset();
        this.router.navigate(['/Contact-List']);
        localStorage.setItem('loginData', JSON.stringify(user))

      }else{
        this.valid=true


      }
    },
    err=>{
      
      this.loginForm.reset();
      this.router.navigate(['/server-Error']);

    }
   
  )

  }


  loginAdmin(){
    this.router.navigate(['/admin']);
  }

  
}
