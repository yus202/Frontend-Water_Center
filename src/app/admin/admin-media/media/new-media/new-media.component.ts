import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from 'src/app/models/media/Media.model';
import { MediaCategory } from 'src/app/models/media/MediaCategory.model';
import { MediaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-media',
  templateUrl: './new-media.component.html',
  styleUrls: ['./new-media.component.css']
})
export class NewMediaComponent implements OnInit {

  media : FormGroup;
  MediaModel = new Media;
  MediaCategoryModel = new MediaCategory;
  typeOfMedia : any;

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
    this.MediaModel.id = this.media.get('id').value;
    this.MediaModel.media_category_fk = 1;
    this.MediaModel.tittle = this.media.get('url').value;
    this.MediaModel.url = this.media.get('url').value;

    this._mediaService.createMedia( this.MediaModel )
    .subscribe( ( res : any ) =>{
      Swal.fire(
        'Media was added successfully!',
        'Click ok',
        'success'
      );
      this._router.navigateByUrl('admin/list/media');
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    })
  }

  updateMedia(){
    this.MediaModel.id = this.media.get('id').value;
    this.MediaModel.media_category_fk = 1;
    this.MediaModel.tittle = this.media.get('tittle').value;
    this.MediaModel.url = this.media.get('url').value;

    this.MediaCategoryModel.id = 1;
    this.MediaCategoryModel.name = this.media.get('name').value;

    this._mediaService.updateMedia( this.MediaModel )
    .subscribe( ( res : any ) =>{
      Swal.fire(
        'Media was updated successfully!',
        'Click ok',
        'success'
      );
      this._router.navigateByUrl('admin/list/media');
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    })
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this._mediaService.findMediaByFk( id )
      .subscribe( ( res : any ) =>{
        this.media.controls['id'].setValue(res.data.id);
        this.media.controls['media_category_fk'].setValue(res.data.media_category_fk);
        this.media.controls['tittle'].setValue(res.data.tittle);
        this.media.controls['url'].setValue(res.data.url);  
        this._mediaService.getAllMediasCategory( )
        .subscribe(
          ( res : any ) => {
            
            this.typeOfMedia = res.data
          }
        )
      });
    }else{
      this._mediaService.getAllMediasCategory()
      .subscribe(
        ( res : any ) =>{
          this.typeOfMedia = res.data
        }
      )
    }
  }


  get invalidURL() {
    return (
      this.media.get('url').invalid &&
      this.media.get('url').touched
    );
  }

  MediaForm(){
    this.media = this.fb.group({
      id: [''],
      name: ['',[Validators.maxLength(250)]],
      media_category_fk: [''],
      tittle: ['no title',[Validators.maxLength(250)]],
      url: ['', [Validators.required,Validators.maxLength(250)]],
    });
  }

}
