import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BftImages } from 'src/app/models/bft-images/BftImages.model';
import { BftImagesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  bftImage : FormGroup;
  bftModel = new BftImages;

  validURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  button = 1;

  constructor(
    private _BftImagesService : BftImagesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.affiliateForm();
   }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createBftImage();
    } else {
      this.updateBftImage();
    }
  }

  createBftImage(){
    this.bftModel.id = this.bftImage.get('id').value;
    this.bftModel.image = this.bftImage.get('image').value;

    this._BftImagesService.createBftImages(this.bftModel).subscribe(
      (resp: any) => {
        Swal.fire(
          'Image was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/bft/images');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateBftImage(){
    this.bftModel.id = this.bftImage.get('id').value;
    this.bftModel.image = this.bftImage.get('image').value;

    this._BftImagesService.updateBftImage(this.bftModel).subscribe(
      (resp: any) => {

        Swal.fire(
          'Image was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/bft/images');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }


  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this._BftImagesService
        .findBftImageId( id )
        .subscribe((res: any) => {
          this.bftImage.controls['id'].setValue(res.data.id);
          this.bftImage.controls['image'].setValue(res.data.image);
        });
    }
  }

  get invalidImage() {
    return this.bftImage.get('image').invalid && this.bftImage.get('image').touched;
  }

  affiliateForm() {
    this.bftImage = this.fb.group({
      id: [''],
      image: ['', [Validators.maxLength(250)]]
    });
  }

}
