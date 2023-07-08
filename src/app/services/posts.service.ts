import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Posts } from '../../models/Posts';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private _HttpClient:HttpClient
  ) { }


  // get all Posts function
  getPosts() : Observable<any>{

    return this._HttpClient.get<Posts[]>( `${environment.apiUrl}/api/getposts`)
  }
    // get Post detail function


  // create Posts function
  createPost(
    post_title: any,
    post_message: any,
    post_image: any,

  ): Observable<any>{
    var formData = new FormData();
    formData.append('post_title',post_title);
    formData.append('post_message',post_message);
    formData.append('post_image',post_image);
    return this._HttpClient.post<Posts[]>(`${environment.apiUrl}/api/create` , formData , {
      responseType: 'text' as 'json'
    })
  }

    // update Posts function

  updatePost(
    formData: any
  ):Observable<any>{


    return this._HttpClient.post<Posts[]>(`${environment.apiUrl}/api/updatepost` , formData , { responseType: 'text' as 'json' })
  }

  // delete Posts function
  deletePost(formData:number):Observable<any>{
    return this._HttpClient.post<Posts[]>(`https://task.astra-tech.net/fronendtask/public/api/deletepost` , {id: formData} , {
      responseType: 'text' as 'json'
    })
  }

}
