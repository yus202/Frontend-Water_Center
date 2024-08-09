import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id : string;
  name: string;
  image: string;
  email: string;

  constructor( public authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
    this.email = localStorage.getItem('email');
  }

  logout(): void{
    this.authService.logout();
    this.router.navigateByUrl('/home'  );
  }

}
