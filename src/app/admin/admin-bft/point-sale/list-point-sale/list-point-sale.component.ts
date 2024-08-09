import { Component, OnInit } from '@angular/core';
import { AuthService, PointSaleService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import {PointSale } from '../../../../models/point-sale/PointSale.model'
@Component({
  selector: 'app-list-point-sale',
  templateUrl: './list-point-sale.component.html',
  styleUrls: ['./list-point-sale.component.css']
})
export class ListPointSaleComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  point: PointSale[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _pointService: PointSaleService
  ) {}

  ngOnInit(): void {
    this.load = true;
    this.getAllPointSales();
  }
  
  delete( data : PointSale ) {
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
        this._pointService.deletePointSale(data.id).subscribe((res) => {
          this.getAllPointSales();
        });
        Swal.fire('Sale point was deleted successfully!', 'Click ok', 'success');
      }
    });
  }

  getAllPointSales() {
    this._pointService.getAllPointSale().subscribe((info: any) => {
      this.point = info.data;
      this.load = false;
    });
  }
}
