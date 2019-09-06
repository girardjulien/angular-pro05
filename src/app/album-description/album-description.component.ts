import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from'@angular/router';
import { Album } from '../album';
import { AlbumService } from'../album.service';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.scss']
})
export class AlbumDescriptionComponent implements OnInit {

  album : Album ;

  constructor(
    private route: ActivatedRoute, // récupérez le service route
    private albumS: AlbumService // récupérez le service
  )
  {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.album = this.albumS.getAlbum(id);
  }

}
