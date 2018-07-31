import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})

export class ModalContentComponent implements OnInit {
  public title: string;
  public body: string;
  public footer?: string;
  public confirm: boolean = false;
  public onClose: Subject<boolean>;
  
  constructor(public bsModalRef: BsModalRef) {
  }

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

}
