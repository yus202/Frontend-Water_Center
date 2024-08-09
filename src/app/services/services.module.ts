import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import { AuthService } from './auth/auth.service';
import { BoardDirectorService } from './board-director/board-director.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AccoutSettingsComponent } from '../admin/admin-settings/accout-settings.component';
import { DonateService } from '../services/donate/donate.service';
import { PointSaleService } from './point-sale/point-sale.service';
import { AffiliatesService } from './affiliates/affiliates.service';
import { BftImagesService } from './bft-images/bft-images.service';
import { ProductServicesService } from './product-services/product-services.service';
import { CarouselService } from './carousel/carousel.service';
import { ProgramsService } from './programs/programs.service';
import { MediaService } from './media/media.service';
import { RefreshTokenGuard } from '../services/guards/refresh-token.guard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
     ],
    exports: [
        // HttpClientModule
    ],
    providers: [
        AccoutSettingsComponent,
        SharedService,
        SidebarService,
        AuthService,
        BoardDirectorService,
        DonateService,
        AuthGuard,
        PointSaleService,
        AffiliatesService,
        BftImagesService,
        ProductServicesService,
        CarouselService,
        ProgramsService,
        MediaService,
        RefreshTokenGuard

    ],
})
export class ServicesModule {}
