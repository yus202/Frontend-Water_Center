import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from 'src/app/services/events/units.service';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StoreUnit } from '../../../../models/events/StoreUnit';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private unitService: UnitsService,
    private formBuilder: FormBuilder) { }

  unitId: number;
  id: number;
  unitsForm: FormGroup;
  submitted = false;
  unitsList: any;
  modalRef: BsModalRef;
  unitDataFromDB: any;

  storeUnitLang1: StoreUnit = {
    unit_fk: undefined,
    languaje_category_fk: undefined,
    name: undefined
  };

  storeUnitLang2: StoreUnit = {
    unit_fk: undefined,
    languaje_category_fk: undefined,
    name: undefined
  };

  ngOnInit(): void {
    this.unitsForm = this.formBuilder.group({
      esId: [null],
      spanishVersion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      enId: [null],
      englishVersion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });

    this.loadUnits();
  }

  loadUnits(): void {
    this.unitService.getUnits(1).subscribe(response => {
      if (response.status === 200)
      {
        this.unitsList = response.data;
      }
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  openUpdateModal(template: TemplateRef<any>, unitId: number): void {
    this.modalRef = this.modalService.show(template);
    this.setValuesToUpdateModal(unitId);
  }

  setValuesToUpdateModal(unitId: number): void {

    this.onReset(); // resetting form
    this.unitId = unitId;

    this.unitService.showUnit(unitId).subscribe(response => {

      if (response.status === 200) {
        this.unitDataFromDB = response.data;

        // looping array to set right data
        this.unitDataFromDB.forEach(unitLang => {
          if (unitLang.languaje_category_fk === 1) {
            // setting English language to input
            this.unitsForm.patchValue({
              enId: unitLang.id,
              englishVersion: unitLang.name
            });
          }
          else {
            // setting Spanish language to input
            this.unitsForm.patchValue({
              esId: unitLang.id,
              spanishVersion: unitLang.name
            });
          }
        });
      }

    });
  }

  insertUnit(): any {

    this.submitted = true;
    if (this.unitsForm.valid) {

      this.unitService.insertUnit().subscribe(response => {
        if (response.status === 200)
        {
          this.unitId = response.data.id;
          console.log(this.unitId, response.data.id);
          this.storeUnitLang1.unit_fk = this.unitId;
          this.storeUnitLang1.languaje_category_fk = 1;
          this.storeUnitLang1.name = this.unitsForm.value.englishVersion;

          this.storeUnitLang2.unit_fk = this.unitId;
          this.storeUnitLang2.languaje_category_fk = 2;
          this.storeUnitLang2.name = this.unitsForm.value.spanishVersion;

          this.insertUnitLanguaje(this.storeUnitLang1);
          this.insertUnitLanguaje(this.storeUnitLang2);
          this.modalRef.hide();
          this.onReset();
        }
      }, error => {
        Swal.fire(
          'Ups!',
          'You clicked the button!',
          'error'
        );
      });
    }
  }

  get f(): any {
    return this.unitsForm.controls;
  }

  insertUnitLanguaje(unit: StoreUnit): any {

    this.unitService.insertUnitLanguaje(unit).subscribe(response => {
      if (response.status === 200)
      {
        this.loadUnits();
      }
    }, error => {
      Swal.fire(
        'Ups!',
        'Seems like there is an error, this result type could not be created!',
        'error'
      );
    });

  }

  updateUnit(): void {
    this.submitted = true;

    if (this.unitsForm.valid)
    {
      this.storeUnitLang1.unit_fk = this.unitId;
      this.storeUnitLang1.languaje_category_fk = 1;
      this.storeUnitLang1.name = this.unitsForm.value.englishVersion;

      this.storeUnitLang2.unit_fk = this.unitId;
      this.storeUnitLang2.languaje_category_fk = 2;
      this.storeUnitLang2.name = this.unitsForm.value.spanishVersion;
      this.updateLanguage(this.storeUnitLang1, this.unitsForm.value.enId);
      this.updateLanguage(this.storeUnitLang2, this.unitsForm.value.esId);
      this.modalRef.hide();
      this.onReset();
    }
  }

  updateLanguage(unitLanguaje: StoreUnit, unitLanguageId: number): void {
    this.unitService.updateUnit(unitLanguaje, unitLanguageId).subscribe(response => {
      if (response.status === 200) {
        this.loadUnits();
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.unitsForm.reset();
  }

  deleteUnit(groupFk): void {

    Swal.fire({

      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {

      if (result.isConfirmed) {
        this.unitService.deleteUnit(groupFk).subscribe( response => {
          if (response.status === 200)
          {
            this.loadUnits();
          }
        }, error => {
          Swal.fire(
            'Ups!',
            'Seems like there is an error, this result type could not be erased!',
            'error'
          );
        });
      }
    });
  }

}
