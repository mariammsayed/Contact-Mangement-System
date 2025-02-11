import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser';
import { Signup } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  addContact(data:Iuser){
    return this.httpClient.post<Iuser>('http://localhost:3000/users',data)
  }
  getContact(){
    return this.httpClient.get<Iuser>('http://localhost:3000/users')
  }

  deleteContact(id:string){
    return this.httpClient.delete<Iuser>(`http://localhost:3000/users/${id}`)
  }
  
  fetchContact(id:string){
    return this.httpClient.get<Iuser>(`http://localhost:3000/users/${id}`)
  }

  updateContact(id:string,data:Iuser){
    return this.httpClient.put<Iuser>(`http://localhost:3000/users/${id}`,data)
}


getUsers(){
  return this.httpClient.get<Signup>('http://localhost:3000/signup')
}

deleteUser(id:string){
  return this.httpClient.delete<Signup>('http://localhost:3000/signup/'+id)
}

}