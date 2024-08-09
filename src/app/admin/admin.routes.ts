import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './admin-settings/accout-settings.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UsersComponent } from './user/users/users.component';

import { AuthGuard, RefreshTokenGuard } from '../services/service.index';
import { NewBoardDirectorComponent } from './admin-about-us/board-director/new-board-director/new-board-director.component';
import { NewLidershipComponent } from './admin-about-us/lidership/new-lidership/new-lidership.component';
import { ListLidershipComponent } from './admin-about-us/lidership/list-lidership/list-lidership.component';
import { ListBoardDirectorComponent } from './admin-about-us/board-director/list-board-director/list-board-director.component';
import { NewPartnerOrganizationComponent } from './admin-about-us/partner-organization/new-partner-organization/new-partner-organization.component';
import { ListPartnerOrganizationComponent } from './admin-about-us/partner-organization/list-partner-organization/list-partner-organization.component';
import { NewDonateComponent } from './admin-about-us/donate/new-donate/new-donate.component';
import { ListDonateComponent } from './admin-about-us/donate/list-donate/list-donate.component';
import { NewPointSaleComponent } from './admin-bft/point-sale/new-point-sale/new-point-sale.component';
import { ListPointSaleComponent } from './admin-bft/point-sale/list-point-sale/list-point-sale.component';
import { ListAffiliatesComponent } from './admin-bft/affiliates/list-affiliates/list-affiliates.component';
import { NewAffiliateComponent } from './admin-bft/affiliates/new-affiliate/new-affiliate.component';
import { ListImagesComponent } from './admin-bft/images/list-images/list-images.component';
import { NewImageComponent } from './admin-bft/images/new-image/new-image.component';
import { NewProductServiceComponent } from './admin-home/product-service/new-product-service/new-product-service.component';
import { ListProductServiceComponent } from './admin-home/product-service/list-product-service/list-product-service.component';
import { NewCarouselComponent } from './admin-home/carousel/new-carousel/new-carousel.component';
import { ListCarouselComponent } from './admin-home/carousel/list-carousel/list-carousel.component';
import { NewProgramComponent } from './admin-programs/new-program/new-program.component';
import { ListProgramComponent } from './admin-programs/list-program/list-program.component';
import { NewMediaComponent } from './admin-media/media/new-media/new-media.component';
import { ListMediaComponent } from './admin-media/media/list-media/list-media.component';
import { NewTypeMediaComponent } from './admin-media/type-media/new-type-media/new-type-media.component';
import { ListTypeMediaComponent } from './admin-media/type-media/list-type-media/list-type-media.component';
import { NewCompanyComponent } from './admin-company/Company-info/new-company/new-company.component';
import { ListCompanyComponent } from './admin-company/Company-info/list-company/list-company.component';
import { CreateUnitComponent } from './admin-events/units/create-unit/create-unit.component';
import { CreateEventComponent } from './admin-events/create-event/create-event/create-event.component';
import { GroupsComponent } from './admin-events/groups/groups/groups.component';
import { EvetnsDashboardComponent } from './admin-events/evetns-dashboard/evetns-dashboard/evetns-dashboard.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { GroupsAndUnitsComponent } from './admin-events/groups-and-units/groups-and-units.component';
import { UpdateEventComponent } from './admin-events/update-event/update-event.component';
import { NewStrategyComponent } from './strategy/new-strategy/new-strategy.component';
import { ListStrategyComponent } from './strategy/list-strategy/list-strategy.component';


