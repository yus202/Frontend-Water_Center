import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from 'src/app/services/events/units.service';
import { EventsService } from '../../../../services/events/events.service';
import { Units } from '../../../../models/events/Units';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-event-unit',
  templateUrl: './insert-event-unit.component.html',
  styleUrls: ['./insert-event-unit.component.css']
})
export class InsertEventUnitComponent implements OnInit {

  @Input() eventIDFk: number;
  units: Units[];
  modalRef: BsModalRef;
  unitForm: FormGroup;
  eventUnitModel: any = {};
  submitted = false;
  retults: any;
  selectedUnit: any = null;
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private unitService: UnitsService,
    private eventService: EventsService) { }

  ngOnInit(): void {

    this.listUnits();
    this.unitForm = this.formBuilder.group({

      selectUnit: [null, [Validators.required]],
      quantity: [0, Validators.required]

    });

    if (this.eventIDFk) {
      this.listEventResults();
    }

  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);

  }

  get f(): any {
    return this.unitForm.controls;
  }

  setUnitVariable(e): void {
    this.selectedUnit = e.target.value;
  }

  listUnits(): void {

    this.unitService.getUnits(1).subscribe(response => {
      if (response.status === 200)
      {
        this.units = response.data;
      }
    });

  }

  listEventResults(): void {
    this.eventService.getEventUnits(this.eventIDFk, 1).subscribe(response => {
      if (response.status === 200)
      {
        this.retults = response.data;
      }
    });
  }

  insertEventUnit(): void {
    this.submitted = true;
    console.log(this.unitForm.value.selectUnit);
    this.eventUnitModel.id_event_fk = this.eventIDFk;
    this.eventUnitModel.id_unit_fk = this.unitForm.value.selectUnit;
    this.eventUnitModel.quantity = this.unitForm.value.quantity;

    if (this.unitForm.valid && this.selectedUnit != null)
    {
      this.eventService.insertEventUnit(this.eventUnitModel).subscribe( response => {
        if (response.status === 200)
        {
          this.listEventResults();
          this.modalRef.hide();
        }
      }, error => {
        Swal.fire(
          'Ups!',
          'Seems like there is an error, this result could not be created!',
          'error'
        );
      });
    }
  }

  deleteEventUnit(eventUnitID: number): void {
    this.eventService.deleteEventUnit(eventUnitID).subscribe(response => {
      if (response.status === 200)
      {
        this.listEventResults();
      }
    }, error => {
      Swal.fire(
        'Ups!',
        'Seems like there is an error, this result could not be erased!',
        'error'
      );
    });
  }

}
