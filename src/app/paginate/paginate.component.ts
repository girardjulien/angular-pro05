import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  albumPerPage: number = 3;
  numberPages: number;
  pages: number[] = [];
  currentPage: number = 1;

  @Output() paginate: EventEmitter<{start: number, end: number}> = new EventEmitter();

  constructor(private albumS: AlbumService) {
    this.albumS.sendCurrentNumberPage.subscribe(page => {
      this.currentPage = page;
    });
  }

  ngOnInit() {
    this.numberPages = Math.ceil(this.albumS.countAlbums() / this.albumPerPage);
    this.pages = [... Array(this.numberPages).keys()];
  }

  next() {
    if (this.currentPage < this.numberPages) {
      this.currentPage++;
      this.calculStartEnd();
    }
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculStartEnd();
    }
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.calculStartEnd();
  }

  calculStartEnd() {
    this.albumS.currentPage(this.currentPage);
    const start = (this.currentPage - 1) * this.albumPerPage;
    this.paginate.emit({start: start, end: start + this.albumPerPage});
  }

}
