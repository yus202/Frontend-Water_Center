import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './admin/shared/pagenotfound/pagenotfound.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './site/home-page/home/home.component';
import { SiteLayoutComponent } from './site/shared/site-layout/site-layout.component';
import { BeesForTreesPageComponent } from './site/Bees-for-trees/bees-for-trees-page/bees-for-trees-page.component';
import { PageWorkComponent } from './site/shared/page-work/page-work/page-work.component';
import { GuanacasteWatershedComponent } from './site/guanacaste-watershed/guanacaste-watershed/guanacaste-watershed.component';
import { RestoringOurWatershedComponent } from './site/Restoring-our-watershed/restoring-our-watershed/restoring-our-watershed.component';
import { HomePageMediaComponent } from './site/Multimedia/home-page-media/home-page-media.component';
import { ReportsPageComponent } from './site/reports/reports-page/reports-page.component';
import { AboutUsComponent } from './site/AboutUs/about-us/about-us.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent, },
    { path: 'reset-password', component: ResetPasswordComponent, },
    { path: 'new-password/:email/:token', component: NewPasswordComponent, },
    {
        path: '',
        component: SiteLayoutComponent,
        children: [

            { path: 'home', component: HomeComponent, },
            { path: 'bees-for-trees', component: BeesForTreesPageComponent},
            { path: 'guanacaste-watershed', component: GuanacasteWatershedComponent},
            { path: 'restoring-our-watershed', component: RestoringOurWatershedComponent},
            { path: 'media', component: HomePageMediaComponent},
            { path: 'pagework', component: PageWorkComponent},
            { path: 'about-us', component: AboutUsComponent},
            { path: 'reports', component: ReportsPageComponent},

        ]
    },
    { path : '', redirectTo : 'home', pathMatch : 'full' },
    { path: '**', component: PagenotfoundComponent },

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash : true } );

