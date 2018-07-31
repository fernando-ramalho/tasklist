import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs/Subject";
import { ErrorMessage } from "../../models/Error-Message";
import { Router } from "@angular/router";

@Component({
  selector: 'modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {
  public title: string;
  public errorMessage: ErrorMessage ;
  public footer?: string;
  public confirm: boolean = false;
  public onClose: Subject<boolean>;  
  public showDetails: boolean = false;

  constructor(public bsModalRef: BsModalRef,
              private router: Router) { }


  public ngOnInit(): void {
    this.onClose = new Subject();
}

  public onConfirm(): void {
      this.onClose.next(true);
      this.bsModalRef.hide();
  }

  public onCancel(): void {
      this.onClose.next(false);
      this.bsModalRef.hide();
  }
  
  public exibirDetalhe() {
    this.showDetails = !this.showDetails;
  }

  public close():void  {
    if (this.errorMessage.RedirectUrl && 
        this.errorMessage.RedirectUrl != "") {
          this.router.navigateByUrl(this.errorMessage.RedirectUrl);      
    } 
    
    this.bsModalRef.hide();
  }
}
