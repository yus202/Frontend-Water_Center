import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductServicesService } from '../../../services/product-services/product-services.service';
import { LanguageService } from '../../../services/shared/language.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products-services',
  templateUrl: './products-services.component.html',
  styleUrls: ['./products-services.component.css'],
})
export class ProductsServicesComponent implements OnInit {
  languageID: number;
  productsServices: any;
  modalRef: BsModalRef;
  image: string;
  name: string;
  description: string;

  constructor(
    private productsAndServicesService: ProductServicesService,
    private languageService: LanguageService,
    public modalService: BsModalService
  ) {
    this.languageService.getLanguage().subscribe((response) => {
      this.languageID = response;
      this.getProductsAndServices();
    });
  }

  ngOnInit(): void {}

  getProductsAndServices(): void {
    this.productsAndServicesService
      .getProductsAndServicesByLanguage(this.languageID).subscribe((response) => {
        this.productsServices = response.data;
      });
  }

  openModal(template: TemplateRef<any>, image: string, name: string, description: string): void {
    this.image = image;
    this.name = name;
    this.description = description;
    this.modalRef = this.modalService.show(template);
  }
}
