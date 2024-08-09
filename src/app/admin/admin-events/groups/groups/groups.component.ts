import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupLanguaje } from 'src/app/models/events/GroupLanguaje ';
import { GroupsService } from 'src/app/services/events/groups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupsForm: FormGroup;
  submitted = false;
  groupId: number;
  modalRef: BsModalRef;
  groupsList: any;
  groupDataFromDB: any;

  groupLanguaje1: GroupLanguaje = {
    group_fk: undefined,
    languaje_category_fk: undefined,
    name: undefined
  };

  groupLanguaje2: GroupLanguaje = {
    group_fk: undefined,
    languaje_category_fk: undefined,
    name: undefined
  };

  constructor(
    private groupService: GroupsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.groupsForm = this.formBuilder.group({
      esId: [null],
      spanishVersion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      enId: [null],
      englishVersion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
    this.loadGroups();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  openUpdateModal(template: TemplateRef<any>, groupId: number): void {
    this.modalRef = this.modalService.show(template);
    this.setValuesToUpdateModal(groupId);
  }

  setValuesToUpdateModal(groupId: number): void {

    this.onReset(); // resetting form
    this.groupId = groupId;

    this.groupService.showGroup(groupId).subscribe(response => {

      if (response.status === 200){
        this.groupDataFromDB = response.data;

        // looping array to set right data
        this.groupDataFromDB.forEach(groupLang => {
          if (groupLang.languaje_category_fk === 1) {
            // setting English language to input
            this.groupsForm.patchValue({
              enId: groupLang.id,
              englishVersion: groupLang.name
            });
          }
          else {
            // setting Spanish language to input
            this.groupsForm.patchValue({
              esId: groupLang.id,
              spanishVersion: groupLang.name
            });
          }
        });
      }

    });
  }

  onReset(): void {
    this.submitted = false;
    this.groupsForm.reset();
  }

  insertGroup(): any {

    this.submitted = true;
    if (this.groupsForm.valid)
    {
      this.groupService.insertGroup().subscribe(response => {
        if (response.status === 200)
        {
          this.groupId = response.data.id;

          this.groupLanguaje1.group_fk = this.groupId;
          this.groupLanguaje1.languaje_category_fk = 1;
          this.groupLanguaje1.name = this.groupsForm.value.englishVersion;

          this.groupLanguaje2.group_fk = this.groupId;
          this.groupLanguaje2.languaje_category_fk = 2;
          this.groupLanguaje2.name = this.groupsForm.value.spanishVersion;

          this.insertLanguaje(this.groupLanguaje1);
          this.insertLanguaje(this.groupLanguaje2);
          this.modalRef.hide();
          this.onReset();
        }
      });
    }

  }

  get f(): any {
    return this.groupsForm.controls;
  }

  insertLanguaje(groupLanguaje: GroupLanguaje): any {

    this.groupService.insertGroupLanguaje(groupLanguaje).subscribe(response => {
      if (response.status === 200)
      {
        this.loadGroups();
      }
    }, error => {
      Swal.fire(
        'Ups!',
        'Seems like there is an error, this group could not be created!',
        'error'
      );
    });
  }

  updateVolunteerGroup(): void {
    this.submitted = true;

    if (this.groupsForm.valid)
    {
      this.groupLanguaje1.group_fk = this.groupId;
      this.groupLanguaje1.languaje_category_fk = 1;
      this.groupLanguaje1.name = this.groupsForm.value.englishVersion;

      this.groupLanguaje2.group_fk = this.groupId;
      this.groupLanguaje2.languaje_category_fk = 2;
      this.groupLanguaje2.name = this.groupsForm.value.spanishVersion;
      this.updateLanguage(this.groupLanguaje1, this.groupsForm.value.enId);
      this.updateLanguage(this.groupLanguaje2, this.groupsForm.value.esId);
      this.closeModal();
      this.onReset();
    }

  }

  updateLanguage(groupLanguaje: GroupLanguaje, groupLanguageId: number): void {
    this.groupService.updateGroup(groupLanguaje, groupLanguageId).subscribe(response => {
      if (response.status === 200) {
        this.loadGroups();
      }
    });
  }

  loadGroups(): void {
    this.groupService.getGroups(1)
      .subscribe(response => {
        if (response.status === 200)
        {
          this.groupsList = response.data;
        }
      });
  }

  deleteGroup(groupFk: number): void {
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
        this.groupService.deleteGroup(groupFk).subscribe(response => {
          if (response.status === 200) {
            this.loadGroups();
          }
        }, error => {
          Swal.fire(
            'Ups!',
            'Seems like there is an error, this group could not be erased!',
            'error'
          );
        });
      }
    });
  }

}
