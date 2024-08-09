import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PointSale } from 'src/app/models/point-sale/PointSale.model';
import { PointSaleService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-point-sale',
  templateUrl: './new-point-sale.component.html',
  styleUrls: ['./new-point-sale.component.css']
})
export class NewPointSaleComponent implements OnInit {

  point : FormGroup;
  pointModel = new PointSale();

  button = 1;

  constructor(
    private pointService: PointSaleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.PointSaleForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createPointSale();
    } else {
      this.updatePointSale();
    }
  }

  createPointSale(){
    this.pointModel.id = this.point.get('id').value;
    this.pointModel.logo = this.point.get('logo').value;
    this.pointModel.name = this.point.get('name').value;
    this.pointModel.address = this.point.get('address').value;

    this.pointService.createPointSale(this.pointModel).subscribe(
      (resp: any) => {
        Swal.fire(
          'Sale point was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/point/sale');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updatePointSale(){
    this.pointModel.id = this.point.get('id').value;
    this.pointModel.logo = this.point.get('logo').value;
    this.pointModel.name = this.point.get('name').value;
    this.pointModel.address = this.point.get('address').value;

    this.pointService.updatePointSale(this.pointModel).subscribe(
      (resp: any) => {
        Swal.fire(
          'Sale point  was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/point/sale');
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
      this.pointService
        .findPointSaleById( id )
        .subscribe((res: any) => {
          this.point.controls['id'].setValue(res.data.id);
          this.point.controls['name'].setValue(res.data.name);
          this.point.controls['logo'].setValue(res.data.logo);
          this.point.controls['address'].setValue(res.data.address);

        });
    }
  }

  get invalidName() {
    return this.point.get('name').invalid && this.point.get('name').touched;
  }
  
  get invalidLogo() {
    return (
      this.point.get('logo').invalid &&
      this.point.get('logo').touched
    );
  }

  get invalidAddress() {
    return (
      this.point.get('address').invalid &&
      this.point.get('address').touched
    );
  }

  PointSaleForm() {
    this.point = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      logo: ['', [Validators.required, Validators.maxLength(250)]],
      address: ['', [Validators.maxLength(250)]],
    });
  }
}
