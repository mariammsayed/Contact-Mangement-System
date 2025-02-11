import { Signup } from './../../interfaces/signup';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Adminsignup } from '../../interfaces/adminsignup';
import { Adminlogin } from '../../interfaces/adminlogin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  isShow:boolean=true;
  signupForm!:FormGroup ; 
  loginForm!:FormGroup;
  valid:boolean=false

  constructor(private httpClient:HttpClient , private router:Router , private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })

    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    
  }

  signup():void{
    this.isShow=false
  }

  login():void{
    this.isShow=true
  }
  adminSignUp():void{
    this.httpClient.post<Signup>('http://localhost:3000/admin-SignUp',this.signupForm.value).subscribe((res)=>{
      const user = res;
      if (user) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Your Sign Up Successfully ${res.name.split(' ')[0]}`,
                  showConfirmButton: false,
                  timer: 1500
                });
        this.isShow=true
      }else{
        alert(`Sign Up Failed`);
      }
      this.signupForm.reset();

    },
  (err)=>{
    alert('Somthing Went Wrong please try again'); 
    this.signupForm.reset();
  })}


  adminLogin():void{
    
    this.httpClient.get<Adminsignup[]>('http://localhost:3000/admin-SignUp').subscribe((res)=>{
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
        this.router.navigate(['/admin-view']);
        localStorage.setItem('adminData', JSON.stringify(user))
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

}