import { Component, OnInit } from '@angular/core';
import { MediaCategory } from 'src/app/models/media/MediaCategory.model';
import { AuthService, MediaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-type-media',
  templateUrl: './list-type-media.component.html',
  styleUrls: ['./list-type-media.component.css']
})
export class ListTypeMediaComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  mediaCategory: MediaCategory[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _mediaService : MediaService
  ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllImages();
  }

  delete( data : MediaCategory ) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._mediaService.deleteMediaCategory(data.id).subscribe((res) => {
          this.getAllImages();
        });
        Swal.fire( 'Type media was deleted successfully!', 'Click ok', 'success');
      }
    });
  }

  getAllImages() {
        this._mediaService.getAllMediasCategory().subscribe((info: any) => {
      this.mediaCategory = info.data;
      this.load = false;
    });
  }

}
