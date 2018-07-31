import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomMaterialModule } from './custom-material-module/custom-material-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListModule } from './task-list/task-list.module';
import { PingModule } from './ping/ping.module';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from "./core/core.module";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoaderService } from "./core/loader.service";
import { MatProgressSpinnerModule } from '@angular/material';
import { AlertModule } from 'ngx-bootstrap/alert';
import { environment } from "../environments/environment";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Observable } from "rxjs/Observable";
import { AuthService } from './services/auth.service';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        CallbackComponent,
        NavBarComponent
    ],
    imports: [
        MatProgressSpinnerModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        CollapseModule.forRoot(),
        PopoverModule.forRoot(),
        CoreModule,
        BrowserModule,
        HttpClientModule,
        HttpModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        TaskListModule,
        PingModule,
        RouterModule.forRoot(ROUTES, { useHash: true, initialNavigation: true  })
    ],
    providers: [
        AuthService,
        LoaderService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
