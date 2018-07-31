import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoaderService } from "./core/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
    title = 'supero-task-list-web';
    showLoader: boolean;

    constructor(public auth: AuthService, private loaderService: LoaderService, private changeDetectionRef: ChangeDetectorRef) {
        auth.handleAuthentication();
    }

    ngOnInit() {

        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
            this.changeDetectionRef.detectChanges();
        });
    }
}