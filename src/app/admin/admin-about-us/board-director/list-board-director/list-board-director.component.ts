import { Component, OnInit } from '@angular/core';
import { boardDirectors } from '../../../../models/board-director/boardDirectors.model';
import { BoardDirectorService } from '../../../../services/board-director/board-director.service';

import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-list-board-director',
  templateUrl: './list-board-director.component.html',
  styleUrls: ['./list-board-director.component.css']
})
export class ListBoardDirectorComponent implements OnInit {

  board: boardDirectors[];
  load = false;

  constructor( private board_service: BoardDirectorService ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllBoardDirectors();
  }

  delete( data: boardDirectors ): void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.board_service.deleteBoardDirector( data.id ).subscribe( res => {
          this.getAllBoardDirectors();
        });
        Swal.fire(
          'Board Director was deleted successfully!',
          'Click ok',
          'success'
        );
      }
    });
  }

  getAllBoardDirectors(): void {
    this.board_service.getAllBoardDirector().subscribe( ( info: any )  => {
      this.board = info.data;
      this.load = false;
    });
  }

}

