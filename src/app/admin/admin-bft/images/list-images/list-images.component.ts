import { Component, OnInit } from '@angular/core';
import { BftImages } from 'src/app/models/bft-images/BftImages.model';
import { AuthService, BftImagesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  bftImage: BftImages[];
  load = false;

  constructor( private _authService : AuthService,
              private _BftImages : BftImagesService ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllBftImage();
  }

  delete( data : BftImages ) {
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
        this._BftImages.deleteBftImages(data.id).subscribe((res) => {
          this.getAllBftImage();
        });
        Swal.fire( 'Image was deleted successfully!', 'Click ok', 'success');
      }
    });
  }

  getAllBftImage() {
    this._BftImages.getAllBftImages().subscribe((info: any) => {
      this.bftImage = info.data;
      this.load = false;
    });
  }

}
