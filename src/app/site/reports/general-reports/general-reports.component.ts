import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../../../services/shared/language.service';
import { ReportsService } from '../../../services/reports/reports.service';
import { GroupsService } from '../../../services/events/groups.service';
import { ProgramsService } from '../../../services/programs/programs.service';

@Component({
  selector: 'app-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.css'],
})
export class GeneralReportsComponent implements OnInit {

  // ----- variables---------//
    // calendar
  hoveredDate: NgbDate | null = null;
  languageID: number;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
    // selects
  selectedGroup = '%';
  selectedProgram = '%';
    // groups, programs, units data
  units: any;
  programs: string;
  groups: any;
  // data from database results
  reportsResult: any;
  // variables model to send reques to backend
  variablesModel: any = {};

  // constructor
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private languageService: LanguageService,
    private reportService: ReportsService,
    private programsService: ProgramsService,
    private groupService: GroupsService) {

      this.fromDate = this.calendar.getToday();
      this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

      // Language Service
      this.languageService.getLanguage().subscribe( response => {
        this.languageID =  response;
      });
   }
   // end of constructor

  ngOnInit(): void {
    this.getPrograms();
    this.getGroups();
  }
  // DatePicker functions
  onDateSelection(date: NgbDate): void {

    if (!this.fromDate && !this.toDate)
    {
      this.fromDate = date;
    }
    else if (this.fromDate && !this.toDate && date && date.after(this.fromDate))
    {
      this.toDate = date;
    }
    else
    {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate): any {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate): any {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): any {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  // End of datePicker functions

  generateReport(): any {
    // validating if date in case = null
    if (this.toDate === null)
    {
      console.log('vacio');
    }
    else
    {
      // formatting dates
      const DateFromFormat = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day + ' ' + '00:00:00';
      const DateToFormat = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day + ' ' + '23:59:00';
      // setting data to model to make post
      this.variablesModel.inicial_date = DateFromFormat;
      this.variablesModel.final_date = DateToFormat;
      this.variablesModel.program_name = this.selectedProgram;
      this.variablesModel.group_name = this.selectedGroup;
      this.variablesModel.languageID = this.languageID;
      this.reportService.searchReportResults(this.variablesModel).subscribe( response => {
        // setting data from Backend to reportsResult object
        this.reportsResult = response.data;
        console.log(this.reportsResult);
        console.log(this.variablesModel);
      });
    }
  }

  getPrograms(): void {
    this.programsService.getProgramsByLanguage(this.languageID).subscribe(response => {
      this.programs = response.data;
    });
  }

  getGroups(): void {
    this.groupService.getGroups(this.languageID).subscribe(response => {
      this.groups = response.data;
    });
  }

  setProgramVariable(e): void {
    this.selectedProgram = e.target.value;
  }

  setGroupVariable(e): void {
    this.selectedGroup = e.target.value;
  }

}
