import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Affiliate } from 'src/app/models/affiliate/Affiliate.model';
import { AffiliateLang } from 'src/app/models/affiliate/AffiliateLang.model';
import { AffiliatesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-affiliate',
  templateUrl: './new-affiliate.component.html',
  styleUrls: ['./new-affiliate.component.css']
})
export class NewAffiliateComponent implements OnInit {

  affiliate : FormGroup;
  affiliateModel = new Affiliate;
  affiliateEn = new AffiliateLang;
  affiliateSp = new AffiliateLang;

  button = 1;
  image : any;

  constructor( private _affiliateService : AffiliatesService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private _router: Router ) { 
                this.affiliateForm();
              }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createAffiliate();
    } else {
      this.updateAffiliate();
    }
  }

  createAffiliate(){
    this.affiliateModel.id = this.affiliate.get('id').value;
    this.affiliateModel.name = this.affiliate.get('name').value;
    this.affiliateModel.image = this.affiliate.get('image').value;

    this._affiliateService.createAffiliate(this.affiliateModel).subscribe(
      (resp: any) => {
        Swal.fire(
          'Affiliate was added successfully!',
          'Click ok',
          'success'
        );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
    this._router.navigateByUrl('admin/list/affiliate');
  }

  updateAffiliate(){
    this.affiliateModel.id = this.affiliate.get('id').value;
    this.affiliateModel.name = this.affiliate.get('name').value;
    this.affiliateModel.image = this.affiliate.get('image').value;
    
    this._affiliateService.updateAffiliate(this.affiliateModel).subscribe(
      (resp: any) => {
        Swal.fire(
          'Affiliate was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/affiliate');
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
      this._affiliateService
        .findAffiliateById( id )
        .subscribe((res: any) => {
          this.affiliate.controls['id'].setValue(res.data.id);
          this.affiliate.controls['name'].setValue(res.data.name);
          this.affiliate.controls['image'].setValue(res.data.image);
        });
    }else{
      this.image = this.affiliate.get('image').value;
    }
  }

  get invalidImage() {
    return this.affiliate.get('image').invalid && this.affiliate.get('image').touched;
  }
    get invalidName() {
    return this.affiliate.get('name').invalid && this.affiliate.get('name').touched;
  }

  affiliateForm() {
    this.affiliate = this.fb.group({
      id: [''],
      name: ['', [Validators.required,Validators.maxLength(100)]],
      image: ['', [Validators.required,Validators.maxLength(250)]]
    });
  }
}
