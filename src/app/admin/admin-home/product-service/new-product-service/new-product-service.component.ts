import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServicesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ProductService } from '../../../../models/product-service/ProductService.model';
import { ProductServiceLang } from '../../../../models/product-service/ProductServiceLang.model';

@Component({
  selector: 'app-new-product-service',
  templateUrl: './new-product-service.component.html',
  styleUrls: ['./new-product-service.component.css']
})
export class NewProductServiceComponent implements OnInit {

  productService : FormGroup;
  productServiceModel = new ProductService;
  productServiceEn = new ProductServiceLang;
  productServiceSp = new ProductServiceLang;

  validURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  button = 1;

  constructor( private _productService : ProductServicesService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private _router: Router ) { 
                this.productServiceForm();
              }

  ngOnInit(): void {
    this.loadData();
  }


  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createProductService();
    } else {
      this.updateProductService();
    }
  }

  createProductService(){
    this.productServiceModel.id = this.productService.get('id').value;
    this.productServiceModel.image = this.productService.get('image').value;

      this._productService.createProductService(this.productServiceModel).subscribe(
      (resp: any) => {
        this.productServiceEn.product_service_fk = resp.Id;
        this.productServiceEn.category_languajes_fk = 1;
        this.productServiceEn.name = this.productService.get('nameEn').value;
        this.productServiceEn.decription = this.productService.get('decriptionEn').value;

        this.productServiceSp.product_service_fk = resp.Id;
        this.productServiceSp.category_languajes_fk = 2;
        this.productServiceSp.name = this.productService.get('nameSp').value;
        this.productServiceSp.decription = this.productService.get('decriptionSp').value;

        this.createProductServiceDescription(this.productServiceEn);
        this.createProductServiceDescription(this.productServiceSp);

        Swal.fire(
          'Producto and Service was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/product/service');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateProductService(){
    
    this.productServiceModel.id = this.productService.get('id').value;
    this.productServiceModel.image = this.productService.get('image').value;

    this._productService.updateProductService(this.productServiceModel).subscribe(
      (resp: any) => {
        this.productServiceEn.product_service_fk = resp.Id;
        this.productServiceEn.category_languajes_fk = 1;
        this.productServiceEn.name = this.productService.get('nameEn').value;
        this.productServiceEn.decription = this.productService.get('decriptionEn').value;

        this.productServiceSp.product_service_fk = resp.Id;
        this.productServiceSp.category_languajes_fk = 2;
        this.productServiceSp.name = this.productService.get('nameSp').value;
        this.productServiceSp.decription = this.productService.get('decriptionSp').value;

        this.updateProductServiceDescription(this.productServiceEn);
        this.updateProductServiceDescription(this.productServiceSp);

        Swal.fire(
          'Product and service was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/product/service');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createProductServiceDescription( product : ProductServiceLang ){
    this._productService.createProductServiceLang( product ).subscribe();
  }

  updateProductServiceDescription( product : ProductServiceLang ){
    this._productService.updateProductServiceLang( product ).subscribe();
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this._productService
        .findProductServiceById( id )
        .subscribe((res: any) => {
          this.productService.controls['id'].setValue(res.data.id);
          this.productService.controls['image'].setValue(res.data.image);

          this._productService
            .findProductServiceByFk( res.data.id )
            .subscribe((res: any) => {
              this.productService.controls['nameEn'].setValue(
                res.data[0].decription
              );
              this.productService.controls['decriptionEn'].setValue(
                res.data[0].decription
              );
              this.productService.controls['nameSp'].setValue(
                res.data[1].decription
              );
              this.productService.controls['decriptionSp'].setValue(
                res.data[1].decription
              );
            });
        });
    }
  }

  get invalidImage() {
    return this.productService.get('image').invalid && this.productService.get('image').touched;
  }
  get invalidName() {
    return this.productService.get('name').invalid && this.productService.get('name').touched;
  }
  get invalidDecriptionSp() {
    return (
      this.productService.get('decriptionSp').invalid &&
      this.productService.get('decriptionSp').touched
    );
  }
  get invalidDecriptionEn() {
    return (
      this.productService.get('decriptionEn').invalid &&
      this.productService.get('decriptionEn').touched
    );
  }
  get invalidNameSp() {
    return (
      this.productService.get('nameSp').invalid &&
      this.productService.get('nameSp').touched
    );
  }
  get invalidNameEn() {
    return (
      this.productService.get('nameEn').invalid &&
      this.productService.get('nameEn').touched
    );
  }

  productServiceForm() {
    this.productService = this.fb.group({
      id: [''],
      image: ['', [Validators.required,Validators.maxLength(250)]],
      product_service_fk: [''],
      category_languajes_fk: [''],
      nameEn: ['', [Validators.required,Validators.maxLength(250)]],
      nameSp: ['', [Validators.required,Validators.maxLength(250)]],
      decriptionEn: ['', [Validators.required,Validators.maxLength(360)]],
      decriptionSp: ['', [Validators.required,Validators.maxLength(360)]],
    });
  }

}

