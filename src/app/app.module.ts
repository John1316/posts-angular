import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HeaderComponent } from './shared-pages/header/header.component';
import { AsideComponent } from './shared-pages/aside/aside.component';
import { AboutComponent } from './pages/about/about.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe'
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    AsideComponent,
    AboutComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
