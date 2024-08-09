import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Programs } from '../../../models/programs/Programs.model';
import { ProgramsLang } from '../../../models/programs/ProgramsLang.model';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.css'],
})
export class NewProgramComponent implements OnInit {
  program: FormGroup;
  programModel = new Programs();
  programModelEn = new ProgramsLang();
  programModelSp = new ProgramsLang();

  button = 1;

  constructor(
    private _programService: ProgramsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.programForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    let program_fk = this.route.snapshot.paramMap.get('program_fk');
    if (program_fk === 'new') {
      this.createProgram();
    } else {
      this.updateProgram();
    }
  }

  createProgram() {
    this.programModel.id = this.program.get('id').value;

    this._programService.createProgram(this.programModel).subscribe(
      (resp: any) => {
        this.programModelEn.program_fk = resp.Id;
        this.programModelEn.languaje_category_fk = 1;
        this.programModelEn.name = this.program.get('nameEn').value;
        this.programModelEn.description = this.program.get('descriptionEn').value;

        this.programModelSp.program_fk = resp.Id;
        this.programModelSp.languaje_category_fk = 2;
        this.programModelSp.name = this.program.get('nameSp').value;
        this.programModelSp.description = this.program.get('descriptionSp').value;

        this.createProgramDescripton(this.programModelEn);
        this.createProgramDescripton(this.programModelSp);

        Swal.fire('Program was added successfully!', 'Click ok', 'success');
        this._router.navigateByUrl('admin/list/programs');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createProgramDescripton(program: ProgramsLang) {
    this._programService.createProgramLang(program)
    .subscribe(
      ( resp : any) => {
      });
  }

  updateProgram() {
    this.programModelEn.program_fk = this.program.get('program_fk').value;
    this.programModelEn.languaje_category_fk = 1;
    this.programModelEn.name = this.program.get('nameEn').value;
    this.programModelEn.description = this.program.get('descriptionEn').value;

    this.programModelSp.program_fk = this.program.get('program_fk').value;
    this.programModelSp.languaje_category_fk = 2;
    this.programModelSp.name = this.program.get('nameSp').value;
    this.programModelSp.description = this.program.get('descriptionSp').value;

    this.updateDescription(this.programModelEn);
    this.updateDescription(this.programModelSp);

    Swal.fire('Program was updated successfully!', 'Click ok', 'success'),
    this._router.navigateByUrl('admin/list/programs');
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      };
  }

  updateDescription(program: ProgramsLang) {
    this._programService.updateProgram(program);
  }

  loadData() {
    const program_fk = this.route.snapshot.paramMap.get('program_fk');
    if (program_fk !== 'new') {
      this.button = 2;
      this._programService.findProgramByFk(program_fk).subscribe((res: any) => {
        this.program.controls['id'].setValue(res.data[0].id);
        this.program.controls['program_fk'].setValue(res.data[0].program_fk);
        this.program.controls['languaje_category_fk'].setValue(
          res.data[0].languaje_category_fk
        );
        this.program.controls['descriptionEn'].setValue(
          res.data[0].description
        );
        this.program.controls['nameEn'].setValue(res.data[0].name);

        this.program.controls['id'].setValue(res.data[1].id);
        this.program.controls['program_fk'].setValue(res.data[1].program_fk);
        this.program.controls['languaje_category_fk'].setValue(
          res.data[1].languaje_category_fk
        );
        this.program.controls['descriptionSp'].setValue(
          res.data[1].description
        );
        this.program.controls['nameSp'].setValue(res.data[1].name);
      });
    }
  }

  get invalidNameSp() {
    return (
      this.program.get('nameSp').invalid && this.program.get('nameSp').touched
    );
  }
  get invalidNameEn() {
    return (
      this.program.get('nameEn').invalid && this.program.get('nameEn').touched
    );
  }
  get invalidDescriptionSp() {
    return (
      this.program.get('descriptionSp').invalid &&
      this.program.get('descriptionSp').touched
    );
  }
  get invalidDescriptionEn() {
    return (
      this.program.get('descriptionEn').invalid &&
      this.program.get('descriptionEn').touched
    );
  }

  programForm() {
    this.program = this.fb.group({
      id: [''],
      program_fk: [''],
      languaje_category_fk: [''],
      nameEn: ['', [Validators.required,Validators.maxLength(250)]],
      nameSp: ['', [Validators.required,Validators.maxLength(250)]],
      descriptionEn: ['', [Validators.required,Validators.maxLength(250)]],
      descriptionSp: ['', [Validators.required,Validators.maxLength(250)]],
    });
  }
}
