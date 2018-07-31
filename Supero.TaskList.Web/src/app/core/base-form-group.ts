import { FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { BaseFormControl } from "./base-form-control";

export class BaseFormGroup extends FormGroup {

    _submitted: boolean;

    constructor(controls: {
        [key: string]: AbstractControl;
    }, validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null) {

        super(controls, validator);
    }

    get Controls(): BaseFormControl[] {
        return Object.keys(this.controls)
            .map(k => this.controls[k] as BaseFormControl);
    }

    getFormValidationMessages(form: any): string[] {
        let messages: string[] = [];
        this.Controls.forEach(c => c.getValidationMessages()
            .forEach(m => messages.push(m)));
        return messages;
    }
}