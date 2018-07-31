import { FormControl } from "@angular/forms";

export class BaseFormControl extends FormControl {
    label: string;
    modelProperty: string;

    constructor(label: string, property: string, value: any, validator: any) {
      super(value, validator);
      this.label = label;
      this.modelProperty = property;
    }

    getValidationMessages() {
      let messages: string[] = [];
      if (this.errors) {
          for (let errorName in this.errors) {
            switch(errorName) {
              case "required": 
                messages.push(`${this.label.toUpperCase()} é obrigatório`);
            }
          }
      }
      
      return messages;
    }
}