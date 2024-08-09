import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventLanguage } from 'src/app/models/events/EventLanguage ';
import { Programs } from 'src/app/models/programs/Programs.model';
import { EventsService } from 'src/app/services/events/events.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import Swal from 'sweetalert2';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  programs: Programs[];
  eventForm: FormGroup;
  meridian = true;
  eventModel: any = {};
  eventId: number;
  submitted = false;
  selectedProgram: any = null;

  response1 = false;
  response2 = false;

  eventLanguage1: EventLanguage = {
    id: undefined,
    event_fk: undefined,
    languaje_category_fk: undefined,
    description: undefined,
    equipment: undefined,
    location: undefined
  };

  eventLanguage2: EventLanguage = {
    id: undefined,
    event_fk: undefined,
    languaje_category_fk: undefined,
    description: undefined,
    equipment: undefined,
    location: undefined
  };

  constructor(
    private programsService: ProgramsService,
    private eventService: EventsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private calendar: NgbCalendar
    ) {
    }

  ngOnInit(): void {

    this.loadPrograms();
    this.eventForm = this.formBuilder.group({
      time: [new Date(), [Validators.required]],
      dateFull: [this.calendar.getToday(), [Validators.required]],
      selectProgram: [null, [Validators.required]],
      descriptionEnglishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      equipmentEnglishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(600)]],
      locationEnglishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      descriptionSpanishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      equipmentSpanishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(600)]],
      locationSpanishVersion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  loadPrograms(): void {

    this.programsService.getProgramsByLanguage(1).subscribe( ( response: any ) => {
        this.programs = response.data;
    }, error => {
      Swal.fire(
        'Ups!',
        'Seem like we couldn`t load programs!',
        'error'
      );
    });

  }

  get f(): any {
    return this.eventForm.controls;
  }

  insertEvent(): any {

    this.submitted = true;
    if (this.eventForm.valid && this.selectedProgram != null)
    {
      this.eventModel.programs_fk = this.eventForm.value.selectProgram;
      // adding date to date model
      this.eventModel.date = this.eventForm.value.dateFull.year
      + '-' + this.eventForm.value.dateFull.month
      + '-' + this.eventForm.value.dateFull.day;
      // adding time to date model
      this.eventModel.date = this.eventModel.date
      + ' ' + this.eventForm.value.time.getHours()
      + ':' + this.eventForm.value.time.getMinutes() + ':00';

      this.eventService.insertEvent(this.eventModel).subscribe(response => {
        if (response.status === 200)
        {
          this.eventId = response.data.id;
          this.eventLanguage1.event_fk = this.eventId;
          this.eventLanguage1.description = this.eventForm.value.descriptionEnglishVersion;
          this.eventLanguage1.equipment = this.eventForm.value.equipmentEnglishVersion;
          this.eventLanguage1.location = this.eventForm.value.locationEnglishVersion;
          this.eventLanguage1.languaje_category_fk = 1;

          this.eventId = response.data.id;
          this.eventLanguage2.event_fk = this.eventId;
          this.eventLanguage2.description = this.eventForm.value.descriptionSpanishVersion;
          this.eventLanguage2.equipment = this.eventForm.value.equipmentSpanishVersion;
          this.eventLanguage2.location = this.eventForm.value.locationSpanishVersion;
          this.eventLanguage2.languaje_category_fk = 2;

          this.insertEventLanguage(this.eventLanguage1);
          this.insertEventLanguage(this.eventLanguage2);

        }

      }, error => {
        Swal.fire(
          'Ups!',
          'Seems like there is an error, the event could not be created!',
          'error'
        );
      });
    }
  }

  setProgramVariable(e): void {
    this.selectedProgram = e.target.value;
  }

  insertEventLanguage(eventLanguage: EventLanguage): void {

    this.eventService.insertEventLanguage(eventLanguage).subscribe(response => {
      if (response.status === 200)
      {
        if (eventLanguage.languaje_category_fk === 1) {
          this.response1 = true;
        }
        else {
          this.response2 = true;
        }

        if (this.response1 === true && this.response2 === true) {
          Swal.fire(
            'Well done!',
            'Event created successfully!',
            'success'
          );
        }

      }
    }, error => {
      return false;
    });

  }

}

