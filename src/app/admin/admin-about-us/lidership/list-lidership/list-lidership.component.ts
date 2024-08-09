import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/service.index';
import { Lidership } from '../../../../models/lideship/lidership.model';
import { LidershipService } from '../../../../services/lidership/lidership.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-lidership',
  templateUrl: './list-lidership.component.html',
  styleUrls: ['./list-lidership.component.css'],
})
export class ListLidershipComponent implements OnInit {
  
  isAdmin: boolean = this._authService.isAdmin();
  lider: Lidership[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _liderService: LidershipService
  ) {}

  ngOnInit(): void {
    this.load = true;
    this.getAllLidership();
  }

  delete(data: Lidership) {
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
        this._liderService.deleteLidership(data.id).subscribe((res) => {
          this.getAllLidership();
        });
        Swal.fire( 'Lider was deleted successfully!', 'Click ok', 'success' );
      }
    });
  }

  getAllLidership() {
    this._liderService.getAllLiderships().subscribe((info: any) => {
      this.lider = info.data;
      this.load = false;
    });
  }
}