const adminRoutes: Routes = [

    {
        path: '',
        component: AdminComponent,
        canActivate: [ AuthGuard, RefreshTokenGuard ],
        children : [

            // USERS
            { path: 'admin/user/profile', component: UserProfileComponent, data : { tittle : 'User Profile' } },
            { path: 'admin/user/list', component: UsersComponent, data : { tittle : ' Users List' } },
            { path: 'admin/new/user', component: NewUserComponent, data : { tittle : ' New User' } },

            // ACCOUNT SETTINGS
            { path: 'admin/account-settings', component: AccoutSettingsComponent, data : { tittle : 'Account Settings' } },
            { path: 'admin/dashboard', component: DashboardComponent, data : { tittle : 'Dashboard' } },

            // { path: 'admin/event', component: DashboardComponent, data : { tittle : 'Events' } },

            // EVENTS
            {path: 'units/create', component: CreateUnitComponent, data : { tittle : 'Units' } },
            {path: 'admin/groups-units', component: GroupsAndUnitsComponent, data : { tittle : 'Groups & Units' } },
            {path: 'events/create', component: CreateEventComponent, data : { tittle : 'Create' } },
            {path: 'events/update/:id', component: UpdateEventComponent, data : { tittle : 'Update event' } },
            {path: 'events', component: EvetnsDashboardComponent, data : { tittle : 'List' } },

            // ABOUT US
            // BOARD DIRECTOR
            { path: 'admin/new/board/director/:id', component: NewBoardDirectorComponent, data : { tittle : 'Board Director' } },
            { path: 'admin/list/board/directors', component: ListBoardDirectorComponent, data : { tittle : 'Board Director List' } },
            // LIDERSHIP
            { path: 'admin/new/lidership/:id', component: NewLidershipComponent, data : { tittle : 'Lider' } },
            { path: 'admin/list/lidership', component: ListLidershipComponent, data : { tittle : 'Lider List' } },
            // PARTNER ORGANIZATION
            { path: 'admin/new/partner/organization/:id', component: NewPartnerOrganizationComponent, data : { tittle : 'Partner Organization' } },
            { path: 'admin/list/partner/organization', component: ListPartnerOrganizationComponent, data : { tittle : 'Partner Organization List' } },
            //DONATE
            { path: 'admin/new/donate/:id', component: NewDonateComponent, data : { tittle : 'Donate' } },
            { path: 'admin/list/donate', component: ListDonateComponent, data : { tittle : 'Donate' } },


            //BFT
            //POINT SALE
            { path: 'admin/new/point/sale/:id', component: NewPointSaleComponent, data : { tittle : 'Point of Sale' } },
            { path: 'admin/list/point/sale', component: ListPointSaleComponent, data : { tittle : 'Points of Sale list' } },
            //AFFIALIATE
            { path: 'admin/new/affiliate/:id', component: NewAffiliateComponent, data : { tittle : 'Affiliate' } },
            { path: 'admin/list/affiliate', component: ListAffiliatesComponent, data : { tittle : 'Affiliates List' } },
            //BFT IMAGES
            { path: 'admin/new/bft/image/:id', component: NewImageComponent, data : { tittle : 'Images' } },
            { path: 'admin/list/bft/images', component: ListImagesComponent, data : { tittle : 'Images List' } },

            //HOME
            //PRODUCT AND SERVICE
            { path: 'admin/new/product/service/:id', component: NewProductServiceComponent, data : { tittle : 'Products and Services' } },
            { path: 'admin/list/product/service', component: ListProductServiceComponent, data : { tittle : 'Product and Service List' } },
            //CAROUSEL
            { path: 'admin/new/carousel/:id', component: NewCarouselComponent, data : { tittle : 'Carousel' } },
            { path: 'admin/list/carousel', component: ListCarouselComponent, data : { tittle : 'Carousel Images list' } },

            //
            //PROGRAMS
            { path: 'admin/new/program/:program_fk', component: NewProgramComponent, data : { tittle : 'Program' } },
            { path: 'admin/list/programs', component: ListProgramComponent, data : { tittle : 'Programs List' } },


            //MEDIA 
            { path: 'admin/new/media/:id', component: NewMediaComponent, data : { tittle : 'Media' } },
            { path: 'admin/list/media', component: ListMediaComponent, data : { tittle : 'Medias List' } },
            // TYPE MEDIA
            { path: 'admin/new/type/media/:id', component: NewTypeMediaComponent , data : { tittle : 'Type Media' } },
            { path: 'admin/list/type/media', component: ListTypeMediaComponent, data : { tittle : 'Type Media List' } },

             // COMPANY INFO
            { path: 'admin/new/company/:id', component: NewCompanyComponent , data : { tittle : 'Company' } },
            { path: 'admin/list/company', component: ListCompanyComponent, data : { tittle : 'Companies List' } },

             // OUR TRATEGY 
             { path: 'admin/strategy/:id', component: NewStrategyComponent , data : { tittle : 'Strategy' } },
             { path: 'admin/strategies', component: ListStrategyComponent, data : { tittle : 'Strategies List' } },
 

            { path : '', redirectTo : 'admin/dashboard', pathMatch : 'full' },
        ]
    }

];

export const ADMIN_ROUTES  = RouterModule.forChild( adminRoutes );
