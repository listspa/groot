import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input, Optional,
    Output, Self,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootInputIconLeftDirective, GrootInputIconRightDirective} from './groot-input.directive';
import {GrootBaseInput} from '../groot-base-input';

@Component({
    selector: 'groot-input',
    templateUrl: './groot-input.component.html',
    styles: [`:host {
        display: block;
    }`],
})
export class GrootInputComponent extends GrootBaseInput {
    @Input() type: 'text' | 'password' | 'color' | 'email' | 'number' | 'search' = 'text';
    @Input() step = 1;
    @Input() label: string | null = null;
    @Input() placeholder: string | null = null;
    @Input() name: string;
    @Input() disabled = false;
    @Input() helpText: string | null = null;
    @Input() iconLeft: string | string[] | null = null;
    @Input() templateLeft: TemplateRef<any> | null = null;
    @Input() iconRight: string | string[] | null = null;
    @Input() templateRight: TemplateRef<any> | null = null;
    @Input() errorMessage = 'common.required';
    @Input() hidePlaceholder = false;
    @Input() maxLength: number | undefined = undefined;
    @Input() horizontalLabel: boolean = false;
    @Output() enter: EventEmitter<string> = new EventEmitter();
    @ViewChild('htmlInput') private htmlInput: ElementRef;
    text: string;
    private textSent: string;

    onChange = (text: string) => null;
    onTouched = () => null;

    @ContentChild(GrootInputIconLeftDirective, {read: TemplateRef})
    set templateLeftTpl(value: TemplateRef<any>) {
        this.templateLeft = value;
    }

    @ContentChild(GrootInputIconRightDirective, {read: TemplateRef})
    set templateRightTpl(value: TemplateRef<any>) {
        this.templateRight = value;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef,
                @Self() @Optional() public control: NgControl) {
        super(control);
    }

    writeValue(text: string): void {
        this.text = text;
        this.changeDetectorRef.detectChanges();
    }

    writeValueFromGui(text: string): void {
        this.writeValue(text);
        this.onChange(this.text);
    }

    registerOnChange(fn: (text: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public onEnterPressed(): void {
        if (this.text !== this.textSent) {
            this.textSent = this.text;
            this.enter.emit(this.text);
        }
    }

    public select(): void {
        this.htmlInput.nativeElement.select();
    }

    public focus(): void {
        this.htmlInput.nativeElement.focus();
    }
}
