import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
