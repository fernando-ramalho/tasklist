import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { LoaderService } from "./../core/loader.service";
import { CustomMaterialModule } from './../custom-material-module/custom-material-module.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    profile: any;
    constructor(public auth: AuthService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.loaderService.display(false);
    }
}
