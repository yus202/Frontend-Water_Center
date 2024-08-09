import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { Images } from 'src/app/models/company-info/Images.model';
import { CompanyInfoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { CompanyInfo } from '../../../../models/company-info/CompanyInfo.model';
import { CompanyInfoLang } from '../../../../models/company-info/CompanyInfoLang.model';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {
  company: FormGroup;
  companyModel = new CompanyInfo();
  companyEn = new CompanyInfoLang();
  companySp = new CompanyInfoLang();
  images = new Images();

  button = 1;

  constructor(
    private _companyService: CompanyInfoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.CompanyForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createCompany();
    } else {
      this.updateCompany();
    }
  }

  createCompany(){
    this.companyModel.id = this.company.get('id').value;
    this.companyModel.email = this.company.get('email').value;
    this.companyModel.telephone = this.company.get('telephone').value;
    this.companyModel.facebook = this.company.get('facebook').value;
    this.companyModel.instagram = this.company.get('instagram').value;
    this.companyModel.legal_certification = this.company.get(
      'legal_certification'
    ).value;
    this.companyModel.ubication = this.company.get('ubication').value;
    this.companyModel.image = this.company.get('image').value;

    this._companyService.createCompanyInfo(this.companyModel).subscribe(
      (res: any) => {
        
        this.companyEn.company_info_fk = res.data.id;
        this.companyEn.languaje_category_fk = 1;
        this.companyEn.company_name = this.company.get('company_nameEn').value;
        this.companyEn.description = this.company.get('descriptionEn').value;
        this.companyEn.direction = this.company.get('directionEn').value;
        this.companyEn.paragraph1 = this.company.get('paragraph1En').value;
        this.companyEn.paragraph2 = this.company.get('paragraph2En').value;
        this.companyEn.paragraph3 = this.company.get('paragraph3En').value;
        this.companyEn.paragraph4 = this.company.get('paragraph4En').value;
        this.companyEn.paragraph5 = this.company.get('paragraph5En').value;
        this.companyEn.paragraph6 =  'null';

        this.companySp.company_info_fk = res.data.id;
        this.companySp.languaje_category_fk = 2;
        this.companySp.company_name = this.company.get('company_nameSp').value;
        this.companySp.description = this.company.get('descriptionSp').value;
        this.companySp.direction = this.company.get('directionSp').value;
        this.companySp.paragraph1 = this.company.get('paragraph1Sp').value;
        this.companySp.paragraph2 = this.company.get('paragraph2Sp').value;
        this.companySp.paragraph3 = this.company.get('paragraph3Sp').value;
        this.companySp.paragraph4 = this.company.get('paragraph4Sp').value;
        this.companySp.paragraph5 = this.company.get('paragraph5Sp').value;
        this.companySp.paragraph6 =  'null';

        // this.images.image1 = 'null';
        // this.images.image2 = 'null';
        // this.images.company_info_fk = res.data.id;

        // this._companyService.createImage( this.images )
        // .subscribe( );

        this._companyService.createCompanyInfoLang( this.companySp )
        .subscribe( );

        this._companyService.createCompanyInfoLang( this.companyEn )
        .subscribe( );

        Swal.fire('Company was updated successfully!', 'Click ok', 'success');
        this._router.navigateByUrl('admin/list/company');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateCompany() {
    this.companyModel.id = this.company.get('id').value;
    this.companyModel.email = this.company.get('email').value;
    this.companyModel.telephone = this.company.get('telephone').value;
    this.companyModel.facebook = this.company.get('facebook').value;
    this.companyModel.instagram = this.company.get('instagram').value;
    this.companyModel.legal_certification = this.company.get(
      'legal_certification'
    ).value;
    this.companyModel.ubication = this.company.get('ubication').value;
    this.companyModel.image = this.company.get('image').value;

    this._companyService.updateCompanyInfo(this.companyModel).subscribe(
      (res: any) => {
        
        this.companyEn.company_info_fk  = res.data.id;
        this.companyEn.languaje_category_fk = 1;
        this.companyEn.company_name = this.company.get('company_nameEn').value;
        this.companyEn.description = this.company.get('descriptionEn').value;
        this.companyEn.direction = this.company.get('directionEn').value;
        this.companyEn.paragraph1 = this.company.get('paragraph1En').value;
        this.companyEn.paragraph2 = this.company.get('paragraph2En').value;
        this.companyEn.paragraph3 = this.company.get('paragraph3En').value;
        this.companyEn.paragraph4 = this.company.get('paragraph4En').value;
        this.companyEn.paragraph5 = this.company.get('paragraph5En').value;
        this.companyEn.paragraph6 =  'null';

        this.companySp.company_info_fk  = res.data.id;
        this.companySp.languaje_category_fk = 2;
        this.companySp.company_name = this.company.get('company_nameSp').value;
        this.companySp.description = this.company.get('descriptionSp').value;
        this.companySp.direction = this.company.get('directionSp').value;
        this.companySp.paragraph1 = this.company.get('paragraph1Sp').value;
        this.companySp.paragraph2 = this.company.get('paragraph2Sp').value;
        this.companySp.paragraph3 = this.company.get('paragraph3Sp').value;
        this.companySp.paragraph4 = this.company.get('paragraph4Sp').value;
        this.companySp.paragraph5 = this.company.get('paragraph5Sp').value;
        this.companySp.paragraph6 = 'null';

        // this.images.image1 = 'null';
        // this.images.image2 = 'null';
        // this.images.company_info_fk = res.data.id;
        
        // this._companyService.updateCompanyInfoLang( this.companySp )
        // .subscribe( ( res : any) =>{
        //   this._companyService.updateImages( this.images ).subscribe();
        // });
        this._companyService.updateCompanyInfoLang( this.companyEn )
        .subscribe( ( res : any) =>{
          // this._companyService.updateImages( this.images ).subscribe();
        });

        Swal.fire('Company was updated successfully!', 'Click ok', 'success');
        this._router.navigateByUrl('admin/list/company');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  inputName = false;
  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;

      this._companyService.findCompanyInfoById(id).subscribe((res: any) => {
        this.company.controls['id'].setValue(res.data.id);
        this.company.controls['email'].setValue(res.data.email);
        this.company.controls['telephone'].setValue(res.data.telephone);
        this.company.controls['facebook'].setValue(res.data.facebook);
        this.company.controls['instagram'].setValue(res.data.instagram);
        this.company.controls['legal_certification'].setValue(
          res.data.legal_certification
        );
        this.company.controls['ubication'].setValue(res.data.ubication);
        this.company.controls['image'].setValue(res.data.image);

        this._companyService
          .findCompanyInfoByFk(res.data.id)
          .subscribe((res: any) => {

            if (res.data[0].company_name !== null ) {
              this.inputName = true;              
            }
            
            this.company.controls['company_nameEn'].setValue(
              res.data[0].company_name
            );
            this.company.controls['descriptionEn'].setValue(
              res.data[0].description
            );
            this.company.controls['directionEn'].setValue(
              res.data[0].direction
            );
            this.company.controls['paragraph1En'].setValue(
              res.data[0].paragraph1
            );
            this.company.controls['paragraph2En'].setValue(
              res.data[0].paragraph2
            );
            this.company.controls['paragraph3En'].setValue(
              res.data[0].paragraph3
            );
            this.company.controls['paragraph4En'].setValue(
              res.data[0].paragraph4
            );
            this.company.controls['paragraph5En'].setValue(
              res.data[0].paragraph5
            );
            this.company.controls['paragraph6En'].setValue(
              res.data[0].paragraph6
            );

            this.company.controls['company_nameSp'].setValue(
              res.data[1].company_name
            );
            this.company.controls['descriptionSp'].setValue(
              res.data[1].description
            );
            this.company.controls['directionSp'].setValue(
              res.data[1].direction
            );
            this.company.controls['paragraph1Sp'].setValue(
              res.data[1].paragraph1
            );
            this.company.controls['paragraph2Sp'].setValue(
              res.data[1].paragraph2
            );
            this.company.controls['paragraph3Sp'].setValue(
              res.data[1].paragraph3
            );
            this.company.controls['paragraph4Sp'].setValue(
              res.data[1].paragraph4
            );
            this.company.controls['paragraph5Sp'].setValue(
              res.data[1].paragraph5
            );
            this.company.controls['paragraph6Sp'].setValue(
              res.data[1].paragraph6
            );
          });
      });
    }
  }

  CompanyForm() {
    this.company = this.fb.group({
      id: [''],
      image: ['', [Validators.required,Validators.maxLength(100)]],
      telephone: ['', [Validators.required,Validators.maxLength(20)]],
      facebook: ['',[Validators.maxLength(50)]],
      instagram: ['',[Validators.maxLength(50)]],
      legal_certification: ['Asociacion Nandamojo',[Validators.maxLength(50)]],
      ubication: ['',[Validators.maxLength(250)]],
      email: ['', [Validators.email,Validators.maxLength(100)]],

      languaje_category_fk: [''],
      company_info_fk: [''],

      descriptionEn: ['',[Validators.maxLength(500)]],
      directionEn: ['', [Validators.required,Validators.maxLength(500)]],
      paragraph1En: ['',[Validators.maxLength(500)]],
      paragraph2En: ['',[Validators.maxLength(500)]],
      paragraph3En: ['',[Validators.maxLength(500)]],
      paragraph4En: ['',[Validators.maxLength(500)]],
      paragraph5En: ['',[Validators.maxLength(500)]],
      paragraph6En: ['null',[Validators.maxLength(500)]],
      company_nameEn: ['',[Validators.maxLength(150)]],

      descriptionSp: ['',[Validators.maxLength(500)]],
      directionSp: ['', [Validators.required,Validators.maxLength(500)]],
      paragraph1Sp: ['',[Validators.maxLength(500)]],
      paragraph2Sp: ['',[Validators.maxLength(500)]],
      paragraph3Sp: ['',[Validators.maxLength(500)]],
      paragraph4Sp: ['',[Validators.maxLength(500)]],
      paragraph5Sp: ['',[Validators.maxLength(500)]],
      paragraph6Sp: ['null',[Validators.maxLength(500)]],
      company_nameSp: ['',[Validators.maxLength(150)]],

      // company_info_fk: [''],
      image1: ['null', [Validators.maxLength(250) ]],
      image2: ['null', [Validators.maxLength(250) ]],
    });
  }

  get invalidImage() {
    return this.company.get('image').invalid && this.company.get('image').touched;
  }
  get invalidPhone() {
    return this.company.get('telephone').invalid && this.company.get('telephone').touched;
  }
  get invalidFacebook() {
    return this.company.get('facebook').invalid && this.company.get('facebook').touched;
  }
  get invalidInstagram() {
    return this.company.get('instagram').invalid && this.company.get('instagram').touched;
  }
  get invalidUbication() {
    return this.company.get('ubication').invalid && this.company.get('ubication').touched;
  }
  get invalidEmail() {
    return this.company.get('email').invalid && this.company.get('email').touched;
  }
  get invalidNameSp() {
    return this.company.get('company_nameSp').invalid && this.company.get('company_nameSp').touched;
  }
  get invalidNameEn() {
    return this.company.get('company_nameEn').invalid && this.company.get('company_nameEn').touched;
  }
  get invalidDescriptionEn() {
    return this.company.get('descriptionEn').invalid && this.company.get('descriptionEn').touched;
  }
  get invalidDirectionEn() {
    return this.company.get('directionEn').invalid && this.company.get('directionEn').touched;
  }
  get invalidParagraph1En() {
    return this.company.get('paragraph1En').invalid && this.company.get('paragraph1En').touched;
  }
  get invalidParagraph2En() {
    return this.company.get('paragraph2En').invalid && this.company.get('paragraph2En').touched;
  }
  get invalidParagraph3En() {
    return this.company.get('paragraph3En').invalid && this.company.get('paragraph3En').touched;
  }
  get invalidParagraph4En() {
    return this.company.get('paragraph4En').invalid && this.company.get('paragraph4En').touched;
  }
  get invalidParagraph5En() {
    return this.company.get('paragraph5En').invalid && this.company.get('paragraph5En').touched;
  }
  get invalidParagraph6En() {
    return this.company.get('paragraph6En').invalid && this.company.get('paragraph6En').touched;
  }
  get invalidCompany_nameEn() {
    return this.company.get('company_nameEn').invalid && this.company.get('company_nameEn').touched;
  }
  get invalidDescriptionSp() {
    return this.company.get('descriptionSp').invalid && this.company.get('descriptionSp').touched;
  }
  get invalidDirectionSp() {
    return this.company.get('directionSp').invalid && this.company.get('directionSp').touched;
  }
  get invalidParagraph1Sp() {
    return this.company.get('paragraph1Sp').invalid && this.company.get('paragraph1Sp').touched;
  }
  get invalidParagraph2Sp() {
    return this.company.get('paragraph2Sp').invalid && this.company.get('paragraph2Sp').touched;
  }
  get invalidParagraph3Sp() {
    return this.company.get('paragraph3Sp').invalid && this.company.get('paragraph3Sp').touched;
  }
  get invalidParagraph4Sp() {
    return this.company.get('paragraph4Sp').invalid && this.company.get('paragraph4Sp').touched;
  }
  get invalidParagraph5Sp() {
    return this.company.get('paragraph5Sp').invalid && this.company.get('paragraph5Sp').touched;
  }
  get invalidParagraph6Sp() {
    return this.company.get('paragraph6Sp').invalid && this.company.get('paragraph6Sp').touched;
  }
  get invalidCompany_nameSp() {
    return this.company.get('company_nameSp').invalid && this.company.get('company_nameSp').touched;
  }
}