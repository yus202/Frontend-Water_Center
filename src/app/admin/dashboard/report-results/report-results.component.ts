import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html',
  styleUrls: ['./report-results.component.css']
})
export class ReportResultsComponent implements OnInit {

  // variables
  @Input() eventID: number;
  @Input() languageID: number;
  units: any;
  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults(): void {
    this.eventsService.getEventUnits(this.eventID, this.languageID).subscribe(response => {
      if (response.status === 200) {
        this.units = response.data;
      }
    });
  }

}
