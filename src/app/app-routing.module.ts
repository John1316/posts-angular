import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {path:'', redirectTo:'/posts' , pathMatch:'full'},
  {path: 'posts' , component: PostsComponent },
  {path: 'about' , component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
