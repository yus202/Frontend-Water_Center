import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lidership } from 'src/app/models/lideship/lidership.model';
import { LidershipLang } from '../../../../models/lideship/lidershipLang.model';
import { LidershipService } from '../../../../services/lidership/lidership.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-lidership',
  templateUrl: './new-lidership.component.html',
  styleUrls: ['./new-lidership.component.css']
})
export class NewLidershipComponent implements OnInit {

  lider : FormGroup;
  liderModel : Lidership = new Lidership();
  LiderEnModel : LidershipLang = new LidershipLang();
  LiderSpModel : LidershipLang = new LidershipLang();
  button = 1;

  constructor( private _liderService : LidershipService,
               private route: ActivatedRoute,
               private _router: Router,
               private fb: FormBuilder
    ) {
      this.liderForm();
     }

  ngOnInit(): void { 
    this.loadData();
  }

  onSubmit( ){
    const id = this.route.snapshot.paramMap.get('id');
    if( id === 'new'){
      this.createLidership( );
    } else {
      this.updateLidership( );
    }
  }
  get invalidFacebook() {
    return (
      this.lider.get('facebook').invalid &&
      this.lider.get('facebook').touched
    );
  }
  get invalidInstagram() {
    return (
      this.lider.get('instagram').invalid &&
      this.lider.get('instagram').touched
    );
  }
  get invalidEmail() {
    return (
      this.lider.get('email').invalid &&
      this.lider.get('email').touched
    );
  }
  get invalidTwitter() {
    return (
      this.lider.get('twitter').invalid &&
      this.lider.get('twitter').touched
    );
  }
  get invalidImage() {
    return (
      this.lider.get('image').invalid &&
      this.lider.get('image').touched
    );
  }
  get invalidName() {
    return (
      this.lider.get('name').invalid &&
      this.lider.get('name').touched
    );
  }
  get invalidDescriptionEn() {
    return (
      this.lider.get('descriptionEn').invalid &&
      this.lider.get('descriptionEn').touched
    );
  }
  get invalidDescriptionSp() {
    return (
      this.lider.get('descriptionSp').invalid &&
      this.lider.get('descriptionSp').touched
    );
  }

  createLidership(){
    this.liderModel.id = this.lider.get('id').value;
    this.liderModel.facebook = this.lider.get('facebook').value;
    this.liderModel.instagram = this.lider.get('instagram').value;
    this.liderModel.email = this.lider.get('email').value;
    this.liderModel.twitter = this.lider.get('twitter').value;
    this.liderModel.image = this.lider.get('image').value;
    this.liderModel.name = this.lider.get('name').value;


    this._liderService.createLidership( this.liderModel )
    .subscribe( ( res : any ) => {

    this.LiderEnModel.liderships_fk = res.Id;
    this.LiderEnModel.languaje_category_fk = 1;
    this.LiderEnModel.description = this.lider.get('descriptionEn').value;

    this.LiderSpModel.liderships_fk = res.Id;
    this.LiderSpModel.languaje_category_fk = 2;
    this.LiderSpModel.description = this.lider.get('descriptionSp').value;

      this.createLidershipDescription( this.LiderEnModel );
      this.createLidershipDescription( this.LiderSpModel );
    
      Swal.fire(
        'Lider was added successfully!',
        'Click ok',
        'success'
      )
      }, error =>{
        Swal.fire(
          'Error!',
          error.error.error,
          'error'
        )
      }); 
      this._router.navigate( ['admin/list/lidership'] );
  }

  updateLidership( ){
    this.liderModel.id = this.lider.get('id').value;
    this.liderModel.facebook = this.lider.get('facebook').value;
    this.liderModel.instagram = this.lider.get('instagram').value;
    this.liderModel.email = this.lider.get('email').value;
    this.liderModel.twitter = this.lider.get('twitter').value;
    this.liderModel.image = this.lider.get('image').value;
    this.liderModel.name = this.lider.get('name').value;

    this._liderService.updateLidership( this.liderModel )
    .subscribe( (res : any ) =>{
      this.LiderEnModel.liderships_fk = res.Id;
      this.LiderEnModel.languaje_category_fk = 1;
      this.LiderEnModel.description = this.lider.get('descriptionEn').value;
  
      this.LiderSpModel.liderships_fk = res.Id;
      this.LiderSpModel.languaje_category_fk = 2;
      this.LiderSpModel.description = this.lider.get('descriptionSp').value;
  
      this.updateLidershipDescription(this.LiderSpModel);
      this.updateLidershipDescription(this.LiderEnModel);


      Swal.fire(
        'Lider was updated successfully!',
        'Click ok',
        'success'
      )
      }, error =>{
        Swal.fire(
          'Error!',
          error.error.error,
          'error'
        )
      }); 
      this._router.navigate( ['admin/list/lidership'] );
  }

  updateLidershipDescription( LiderLang : LidershipLang ){
    this._liderService.updateLidershipLang( LiderLang )
    .subscribe( );
  }

  createLidershipDescription( LiderLang : LidershipLang ){
    this._liderService.createLidershipLang( LiderLang )
      .subscribe( );
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    if( id !== 'new'){
      this.button = 2;
      this._liderService.findLidershipById( id )
      .subscribe(
        ( response : any ) => {
          this.lider.controls['id'].setValue( response.data.id );
          this.lider.controls['facebook'].setValue( response.data.facebook );
          this.lider.controls['instagram'].setValue( response.data.instagram );
          this.lider.controls['email'].setValue( response.data.email );
          this.lider.controls['twitter'].setValue( response.data.twitter );
          this.lider.controls['image'].setValue( response.data.image );
          this.lider.controls['name'].setValue( response.data.name );

          this._liderService.findLidershipByFk( response.data.id)
          .subscribe(
            ( response : any )=>{
              this.lider.controls['descriptionEn'].setValue(
                response.data[0].description
              );
              this.lider.controls['descriptionSp'].setValue(
                response.data[1].description
              );
            }
          )
        }
      )
    }
  }


  liderForm(){
    this.lider = this.fb.group({
      id: [''],
      facebook : ['', [Validators.required,Validators.maxLength(250)]],
      instagram : ['', [Validators.required,Validators.maxLength(250)]],
      email: ['', [Validators.required,Validators.maxLength(250)]],
      twitter: ['', [Validators.required,Validators.maxLength(250)]],
      image: ['', [Validators.required,Validators.maxLength(250)]],
      name: ['', [Validators.required,Validators.maxLength(75)]],

      liderships_fk :  [''], 
      languaje_category_fk :  [''],
      descriptionEn: ['', [Validators.required,Validators.maxLength(500)]],
      descriptionSp: ['', [Validators.required,Validators.maxLength(500)]],

    })
  }

}
