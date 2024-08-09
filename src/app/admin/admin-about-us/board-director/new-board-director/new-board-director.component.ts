import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { boardDirectors } from '../../../../models/board-director/boardDirectors.model';
import { boardDirectorsLang } from '../../../../models/board-director/boardDirectorsLang.model';
import { BoardDirectorService } from '../../../../services/board-director/board-director.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-board-director',
  templateUrl: './new-board-director.component.html',
  styleUrls: ['./new-board-director.component.css']
})
export class NewBoardDirectorComponent implements OnInit {

  board : FormGroup;
  boardModel = new boardDirectors();
  boardEnModel = new boardDirectorsLang();
  boardSpModel = new boardDirectorsLang();

  button = 1;

  constructor( private board_service : BoardDirectorService,
               private route: ActivatedRoute,
               private _router: Router,
               private fb: FormBuilder
    ) { 
      this.boardForm();
   }

  ngOnInit(): void { 
    this.loadData();
  }


  onSubmit( ){
    const id = this.route.snapshot.paramMap.get('id');
    if( id === 'new'){
      this.createBoard();
    }else{
      this.updateBoard();
    }
  }

  createBoard(){
    this.boardModel.id = this.board.get('id').value;
    this.boardModel.name = this.board.get('name').value;

    this.board_service.createBoardDirector( this.boardModel )
    .subscribe(
      (response : any ) => {
        this.boardEnModel.board_directors_fk = response.Id;
        this.boardEnModel.languaje_cateory_fk = 1;
        this.boardEnModel.description = this.board.get('descriptionEn').value;
    
        this.boardSpModel.board_directors_fk = response.Id;
        this.boardSpModel.languaje_cateory_fk = 2;
        this.boardSpModel.description = this.board.get('descriptionSp').value;
    
        this.createBoardDescription( this.boardEnModel );
        this.createBoardDescription( this.boardSpModel );

        Swal.fire(
          'Partner Organization was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigate( ['admin/list/board/directors'] );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateBoard(){
    this.boardModel.id = this.board.get('id').value;
    this.boardModel.name = this.board.get('name').value;

    this.board_service.updateBoardDirector( this.boardModel )
    .subscribe(
      ( response : any ) => {
        
        this.boardEnModel.board_directors_fk = response.Id;
        this.boardEnModel.languaje_cateory_fk = 1;
        this.boardEnModel.description = this.board.get('descriptionEn').value;
     
        this.boardSpModel.board_directors_fk = response.Id;
        this.boardSpModel.languaje_cateory_fk = 2;
        this.boardSpModel.description = this.board.get('descriptionSp').value;
     
        this.updateBoardDescription( this.boardEnModel );
        this.updateBoardDescription( this.boardSpModel );
        
        Swal.fire(
          'Partner Organization was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigate( ['admin/list/board/directors'] );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createBoardDescription( board : boardDirectorsLang){
    this.board_service.createBoardDirectorLang( board ).subscribe();
  }
  updateBoardDescription( boardLang : boardDirectorsLang ){
    this.board_service.updateBoardDirectorLang(  boardLang ).subscribe();
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    if( id !== 'new'){
      this.button = 2;
      this.board_service.findBoardDirectorsById( id )
      .subscribe(
        ( response : any ) => {
            this.board.controls['id'].setValue( response.data.id );
            this.board.controls['name'].setValue( response.data.name );
            
            this.board_service.findBoardDirectorsByFk( response.data.id )
            .subscribe(
              ( response : any ) => {
                
                this.board.controls['descriptionEn'].setValue(
                  response.data[0].description
                );
                this.board.controls['descriptionSp'].setValue(
                  response.data[1].description
                );
              }
            )
        }
      )
    }
  }

  get invalidName() {
    return this.board.get('name').invalid && this.board.get('name').touched;
  }
  get invalidDescriptionEn() {
    return (
      this.board.get('descriptionEn').invalid &&
      this.board.get('descriptionEn').touched
    );
  }
  get invalidDescriptionSp() {
    return (
      this.board.get('descriptionSp').invalid &&
      this.board.get('descriptionSp').touched
    );
  }

  boardForm(){
    this.board = this.fb.group({
      id: [''],
      board_directors_fk : [''],
      languaje_cateory_fk : [''],
      name: ['', [Validators.required,Validators.maxLength(100)]],
      descriptionEn: ['', [Validators.required,Validators.maxLength(360)]],
      descriptionSp: ['', [Validators.required,Validators.maxLength(360)]],
    })
  }

}


