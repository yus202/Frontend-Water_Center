import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/service.index';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

  image: string;
  name: string;
  id: string;
  url = environment.apiUrl;
  menuItems: any[];

  constructor( public sideBar: SidebarService,
               public authService: AuthService,
               private router: Router,
               ) {
  }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  
    this.loadUserData();
  }

  loadUserData(): void {
    this.image = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.authService.getProfile()
    .subscribe(
      (response:any)=>{
        console.log(response);
        this.name = response;
        
      }
    )
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home' );
  }

}
