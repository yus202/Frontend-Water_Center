import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any = [

    {
      title : 'Web Site',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Dashboard', url : '/admin/dashboard'  },
      ]
    },

    {
      title : 'About Us',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Board Director', url : '/admin/list/board/directors'  },
        { title : 'Lidership', url : '/admin/list/lidership'  },
        { title : 'Partner Organization', url : '/admin/list/partner/organization'  },
        { title : 'Donate', url : '/admin/list/donate'  },
      ]
    },
    {
      title : 'BFT',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Point Sale', url : '/admin/list/point/sale'  },
        { title : 'Affiliates', url : '/admin/list/affiliate'  },
        { title : 'Images', url : '/admin/list/bft/images'  }
      ]
    },
    {
      title : 'Home',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Product and Service', url : '/admin/list/product/service'  },
        { title : 'Carousel Images', url : '/admin/list/carousel'  }
      ]
    },
    {
      title : 'Programs',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Programs', url : '/admin/list/programs'  }
      ]
    },
    {
      title : 'Medias',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Media', url : '/admin/list/media'  },
        { title : 'Type', url : '/admin/list/type/media' }
      ]
    },
    {
      title : 'Company Info',
      icon : 'fas fa-tools',
      submenu : [
        { title : 'Companies', url : '/admin/list/company'  },
      ]
    }
  ];

  constructor() { }

}
