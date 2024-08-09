import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaCategory } from 'src/app/models/media/MediaCategory.model';
import { MediaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-type-media',
  templateUrl: './new-type-media.component.html',
  styleUrls: ['./new-type-media.component.css']
})
export class NewTypeMediaComponent implements OnInit {

  media : FormGroup;
  MediaCategoryModel = new MediaCategory;

  button = 1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _mediaService : MediaService,
    private _router: Router
  ) {
    this.MediaForm();
   }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createMedia();
    } else {
      this.updateMedia();
    }
  }

  createMedia(){
    this.MediaCategoryModel.id = this.media.get('id').value;
    this.MediaCategoryModel.name = this.media.get('name').value;
    this._mediaService.createMediaCategory( this.MediaCategoryModel )
    .subscribe( ( res : any ) => {
      Swal.fire(
        'Type media was added successfully!',
        'Click ok',
        'success'
      );
      this._router.navigateByUrl('admin/list/type/media');
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    })
  }

  updateMedia(){
    this.MediaCategoryModel.id = this.media.get('id').value;
    this.MediaCategoryModel.name = this.media.get('name').value;
    this._mediaService.updateMediaCategory( this.MediaCategoryModel )
    .subscribe( ( res : any ) => {
      Swal.fire(
        'Type media was added',
        'Click ok',
        'success'
      );
      this._router.navigateByUrl('admin/list/type/media');
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    })
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this._mediaService.findMediaById( id )
      .subscribe( ( res : any ) =>{
        this.media.controls['id'].setValue(res.data.id);
          this.media.controls['name'].setValue(res.data.name);
      });
    }
  }

  get invalidName() {  
    return (
      this.media.get('name').invalid &&
      this.media.get('name').touched
    );
  }

  MediaForm(){
    this.media = this.fb.group({
      id: [''],
      name: ['', [Validators.required,Validators.maxLength(150)]],
    });
  }
}
