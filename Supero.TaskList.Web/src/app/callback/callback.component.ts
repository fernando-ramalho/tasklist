import { Component, OnInit } from '@angular/core';
import { LoaderService } from "./../core/loader.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {
        this.loaderService.display(true);
  }

}
