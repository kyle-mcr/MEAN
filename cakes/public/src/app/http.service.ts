import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  findAll(){
    return this.http.get('/api/findAll')
  }
  findOne(id){
    return this.http.get(`/api/findOne/${id}`)
  }
  create(myobj){
    return this.http.post('/api/create', myobj )
  }
  edit(myobj){
    return this.http.put(`/api/edit/${myobj._id}`, myobj)
  }
  delete(myobj){
    return this.http.delete(`/api/delete/${myobj._id}`)
  }

  findAllcakes(){
    return this.http.get('/rating/findAll')
  }
  findOnecake(id){
    return this.http.get(`/rating/findOne/${id}`)
  }
  createCake(cake){
    return this.http.post('/rating/create', cake )
  }
  editCake(cake){
    return this.http.put(`/rating/edit/${cake._id}`, cake)
  }
  deleteCake(cake){
    return this.http.delete(`/api/delete/${cake._id}`)
  }
  
  
}
