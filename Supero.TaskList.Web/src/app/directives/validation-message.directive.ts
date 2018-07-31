import { Directive, Input, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, Validators, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validationMessage]'  
})
export class ValidationMessageDirective implements  AfterViewInit {

  private validationMessageElement: HTMLElement;

  validationMessages: Array<string> = new Array<string>();

  @Input() validationMessageControlName: string;
  @Input() validationMessageRequired: string;
  @Input() validationMessageRequiredTrue: string;
  @Input() validationMessageMin: string;
  @Input() validationMessageMax: string;
  @Input() validationMessageMinLength: string;
  @Input() validationMessageMaxLength: string;
  @Input() validationMessageEmail: string;
  @Input() validationMessagePattern: string;
  @Input() validationMessageCompose: string;
  @Input() validationMessageCustom: string;
  
  get validationMessagesHTML() {
    return this.validationMessages.join("<br>");
  }
  
  get formControlName() {
    let _attr =  (<Attr>(<HTMLElement>this.el.nativeElement).attributes.getNamedItem("formcontrolname"));
    return _attr ? _attr.value: null;
  }

  get form() { 
    return this.container.formDirective ? (this.container.formDirective as FormGroupDirective).form : null; 
  }

  get formControl() {
    return this.form ? this.form.get(this.formControlName) : null;
  }

  constructor(
    private container: ControlContainer,
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }

  @HostListener('document:click', ['$event'])
  @HostListener('focus', ['$event'])
  @HostListener('input', ['$event'])
  @HostListener('click', ['$event'])
  handleClick(event:Event) {        
    if (this.el.nativeElement.contains(event.target) && this.formControl) {
      this.showValidation(this.formControl.invalid);
    } else if ((event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) && event.target.type == 'submit') {
      this.showValidation(this.formControl.invalid);      
    } else {
      this.showValidation(false);
    }
  }

  @HostListener('blur', ['$event'])
  handleLeave(event:Event) {
    this.showValidation(false);
  }

  private showValidation(invalid) {

    this.insertValidationMessages();

    if (invalid) {      
      this.renderer.addClass(this.el.nativeElement, 'validation-control');
      this.renderer.addClass(this.validationMessageElement, 'on');         
    } else {
      this.renderer.removeClass(this.validationMessageElement, 'on');     
      this.renderer.removeClass(this.el.nativeElement, 'validation-control'); 
    }
  }

  private insertValidationMessages() {
      let errors: ValidationErrors = this.formControl.errors;
      this.validationMessageElement.innerHTML = '';

      if (errors != null) {
          Object.keys(errors).forEach(key => {
            switch (key.toLowerCase()) {
              case 'required':
                this.addMessage(this.validationMessageRequired);
                break;            
              case 'requiredtrue':
                this.addMessage(this.validationMessageRequiredTrue);
                break;                            
              case 'pattern':
                this.addMessage(this.validationMessagePattern);
                break;                                       
              case 'compose':
                this.addMessage(this.validationMessageCompose);
                break;                                                       
              case 'min':
                this.addMessage(this.validationMessageMin);
                break;                                            
              case 'minlength':
                this.addMessage(this.validationMessageMinLength);
                break;                                         
              case 'max':
                this.addMessage(this.validationMessageMax);
                break;                                   
              case 'maxlength':
                this.addMessage(this.validationMessageMaxLength);
                break;                                         
              case 'email':
                this.addMessage(this.validationMessageEmail);
                break;                                     

              case 'custom':
                this.addMessage(this.validationMessageCustom);
                break;                                                                                                                                                     
              default:
                this.addMessage(this.validationMessageCustom);
                break;
            }
          });

      }
  }

  private addMessage(message: string){    
    this.validationMessageElement.insertAdjacentHTML('beforeend', `${message}`);
    this.validationMessageElement.insertAdjacentHTML('beforeend', '<br>');
  }


  ngAfterViewInit(): void {
    let parentElement = (this.el.nativeElement as HTMLElement).parentElement as HTMLElement;
    this.validationMessageElement = this.renderer.createElement("div") as HTMLElement;
    this.validationMessageElement.id = `validation-for-${this.formControlName}`;        
    this.renderer.addClass(this.validationMessageElement, "validation-tooltip");    
    this.renderer.insertBefore(parentElement, this.validationMessageElement, this.el.nativeElement);
  }
}
