import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Strategy } from 'src/app/models/strategy/Strategy.model';
import { StrategyLanguaje } from 'src/app/models/strategy/StrategyLanguaje.model';
import { RestoringOurServiceService } from 'src/app/services/Restoring-our-watershed/restoring-our-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-strategy',
  templateUrl: './new-strategy.component.html',
  styleUrls: ['./new-strategy.component.css']
})
export class NewStrategyComponent implements OnInit {

  strategy : FormGroup;
  strategyModel = new Strategy();
  strategySpModel = new StrategyLanguaje();
  strategyEnModel = new StrategyLanguaje();

  button = 1;

  constructor(
    private _strategyService : RestoringOurServiceService,
    private _route : ActivatedRoute,
    private _router : Router,
    private fb : FormBuilder
  ) { 
    this.strategyForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit( ){
    const id = this._route.snapshot.paramMap.get('id');
    if( id === 'new'){
      this.createStrategy();
    }else{
      this.updateStrategy();
    }
  }

  createStrategy(){
   
    this.strategyModel.id = this.strategy.get('id').value;
    this.strategyModel.image = this.strategy.get('image').value;
    this._strategyService.createStrategy(this.strategyModel)
    .subscribe(
      (response:any)=>{
        
        this.strategyEnModel.category_langajes_fk = 1;
        this.strategyEnModel.strategy_fk = response.Id;
        this.strategyEnModel.decription = this.strategy.get('decriptionEn').value;
        this.strategyEnModel.title = this.strategy.get('decriptionEn').value;
        
        this.strategySpModel.category_langajes_fk = 2;
        this.strategySpModel.strategy_fk = response.Id;
        this.strategySpModel.decription = this.strategy.get('decriptionSp').value;
        this.strategySpModel.title = this.strategy.get('decriptionSp').value;
        
        this.createDescription(this.strategyEnModel);
        this.createDescription(this.strategySpModel);

        Swal.fire(
          'Strategy was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigate( ['admin/strategies'] );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      } 
    );

  }

  createDescription( strategy : StrategyLanguaje ){
    this._strategyService.createStrategyLang(strategy).
    subscribe( );
  }
  updateStrategy(){

    this.strategyModel.id = this.strategy.get('id').value;
    this.strategyModel.image = this.strategy.get('image').value;
    this._strategyService.updatStrategy(this.strategyModel)
    .subscribe(
      (response:any)=>{
        
        this.strategyEnModel.category_langajes_fk = 1;
        this.strategyEnModel.strategy_fk = response.Id;
        this.strategyEnModel.decription = this.strategy.get('decriptionEn').value;
        this.strategyEnModel.title = this.strategy.get('titleEn').value;
        
        this.strategySpModel.category_langajes_fk = 2;
        this.strategySpModel.strategy_fk = response.Id;
        this.strategySpModel.decription = this.strategy.get('decriptionSp').value;
        this.strategySpModel.title = this.strategy.get('titleSp').value;
        
        this.updateDescription(this.strategyEnModel);
        this.updateDescription(this.strategySpModel);

        Swal.fire(
          'Strategy was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigate( ['admin/strategies'] );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      } 
    );

  }
  updateDescription( strategyLang : StrategyLanguaje){
    this._strategyService.updatStrategyLang( strategyLang )
    .subscribe( );
  }

  loadData(){
    const id = this._route.snapshot.paramMap.get('id');
    if( id !== 'new'){
      this.button = 2;

      this._strategyService.findStrategyById( id )
      .subscribe(
        (response:any)=>{
          this.strategy.controls['id'].setValue( response.data.id );
          this.strategy.controls['image'].setValue( response.data.image );
          
          this._strategyService.findStrategyByFk( response.data.id )
          .subscribe(
            (response:any)=>{
              this.strategy.controls['decriptionEn'].setValue(
                response.data[0].decription
              );
              this.strategy.controls['titleEn'].setValue(
                response.data[0].title
              );

              this.strategy.controls['decriptionSp'].setValue(
                response.data[1].decription
              );
              this.strategy.controls['titleSp'].setValue(
                response.data[1].title
              );
            }
          )
        }
      )

    }
  }
  strategyForm(){
    this.strategy = this.fb.group({
      id : [''],
      image : ['',[Validators.required,Validators.maxLength(250)]],
      category_langajes_fk : [''],
      strategy_fk : [''],
      titleEn : ['',[Validators.required,Validators.maxLength(110)]],
      decriptionEn : ['',[Validators.required,Validators.maxLength(500)]],
      titleSp : ['',[Validators.required,Validators.maxLength(110)]],
      decriptionSp : ['',[Validators.required,Validators.maxLength(500)]],
    });
  }

  
  get invalidTitleEn() {
    return this.strategy.get('titleEn').invalid && this.strategy.get('titleEn').touched;
  } 
  get invalidTitleSp() {
    return this.strategy.get('titleSp').invalid && this.strategy.get('titleSp').touched;
  } 
  get invalidDecriptionEn() {
    return this.strategy.get('decriptionEn').invalid && this.strategy.get('decriptionEn').touched;
  } 
  get invalidDecriptionSp() {
    return this.strategy.get('decriptionSp').invalid && this.strategy.get('decriptionSp').touched;
  } 
  get invalidImage() {
    return this.strategy.get('image').invalid && this.strategy.get('image').touched;
  } 

}
