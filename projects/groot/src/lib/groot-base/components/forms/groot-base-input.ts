import {Directive, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';

@Directive()
export abstract class GrootBaseInput implements ControlValueAccessor, OnInit {
    @Input() public required: boolean;

    protected constructor(public control: NgControl) {
        if (this.control) {
            this.control.valueAccessor = this;

            const validator = this.control.validator ? this.control.validator({} as AbstractControl) : null;
            this.required = validator && validator.required;
        }
    }

    ngOnInit(): void {
        if (this.control && !this.required) {
            const validator = this.control.validator && this.control.validator({} as AbstractControl) ||
                this.control.errors && this.control.errors;
            this.required = validator && validator.required;
        }
    }

    abstract registerOnChange(fn: any): void ;

    abstract registerOnTouched(fn: any): void ;

    abstract setDisabledState(isDisabled: boolean): void ;

    abstract writeValue(obj: any): void ;


}
