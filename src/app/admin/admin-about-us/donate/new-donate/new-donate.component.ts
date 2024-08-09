import { Component, OnInit } from '@angular/core';
import { DonateService } from '../../../../services/service.index';

import Swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Donate } from 'src/app/models/donate/donate.model';
import { DonateLang } from 'src/app/models/donate/donateLang.model';

@Component({
  selector: 'app-new-donate',
  templateUrl: './new-donate.component.html',
  styleUrls: ['./new-donate.component.css']
})
export class NewDonateComponent implements OnInit {

  donate: FormGroup;
  donateModel = new Donate();
  donateEn = new DonateLang();
  donateSp = new DonateLang();

  validImage = ``;
  button = 1;

    constructor(
    private donateService: DonateService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.DonateForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createDonates();
    } else {
      this.updateDonate();
    }
  }

  createDonates(){
    this.donateModel.id = this.donate.get('id').value;
    this.donateModel.image = this.validImage + this.donate.get('image').value;
    console.log(this.donateModel);
    
    this.donateService.createDonate( this.donateModel ).subscribe(
      ( resp : any ) => {
        this.donateEn.donate_fk = resp.Id;
        this.donateEn.languaje_fk = 1;
        this.donateEn.title = this.donate.get('titleEn').value;
        this.donateEn.description = this.donate.get('descriptionEn').value;

        this.donateSp.donate_fk = resp.Id;
        this.donateSp.languaje_fk = 2;
        this.donateSp.title = this.donate.get('titleSp').value;
        this.donateSp.description = this.donate.get('descriptionEn').value;

        this.createDonateDescription( this.donateEn );
        this.createDonateDescription( this.donateSp );

        Swal.fire(
          'Donation was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/donate');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateDonate(){

    this.donateModel.id = this.donate.get('id').value;
    this.donateModel.image = this.donate.get('image').value;

    this.donateService.updateDonate( this.donateModel ).subscribe(
      ( resp : any ) => {
        this.donateEn.donate_fk = resp.Id;
        this.donateEn.languaje_fk = 1;
        this.donateEn.title = this.donate.get('titleEn').value;
        this.donateEn.description = this.donate.get('descriptionEn').value;

        this.donateSp.donate_fk = resp.Id;
        this.donateSp.languaje_fk = 2;
        this.donateSp.title = this.donate.get('titleSp').value;
        this.donateSp.description = this.donate.get('descriptionEn').value;

        this.updateDonateDescription( this.donateEn );
        this.updateDonateDescription( this.donateSp );

        Swal.fire(
          'Donation was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/donate');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createDonateDescription( donate : DonateLang ) {
    this.donateService.createDonateLang( donate ).subscribe( (res:any)=>{
      console.log(res);
    });
  }

  updateDonateDescription( donate : DonateLang) {
    this.donateService.updateDonateLang( donate ).subscribe();
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;

      this.donateService
        .findDonateById(id)
        .subscribe( ( res: any ) => {

          this.donate.controls['id'].setValue(res.data.id);
          this.donate.controls['image'].setValue(res.data.image);

          this.donateService
            .findDonateByFk( res.data.id )
            .subscribe( ( res: any ) => {

              this.donate.controls['titleEn'].setValue(
                res.data[0].title
              );
              this.donate.controls['descriptionEn'].setValue(
                res.data[0].description
              );

              this.donate.controls['titleSp'].setValue(
                res.data[1].title
              );
              this.donate.controls['descriptionSp'].setValue(
                res.data[1].description
              );
            });
        });
    }
  }

 

  get invalidTitleEn() {
    return (
      this.donate.get('titleEn').invalid &&
      this.donate.get('titleEn').touched
    );
  }
  get invalidTitleSp() {
    return (
      this.donate.get('titleSp').invalid &&
      this.donate.get('titleSp').touched
    );
  }

  get invalidDescriptionEn() {
    return (
      this.donate.get('descriptionEn').invalid &&
      this.donate.get('descriptionEn').touched
    );
  }
  get invalidDescriptionSp() {
    return (
      this.donate.get('descriptionSp').invalid &&
      this.donate.get('descriptionSp').touched
    );
  }
  get invalidImage() {
    return (
      this.donate.get('image').invalid &&
      this.donate.get('image').touched
    );
  }

  DonateForm() {
    this.donate = this.fb.group({
      id: [''],
      image: ['',[Validators.required,Validators.maxLength(250)]],
      donate_fk: [''],
      languaje_fk: [''],
      titleEn: ['', [Validators.required,Validators.maxLength(10)]],
      titleSp: ['', [Validators.required,Validators.maxLength(10)]],
      descriptionEn: ['', [Validators.required,Validators.maxLength(100)]],
      descriptionSp: ['', [Validators.required,Validators.maxLength(100)]]
    });
  }

}
