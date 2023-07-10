import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostsService } from 'src/app/services/posts.service';
import { Posts } from 'src/models/Posts';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  toastrMessage:string = ''
  toastrType:string = ''
  loading: boolean = true;
  posts: Posts[] = [];
  post_title: string ='';
  post_message: string ='';
  activeModalDelete:boolean = false;
  activeViewImageModal:boolean = false;
  activeModalCreate:boolean = false;
  activeUpdateModal:boolean = false;
  clickActionId:any = ''
  searchWord!: any;
  post_image_modal:string = ''

  constructor(
    private _PostsService:PostsService,
    private _Title:Title,
  ) { }

  // create pos validation
  postForm = new FormGroup({
    post_title : new FormControl('', Validators.required),
    post_message : new FormControl('', Validators.required),
    post_image : new FormControl(null, Validators.required),
  })

  // updateForm
  updatePostForm = new FormGroup({
    update_post_title : new FormControl('', Validators.required),
    update_post_message : new FormControl('', Validators.required),
    update_post_image : new FormControl(null)
  })

  onSelectImage(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.postForm.patchValue({
      post_image: file
    })
    this.postForm.get('post_image')?.updateValueAndValidity()
  }

  onSelectUpdatePostImage(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updatePostForm.patchValue({
      update_post_image: file
    })
    this.updatePostForm.get('update_post_image')?.updateValueAndValidity()
  }




  openCreateModal(){
    this.activeModalCreate = true
    console.log("created")
  }


  closeDeleteModal(){
    this.activeModalDelete = false
  }
  closeUpdateModal(){
    this.activeUpdateModal = false
  }
  closeViewImageModal(){
    this.activeViewImageModal = false
    this.post_image_modal = ''

  }
  closeCreateModal(){
    this.activeModalCreate = false
  }


  updateBtn(post: Posts){
    console.log(post)
    this.clickActionId = post.id
    this.post_title = post.post_title
    this.post_message = post.post_message
    this.activeUpdateModal = true
  }

  deleteBtn(id:number){
    this.activeModalDelete = true
    this.clickActionId = id
    console.log("delete")
  }
  viewImage(image:string){
    this.activeViewImageModal = true
    this.post_image_modal = image
  }

  showPosts(){
    this.loading = true
    this._PostsService.getPosts().subscribe(
      (response) => {
        console.log(response)
        this.posts = response
        this.loading = false
      }
    )
  }
  ngOnInit(): void {
    this.showPosts()
    this._Title.setTitle('Task | posts')
  }

  onSubmitApi(toastrMessage:string , toastrType:string){
    this.toastrMessage = toastrMessage
    this.toastrType = toastrType
    this.showPosts()

  }

  // create post
    onCreatePost(){

      this._PostsService.createPost(
          this.postForm.value.post_title,
          this.postForm.value.post_message,
          this.postForm.value.post_image,
        ).subscribe(response => {
            console.log('create response',response)
            if(response === 'Done'){
              // this.toastrMessage = 'Your Post created successfully'
              // this.toastrType = 'alert-success'

              // this.showPosts()
              this.onSubmitApi('Your Post created successfully' , 'alert-success')
              this.activeModalCreate = false
              this.postForm.reset();
            }
          }, error => {
            console.log('error in post create', error)
            if(error.status === 200) {
              this.activeModalCreate = false
              this.onSubmitApi('Your Post created successfully' , 'alert-success')

              this.activeModalCreate = false

            }
          }
        )

    }

    // request delete
    onDeletePost(){
      this._PostsService.deletePost(this.clickActionId).subscribe(response => {
        console.log('response delte',response)
        this.activeModalDelete = false
        this.onSubmitApi('Your Post deleted successfully' , 'alert-danger')

      }, error => {
        console.log('error in delte',error)
        if(error.status === 200) {
          this.activeModalDelete = false
          this.showPosts()
          this.toastrMessage = 'Post deleted successfully'
          this.toastrType = 'alert-danger'
        }
      })
    }

    // request update
    onUpdatePost(){
      console.log(this.updatePostForm.value.update_post_image)
      var formData = new FormData();
      formData.append('id', this.clickActionId);
      formData.append('post_title', this.updatePostForm.value.update_post_title || '');

      formData.append('post_message', this.updatePostForm.value.update_post_message || '');
      if(this.updatePostForm.value.update_post_image !== null){
        formData.append("post_image", this.updatePostForm.value.update_post_image || '');
      }
      this._PostsService.updatePost(
        formData
      )
      .subscribe((response) => {
        console.log(response)
        this.onSubmitApi('Your Post updated successfully' , 'alert-success')


            this.updatePostForm.reset();
            this.activeUpdateModal = false
      }, error => {
        console.log(error)
        this.onSubmitApi('Your Post updated successfully' , 'alert-success')


            this.updatePostForm.reset();
            this.activeUpdateModal = false
      }
      )
    }
}
