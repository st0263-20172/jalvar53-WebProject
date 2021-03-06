import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from '../shared/services/media.service';
import { MediaModel } from '../shared/models/media.model';
import { DataBaseService } from '../shared/services/database.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-browse-media',
  templateUrl: './browse-media.component.html',
  styleUrls: ['./browse-media.component.css']
})
export class BrowseMediaComponent implements OnInit {

  mediaListFull: MediaModel[];
  searchedItem: MediaModel;
  searchClicked = false;
  currentUser: User;
  @ViewChild('search') searchValue: any;

  constructor(private mediaService: MediaService,
              private userService: UserService,
              private databaseService: DataBaseService) { }

  ngOnInit() {
    this.databaseService.fetchAllMedia();
    setTimeout(
      () => {
        this.mediaListFull = this.mediaService.getMediaList();
      }, 300
    );
    this.currentUser = this.userService.getCurrentUser();
  }

  onRefresh() {
    this.databaseService.fetchAllMedia();
    setTimeout(
      () => {
        this.mediaListFull = this.mediaService.getMediaList();
      }, 300
    );
    this.searchClicked = false;
  }

  onSearch() {
    this.searchClicked = true;
    const value = this.searchValue.nativeElement.value;
    this.databaseService.getMediaByName(value);
    this.searchedItem = this.mediaService.getOneMedia(value);
  }

}
