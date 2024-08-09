import { Component, OnInit } from '@angular/core';
import { PartnerOrganizationService } from '../../../../services/partner-organization/partner-organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerOrganization } from 'src/app/models/partner-organization/PartnerOrganization.model';
import { PartnerOrganizationLang } from '../../../../models/partner-organization/PartnerOrganizationLang.model';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-partner-organization',
  templateUrl: './new-partner-organization.component.html',
  styleUrls: ['./new-partner-organization.component.css'],
})
export class NewPartnerOrganizationComponent implements OnInit {

  partner: FormGroup;
  partnerModel = new PartnerOrganization();
  partnerEn = new PartnerOrganizationLang();
  partnerSp = new PartnerOrganizationLang();

  validURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  button = 1;

  constructor(
    private partnerService: PartnerOrganizationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.PartnerOrganizationForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createPartnerOrganization();
    } else {
      this.updatePartnerOrganization();
    }
  }

  createPartnerOrganization() {
    this.partnerModel.id = this.partner.get('id').value;
    this.partnerModel.logo = this.partner.get('logo').value;
    this.partnerModel.nameSp = this.partner.get('nameSp').value;
    this.partnerModel.nameEn = this.partner.get('nameEn').value;
    this.partnerModel.url_site = this.partner.get('url_site').value;

    this.partnerService.createPartnerOrganization(this.partnerModel).subscribe(
      (resp: any) => {
        this.partnerEn.partner_organization_fk = resp.Id;
        this.partnerEn.category_languajes_fk = 1;
        this.partnerEn.description = this.partner.get('descriptionEn').value;

        this.partnerSp.partner_organization_fk = resp.Id;
        this.partnerSp.category_languajes_fk = 2;
        this.partnerSp.description = this.partner.get('descriptionSp').value;

        this.createPartnerOrganizationDescription(this.partnerEn);
        this.createPartnerOrganizationDescription(this.partnerSp);

        Swal.fire(
          'Partner Organization was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/partner/organization');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updatePartnerOrganization() {
    this.partnerModel.id = this.partner.get('id').value;
    this.partnerModel.logo = this.partner.get('logo').value;
    this.partnerModel.nameSp = this.partner.get('nameSp').value;
    this.partnerModel.nameEn = this.partner.get('nameEn').value;
    this.partnerModel.url_site = this.partner.get('url_site').value;
    this.partnerService.updatePartnerOrganization(this.partnerModel).subscribe(
      (resp: any) => {
        this.partnerEn.partner_organization_fk = resp.Id;
        this.partnerEn.category_languajes_fk = 1;
        this.partnerEn.description = this.partner.get('descriptionEn').value;

        this.partnerSp.partner_organization_fk = resp.Id;
        this.partnerSp.category_languajes_fk = 2;
        this.partnerSp.description = this.partner.get('descriptionSp').value;

        this.updatePartnerOrganizationDescription(this.partnerEn);
        this.updatePartnerOrganizationDescription(this.partnerSp);

        Swal.fire(
          'Partner Organization was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/partner/organization');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createPartnerOrganizationDescription(partner: PartnerOrganizationLang) {
    this.partnerService.createPartnerOrganizationLang(partner).subscribe();
  }

  updatePartnerOrganizationDescription(partnerLang: PartnerOrganizationLang) {
    this.partnerService.updatePartnerOrganizationLang(partnerLang).subscribe();
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this.partnerService
        .findPartnerOrganizationById(id)
        .subscribe((res: any) => {
          this.partner.controls['id'].setValue(res.data.id);
          this.partner.controls['nameSp'].setValue(res.data.nameSp);
          this.partner.controls['nameEn'].setValue(res.data.nameEn);
          this.partner.controls['logo'].setValue(res.data.logo);
          this.partner.controls['url_site'].setValue(res.data.url_site);

          this.partnerService
            .findPartnerOrganizationByFk(res.data.id)
            .subscribe((res: any) => {
              this.partner.controls['descriptionEn'].setValue(
                res.data[0].description
              );
              this.partner.controls['descriptionSp'].setValue(
                res.data[1].description
              );
            });
        });
    }
  }

  get invalidNameSp() {
    return this.partner.get('nameSp').invalid && this.partner.get('nameSp').touched;
  }
  get invalidNameEn() {
    return this.partner.get('nameEn').invalid && this.partner.get('nameEn').touched;
  }
  get invalidDescriptionEn() {
    return (
      this.partner.get('descriptionEn').invalid &&
      this.partner.get('descriptionEn').touched
    );
  }

  get invalidDescriptionSp() {
    return (
      this.partner.get('descriptionSp').invalid &&
      this.partner.get('descriptionSp').touched
    );
  }

  get invalidURL() {
    return (
      this.partner.get('url_site').invalid &&
      this.partner.get('url_site').touched
    );
  }
  get invalidLogo() {
    return (
      this.partner.get('logo').invalid &&
      this.partner.get('logo').touched
    );
  }

  PartnerOrganizationForm() {
    this.partner = this.fb.group({
      id: [''],
      logo: ['', [Validators.required,Validators.maxLength(250)]],
      url_site: ['', [Validators.pattern(this.validURL),Validators.maxLength(250)]],
      nameEn: ['', [Validators.required,Validators.maxLength(250)]],
      nameSp: ['', [Validators.required,Validators.maxLength(250)]],
      partner_organization_fk: [''],
      category_languajes_fk: [''],
      descriptionEn: ['', [Validators.required,Validators.maxLength(500)]],
      descriptionSp: ['', [Validators.required,Validators.maxLength(500)]],
    });
  }
}
