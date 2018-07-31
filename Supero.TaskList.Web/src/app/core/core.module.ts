import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from "./modal-content/modal-content.component";
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { BsModalService } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [ModalContentComponent, ModalErrorComponent],
  entryComponents: [ModalContentComponent, ModalErrorComponent],
  providers: [ { provide: BsModalService, useClass: BsModalService } ]
})
export class CoreModule { }
