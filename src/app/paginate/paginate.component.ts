import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() aPerPage: number;

  currentPageSubscription;

  constructor(private albumS: AlbumService) {

    this.currentPageSubscription = this.albumS.sendCurrentNumberPage;
    this.currentPageSubscription.subscribe(
      page => {
        this.currentPage = page; 
      }
    );

  }

  ngOnInit() {
    this.numberPages = Math.ceil(this.albumS.countAlbums() / this.aPerPage);
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
    const start = (this.currentPage - 1) * this.aPerPage;
    this.paginate.emit({start: start, end: start + this.aPerPage});
  }

  // component est retiré du DOM
  ngOnDestroy(){
    console.log('destroy...');

    // this.currentPageSubscription.unsubscribe();
  }

}
