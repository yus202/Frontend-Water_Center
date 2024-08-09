import { Component, OnInit } from '@angular/core';
import { AuthService, ProductServicesService } from 'src/app/services/service.index';
import { ProductService } from '../../../../models/product-service/ProductService.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-service',
  templateUrl: './list-product-service.component.html',
  styleUrls: ['./list-product-service.component.css']
})
export class ListProductServiceComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  productService: ProductService[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _productService : ProductServicesService
  ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllProductServices();
  }

  delete( data : ProductService ) {
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
        this._productService.deleteProductService(data.id).subscribe((res) => {
          this.getAllProductServices();
        });
        Swal.fire('Product and Service was deleted successfully!', 'Click ok', 'success');
      }
    });
  }

  getAllProductServices() {
        this._productService.getAllProductServices().subscribe((info: any) => {
      this.productService = info.data;
      this.load = false;
    });
  }

}
