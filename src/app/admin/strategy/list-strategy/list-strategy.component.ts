import { Component, OnInit } from '@angular/core';
import { StrategyLanguaje } from 'src/app/models/strategy/StrategyLanguaje.model';
import { RestoringOurServiceService } from 'src/app/services/Restoring-our-watershed/restoring-our-service.service';
import Swal from 'sweetalert2';
import { Strategy } from '../../../models/strategy/Strategy.model';
@Component({
  selector: 'app-list-strategy',
  templateUrl: './list-strategy.component.html',
  styleUrls: ['./list-strategy.component.css']
})
export class ListStrategyComponent implements OnInit {

  strategies : Strategy[];
  load = false;

  constructor(
    private _strategyService : RestoringOurServiceService
  ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllStrategies();
  }

  getAllStrategies(){
    this._strategyService.getAllStrategy()
    .subscribe(
      (response:any)=>{
        this.strategies = response.data;
        this.load = false;
      }
    )
  }

  delete( data : StrategyLanguaje ){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( ( result ) => {
      if ( result.isConfirmed ) {
        this._strategyService.deleteStrategy( data.strategy_fk ).subscribe( res => {
          this.getAllStrategies();
        });
        Swal.fire(
          'Donation was deleted successfully!',
          'Click ok',
          'success'
        )
      }
    })
  }

}
