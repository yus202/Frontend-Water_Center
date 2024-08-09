import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../../../services/events/groups.service';
import { EventsService } from '../../../../services/events/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-event-groups',
  templateUrl: './insert-event-groups.component.html',
  styleUrls: ['./insert-event-groups.component.css']
})
export class InsertEventGroupsComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() eventIDFk: number;
  groupForm: FormGroup;
  groups: any;
  eventGroups: any;
  submitted = false;
  eventGroupModel: any = {};
  selectedGroup: any = null;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private groupService: GroupsService,
    private eventService: EventsService) { }

  ngOnInit(): void {
    this.listGroups();
    this.groupForm = this.formBuilder.group({
      selectGroup: [null, [Validators.required]],
      quantity: [0, Validators.required]
    });

    if (this.eventIDFk) {
      this.listEventGroups();
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  get f(): any {
    return this.groupForm.controls;
  }

  setGroupVariable(e): void {
    this.selectedGroup = e.target.value;
  }

  listEventGroups(): void {
    this.eventService.getEventGroups(this.eventIDFk, 1).subscribe( response => {
      if (response.status === 200)
      {
        this.eventGroups = response.data;
      }
    });
  }

  insertEventGroup(): any {
    this.submitted = true;
    this.eventGroupModel.event_fk = this.eventIDFk;
    this.eventGroupModel.group_fk = this.groupForm.value.selectGroup;
    this.eventGroupModel.quantity = this.groupForm.value.quantity;

    if (this.groupForm.valid && this.selectedGroup != null)
    {
      this.eventService.insertEventGroup(this.eventGroupModel).subscribe( response => {
        if (response.status === 200)
        {
          this.listEventGroups();
          this.modalRef.hide();
        }
      });
    }
  }

  listGroups(): void {
    this.groupService.getGroups(1).subscribe( response => {
      if (response.status === 200)
      {
        this.groups = response.data;
      }
    });
  }

  deleteEventGroup(eventGroupID: number): void {
    this.eventService.deleteEventGroup(eventGroupID).subscribe(response => {
      if (response.status === 200)
      {
        this.listEventGroups();
      }
    }, error => {
      Swal.fire(
        'Ups!',
        'Seems like there is an error, this group could not be erased!',
        'error'
      );
    });
  }

}
