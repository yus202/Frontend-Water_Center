import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from '../../../../models/events/Events';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evetns-dashboard',
  templateUrl: './evetns-dashboard.component.html',
  styleUrls: ['./evetns-dashboard.component.css']
})
export class EvetnsDashboardComponent implements OnInit {

  events: Events[];
  constructor(private eventService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {

    this.eventService.getEvents(1).subscribe(response => {
      if (response.status === 200)
      {
        this.events = response.data;
      }
    });

  }

  deleteEvent(eventId): void {
    this.eventService.deleteEvent(eventId).subscribe( response => {
      if (response.status === 200){
        Swal.fire(
          'Well done!',
          'Event has been deleted!',
          'success'
        );
      }
    }, error => {
      Swal.fire(
        'Ups!',
        'Seems like there is an error, the event could not be deleted!',
        'error'
      );
    });
  }

  deleteEventGroupAndUnit(eventId): void {

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
        this.eventService.deleteAllEventGroups(eventId).subscribe(response => {
          if (response.status === 200) {

            this.eventService.deleteAllEventUnits(eventId).subscribe(resp => {
              if (resp.status === 200) {
                this.deleteEvent(eventId);
                this.loadEvents();
              }
            });

          }
        });
      }
    }, ( error: any) => {
      console.log(error.error);
      Swal.fire(error.error.error, 'Click ok', 'error');
    });
  }

  addEvent(): void {

    this.router.navigateByUrl('/events/create');

  }

}

