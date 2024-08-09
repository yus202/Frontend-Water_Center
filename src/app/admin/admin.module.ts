import { ngModuleJitUrl } from "@angular/compiler";

import { NgModule } from '@angular/core';
import { ADMIN_ROUTES } from './admin.routes';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { AccoutSettingsComponent } from './admin-settings/accout-settings.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UsersComponent } from './user/users/users.component';
import { NewBoardDirectorComponent } from './admin-about-us/board-director/new-board-director/new-board-director.component';
import { ListBoardDirectorComponent } from './admin-about-us/board-director/list-board-director/list-board-director.component';
import { NewLidershipComponent } from './admin-about-us/lidership/new-lidership/new-lidership.component';
import { ListLidershipComponent } from './admin-about-us/lidership/list-lidership/list-lidership.component';
import { PipesModule } from '../pipes/pipes.module';

import { NewPartnerOrganizationComponent } from './admin-about-us/partner-organization/new-partner-organization/new-partner-organization.component';
import { ListPartnerOrganizationComponent } from './admin-about-us/partner-organization/list-partner-organization/list-partner-organization.component';
import { NewDonateComponent } from './admin-about-us/donate/new-donate/new-donate.component';
import { ListDonateComponent } from './admin-about-us/donate/list-donate/list-donate.component';
import { NewPointSaleComponent } from './admin-bft/point-sale/new-point-sale/new-point-sale.component';
import { ListPointSaleComponent } from './admin-bft/point-sale/list-point-sale/list-point-sale.component';
import { ListAffiliatesComponent } from './admin-bft/affiliates/list-affiliates/list-affiliates.component';
import { NewAffiliateComponent } from './admin-bft/affiliates/new-affiliate/new-affiliate.component';
import { NewImageComponent } from './admin-bft/images/new-image/new-image.component';
import { ListImagesComponent } from './admin-bft/images/list-images/list-images.component';
import { NewProductServiceComponent } from './admin-home/product-service/new-product-service/new-product-service.component';
import { ListProductServiceComponent } from './admin-home/product-service/list-product-service/list-product-service.component';
import { NewCarouselComponent } from './admin-home/carousel/new-carousel/new-carousel.component';
import { ListCarouselComponent } from './admin-home/carousel/list-carousel/list-carousel.component';
import { NewProgramComponent } from './admin-programs/new-program/new-program.component';
import { ListProgramComponent } from './admin-programs/list-program/list-program.component';
import { NewMediaComponent } from './admin-media/media/new-media/new-media.component';
import { ListMediaComponent } from './admin-media/media/list-media/list-media.component';
import { ListTypeMediaComponent } from './admin-media/type-media/list-type-media/list-type-media.component';
import { NewTypeMediaComponent } from './admin-media/type-media/new-type-media/new-type-media.component';
import { ListCompanyComponent } from './admin-company/Company-info/list-company/list-company.component';
import { NewCompanyComponent } from './admin-company/Company-info/new-company/new-company.component';
import { CreateEventComponent } from './admin-events/create-event/create-event/create-event.component';
import { EvetnsDashboardComponent } from './admin-events/evetns-dashboard/evetns-dashboard/evetns-dashboard.component';
import { GroupsComponent } from './admin-events/groups/groups/groups.component';
import { InsertEventGroupsComponent } from './admin-events/insert-event-groups/insert-event-groups/insert-event-groups.component';
import { InsertEventUnitComponent } from './admin-events/insert-event-unit/insert-event-unit/insert-event-unit.component';
import { CreateUnitComponent } from './admin-events/units/create-unit/create-unit.component';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewUserComponent } from './user/new-user/new-user.component';
import { GroupsAndUnitsComponent } from './admin-events/groups-and-units/groups-and-units.component';
import { UpdateEventComponent } from './admin-events/update-event/update-event.component';
import { from } from 'rxjs';
import { GeneralReportsComponent } from './dashboard/general-reports/general-reports.component';
import { ReportResultsComponent } from './dashboard/report-results/report-results.component';
import { NewStrategyComponent } from './strategy/new-strategy/new-strategy.component';
import { ListStrategyComponent } from './strategy/list-strategy/list-strategy.component';


@NgModule({

    declarations : [
        SidebarComponent,
        HeaderComponent,
        BreadcrumsComponent,
        DashboardComponent,
        PagenotfoundComponent,
        AccoutSettingsComponent,
        NewBoardDirectorComponent,
        ListBoardDirectorComponent,
        UserProfileComponent,
        UsersComponent,
        NewLidershipComponent,
        ListLidershipComponent,
        NewPartnerOrganizationComponent,
        ListPartnerOrganizationComponent,
        NewDonateComponent,
        ListDonateComponent,
        NewPointSaleComponent,
        ListPointSaleComponent,
        ListAffiliatesComponent,
        NewAffiliateComponent,
        NewImageComponent,
        ListImagesComponent,
        NewProductServiceComponent,
        ListProductServiceComponent,
        NewCarouselComponent,
        ListCarouselComponent,
        NewProgramComponent,
        ListProgramComponent,
        NewMediaComponent,
        ListMediaComponent,
        ListTypeMediaComponent,
        NewTypeMediaComponent,
        NewCompanyComponent,
        ListCompanyComponent,
        CreateEventComponent,
        EvetnsDashboardComponent,
        GroupsComponent,
        InsertEventGroupsComponent,
        InsertEventUnitComponent,
        CreateUnitComponent,
        NewUserComponent,
        GroupsAndUnitsComponent,
        UpdateEventComponent,
        GeneralReportsComponent,
        ReportResultsComponent,
        NewStrategyComponent,
        ListStrategyComponent,
    ],
    exports : [
        SidebarComponent,
        HeaderComponent,
        BreadcrumsComponent,
        DashboardComponent,
        PagenotfoundComponent,
        NewBoardDirectorComponent,
        ListBoardDirectorComponent,
    ],
    imports : [
        PipesModule,
        CommonModule,
        RouterModule,
        ADMIN_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        NgbModule,
        BrowserAnimationsModule,
        TimepickerModule.forRoot()
    ],
    providers : [
        BsModalService
    ]
})
export class AdminModule { }
