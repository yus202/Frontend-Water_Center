import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { CountUpModule } from 'ngx-countup';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './site/home-page/home/home.component';

// Service
import { GuanacasteWatershedService } from './services/guanacaste-watershed/guanacaste-watershed.service';


import { APP_ROUTES } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { FirstNavComponent } from './site/shared/first-nav/first-nav.component';
import { NavComponent } from './site/shared/nav/nav.component';
import { CarrouselComponent } from './site/home-page/carrousel/carrousel.component';
import { SiteLayoutComponent } from './site/shared/site-layout/site-layout.component';
import { FooterComponent } from './site/shared/footer/footer.component';
import { GwcDescriptionComponent } from './site/home-page/gwc-description/gwc-description.component';
import { ProductsServicesComponent } from './site/home-page/products-services/products-services.component';



import { ModalModule } from './site/shared/_modal';
import { LocationComponent } from './site/home-page/location/location.component';
import { NextEventsComponent } from './site/home-page/next-events/next-events.component';
import { BeesForTreesPageComponent } from './site/Bees-for-trees/bees-for-trees-page/bees-for-trees-page.component';
import { ThirdNavComponent } from './site/shared/third-nav/third-nav.component';
import { BtfCarousellComponent } from './site/Bees-for-trees/btf-carousell/btf-carousell.component';
import { PageWorkComponent } from './site/shared/page-work/page-work/page-work.component';
import { GuanacasteWatershedComponent } from './site/guanacaste-watershed/guanacaste-watershed/guanacaste-watershed.component';
import { CarrouselGuanacasteWatershedComponent } from './site/guanacaste-watershed/carrousel-guanacaste-watershed/carrousel-guanacaste-watershed.component';
import { TextWtdComponent } from './site/guanacaste-watershed/text-wtd/text-wtd.component';
import { LocationImgWtdComponent } from './site/guanacaste-watershed/location-img-wtd/location-img-wtd.component';
import { BftDescriptionComponent } from './site/Bees-for-trees/bft-description/bft-description.component';
import { BftImagesComponent } from './site/Bees-for-trees/bft-images/bft-images.component';
import { BftAffiliatesComponent } from './site/Bees-for-trees/bft-affiliates/bft-affiliates.component';
import { TextoConcienciaAComponent } from './site/guanacaste-watershed/Texto-conciencia/texto-conciencia-a/texto-conciencia-a.component';
import { RestoringOurWatershedComponent } from './site/Restoring-our-watershed/restoring-our-watershed/restoring-our-watershed.component';
import { TextROWComponent } from './site/Restoring-our-watershed/text-row/text-row.component';
import { from } from 'rxjs';
// import { GwdInfoComponent } from './models/gwd-info/gwd-info/gwd-info.component';
import { SalesPointComponent } from './site/Bees-for-trees/sales-point/sales-point.component';
import { PlantQuantityReportComponent } from './site/reports/plant-quantity-report/plant-quantity-report.component';
import { ReportsPageComponent } from './site/reports/reports-page/reports-page.component';
import { AboutUsComponent } from './site/AboutUs/about-us/about-us.component';
import { PartnerOrganizationsComponent } from './site/AboutUs/partner-organizations/partner-organizations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralReportsComponent } from './site/reports/general-reports/general-reports.component';
import { SafeDomPipe } from './pipes/SafeDom/safe-dom.pipe';
import { PipesModule } from './pipes/pipes.module';
import { LidershipComponent } from './site/AboutUs/lidership/lidership.component';
import { BoardDirectorComponent } from './site/AboutUs/board-director/board-director.component';
import { DonateComponent } from './site/AboutUs/donate/donate.component';
import { VideoMediaComponent } from './site/Multimedia/video-media/video-media.component';
import { ImagenMediaComponent } from './site/Multimedia/imagen-media/imagen-media.component';
import { HomePageMediaComponent } from './site/Multimedia/home-page-media/home-page-media.component';
import { ReportResultsComponent } from './site/reports/report-results/report-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';

// import { GwdInfoComponent } from './models/gwd-info/gwd-info/gwd-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    HomeComponent,
    AdminComponent,
    FirstNavComponent,
    NavComponent,
    CarrouselComponent,
    SiteLayoutComponent,
    FooterComponent,
    GwcDescriptionComponent,
    ProductsServicesComponent,
    //MediaPageComponent,


    LocationComponent,
    NextEventsComponent,
    BeesForTreesPageComponent,
    ThirdNavComponent,
    BtfCarousellComponent,
    PageWorkComponent,
    GuanacasteWatershedComponent,
    CarrouselGuanacasteWatershedComponent,
    TextWtdComponent,
    LocationImgWtdComponent,
    BftDescriptionComponent,
    BftImagesComponent,
    BftAffiliatesComponent,
    TextoConcienciaAComponent,
    TextoConcienciaAComponent,
    RestoringOurWatershedComponent,
    TextROWComponent,


    SalesPointComponent,


    PlantQuantityReportComponent,


    ReportsPageComponent,


    AboutUsComponent,
    GeneralReportsComponent,



    PartnerOrganizationsComponent,


    LidershipComponent,


    BoardDirectorComponent,


    DonateComponent,


    VideoMediaComponent,


    ImagenMediaComponent,


    HomePageMediaComponent,


    ReportResultsComponent,


    ResetPasswordComponent,


    NewPasswordComponent,




    

   // MediaPageComponent,

    
   // GwdInfoComponent,
  ],
  imports: [

    PipesModule,
    [SwiperModule],
    HttpClientModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ServicesModule,
    APP_ROUTES, // rutas
    ModalModule,
    CountUpModule,
    NgbModule,
    BrowserAnimationsModule,
    // NgbModule,
  ],
  providers: [
    GuanacasteWatershedService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
