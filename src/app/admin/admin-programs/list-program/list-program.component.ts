import { Component, OnInit } from '@angular/core';
import { AuthService, ProgramsService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ProgramsLang } from '../../../models/programs/ProgramsLang.model';

@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css'],
})
export class ListProgramComponent implements OnInit {
  isAdmin: boolean = this._authService.isAdmin();
  programLang: ProgramsLang[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _programsService: ProgramsService
  ) {}

  ngOnInit(): void {
    this.load = true;
    this.getAllPrograms();
  }

  delete(data: ProgramsLang) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._programsService.deleteProgram(data.program_fk).subscribe((res) => {
          Swal.fire('Program was deleted successfully!', 'Click ok', 'success');
          this.getAllPrograms();
        });
      
      }
    },( error : any) =>{
      console.log(error.error);
      Swal.fire(error.error.error, 'Click ok', 'error');
    });
  }

  getAllPrograms() {
    this._programsService.getAllPrograms().subscribe((info: any) => {
      this.programLang = info.data;
      this.load = false;
    });
  }

}
