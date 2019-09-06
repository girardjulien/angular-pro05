import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album } from'../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter();
  @Output() reload: EventEmitter<boolean> = new EventEmitter();
  isSubmit: boolean = false;

  constructor(private albumS : AlbumService) { }

  ngOnInit() {
  }

  onChangeEmit($event: string) {
    console.log($event);

    if ($event.length == 0 && this.isSubmit) this.reload.emit(true);
  }

  onSubmit(form: NgForm) {
    const word = form.value['word'];
    const results = this.albumS.search(word);
    if (results) {
      this.searchAlbums.emit(results);
      this.isSubmit = true;
    }
  }

}
