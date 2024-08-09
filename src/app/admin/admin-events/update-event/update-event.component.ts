import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events/events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import Swal from 'sweetalert2';
import { ProgramsLang } from 'src/app/models/programs/ProgramsLang.model';
import { EventLanguage } from 'src/app/models/events/EventLanguage ';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  // variables
  eventId: number;
  esLangId: number;
  enLangId: number;
  programs: ProgramsLang[];
  defaultProgram: any = {};
  dateFormat: Date;
  programId: number;
  eventLanguages: any;
  eventdataFromServer: any;
  eventForm: FormGroup;
  submitted = false;
  selectedProgram: any = null;
  eventModel: any = {};
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

  // constructor
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private programsService: ProgramsService,
    private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

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

    this.loadEventData();
  }

  get f(): any {
    return this.eventForm.controls;
  }

  loadEventData(): void {
    this.eventService.showEventInfoById(this.eventId).subscribe(response => {
      this.eventdataFromServer = response.data;
      this.setDataToInputs(this.eventdataFromServer);
    });
  }

  loadPrograms(): void {

    this.programsService.getProgramsByLanguage(1).subscribe( ( response: any ) => {
      this.programs = response.data;
      let i = 0;
      this.programs.forEach(program => {
        if (program.program_fk !== this.programId) {
          this.programs[i] = program;
          i ++;
        }
        else
        {
          this.defaultProgram.program_fk = program.program_fk;
          this.defaultProgram.name = program.name;
        }
      });
    }, error => {
      Swal.fire(
        'Ups!',
        'Seem like we couldn`t load programs!',
        'error'
      );
    });
  }

  setDataToInputs(eventdataFromServer: any): void {
    // formatting date
    const date = new Date(eventdataFromServer[0].date).toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
    // setting formatted date to Date type variable
    this.dateFormat = new Date(date);

    // setting data to date picker, program and time
    this.eventForm.patchValue({
      time: this.dateFormat,
      dateFull: new NgbDate(this.dateFormat.getFullYear(), this.dateFormat.getMonth() + 1, this.dateFormat.getDate()),
      selectProgram: eventdataFromServer[0].programs_fk
    });

    // setting value to program id
    this.programId = eventdataFromServer[0].programs_fk;
    // setting languages data
    this.eventLanguages = eventdataFromServer[0].event_languajes;
    // organizing data by language

    for (const eventLanguage of this.eventLanguages) {
      // setting data by language to inputs
      if (eventLanguage.languaje_category_fk === 1) {
        this.enLangId = eventLanguage.id;
        this.eventForm.patchValue({
          descriptionEnglishVersion: eventLanguage.description,
          equipmentEnglishVersion: eventLanguage.equipment,
          locationEnglishVersion: eventLanguage.location
        });
      }
      else {
        this.esLangId = eventLanguage.id;
        this.eventForm.patchValue({
          descriptionSpanishVersion: eventLanguage.description,
          equipmentSpanishVersion: eventLanguage.equipment,
          locationSpanishVersion: eventLanguage.location
        });
      }
    }
    // loading programs
    this.loadPrograms();
  }

  setProgramVariable(e): void {
    this.selectedProgram = e.target.value;
  }

  updateEvent(): any {

    this.submitted = true;
    if (this.eventForm.valid)
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

      this.eventService.updateEvent(this.eventModel, this.eventId).subscribe(response => {
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

          this.updateEventLanguage(this.eventLanguage1, this.enLangId);
          this.updateEventLanguage(this.eventLanguage2, this.esLangId);

        }

      }, error => {
        Swal.fire(
          'Ups!',
          'Seems like there is an error, the event could not be updated!',
          'error'
        );
      });
    }
  }

  updateEventLanguage(eventLanguage: EventLanguage, eventLanguageId: number): void {

    this.eventService.updateEventLanguage(eventLanguage, eventLanguageId).subscribe(response => {
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
            'Event updated successfully!',
            'success'
          );
        }

      }
    }, error => {
      return false;
    });

  }

}
