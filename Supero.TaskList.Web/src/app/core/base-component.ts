import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ModalContentComponent } from "./modal-content/modal-content.component";
import {environment} from "../../environments/environment";

import { OnChanges, SimpleChanges, Inject } from "@angular/core";
import { ErrorMessage } from "../models/Error-Message";
import { ModalErrorComponent } from "./modal-error/modal-error.component";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { LoaderService } from "./loader.service";

export abstract class BaseComponent {
    bsModalRef: BsModalRef;

    
    constructor(public modalService: BsModalService,
                public loaderService: LoaderService) {}
    
    public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    public integerMask = createNumberMask({
        prefix: '',
        suffix:'',
        allowDecimal:false ,
        requireDecimal: false,
        includeThousandsSeparator:false
    });

    public decimalMask = createNumberMask({
        prefix: '',
        suffix:'',
        allowDecimal:true ,
        requireDecimal: false,
        decimalSymbol:'.',
        decimalLimit: 2 ,        
        includeThousandsSeparator:false
    });

    public ParamsToString(params: string[]){
        let urlparam: string = "";

        params.forEach(element => {
            urlparam += element + '&'
        });

        if(urlparam.endsWith("&"))
            urlparam = urlparam.substring(0,urlparam.length - 1)

        return urlparam;
    }
    
    public ShowModal(title: string, body: string) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, { class: 'modal-md'});
        this.bsModalRef.content.title = title;
        this.bsModalRef.content.body = body;    
        this.bsModalRef.content.footer = "Ok";
    }

    public ShowTemplateModal(template: any) {
        this.bsModalRef = this.modalService.show(template, { class: 'modal-md'});      
    }

    public ShowError(error: ErrorMessage) {
        this.bsModalRef = this.modalService.show(ModalErrorComponent, { class: 'modal-md'});
        this.bsModalRef.content.title = "Mensagem do sistema";
        this.bsModalRef.content.errorMessage = error;    
    }

    public ShowConfirmModal(title: string, body: string): BsModalRef  {
        this.bsModalRef = this.modalService.show(ModalContentComponent, { class: 'modal-sm'});
        this.bsModalRef.content.title = title;
        this.bsModalRef.content.body = body;    
        this.bsModalRef.content.confirm = true; 
        
        return this.bsModalRef;
    }
}

export abstract class BaseListComponent implements OnChanges  {
    Items: any;
    rowsPerPage: number = environment.grid.ROWS_PER_PAGE;
    selectedPage: number = 1;
    maxSize: number = environment.grid.MAX_SIZE;

    changePage(newPage: number) {
        this.selectedPage = newPage;    
    }

    changePageSize(newSize: number) {
        this.rowsPerPage = Number(newSize);
        this.changePage(1);
    }    

    get pageNumbers(): number[] {
        return  Array(Math.ceil(this.Items.length / this.rowsPerPage)).fill(0).map((x, i) => i + 1);   
    }

    get lastPage(): number {
        return this.pageNumbers.reverse()[0];
    }

    get pageIndex(): number {
        return (this.selectedPage - 1) * this.rowsPerPage;
    }

    get pageItems(): any {                       
       return this.Items.slice(this.pageIndex, this.pageIndex + this.rowsPerPage);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["Items"] && (changes["Items"].currentValue != changes["Items"].previousValue)) {      
            this.selectedPage = 1;
        }        
    }

}
