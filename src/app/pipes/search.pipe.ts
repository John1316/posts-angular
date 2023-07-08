import { Pipe, PipeTransform } from '@angular/core';
import { Posts } from 'src/models/Posts';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(posts:Posts[] , searchWord:string): any {
    if (searchWord == undefined) {
      return posts;
    }
      return posts.filter((post) => {
        return post.post_title.toLowerCase().includes(searchWord.toLowerCase()) || post.post_message.toLowerCase().includes(searchWord.toLowerCase());
      });
  }

}
