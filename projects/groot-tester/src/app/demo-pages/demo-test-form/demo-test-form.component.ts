import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-demo-test-form',
    templateUrl: './demo-test-form.component.html',
    styleUrls: ['./demo-test-form.component.scss']
})
export class DemoTestFormComponent {

    public formGroup: FormGroup;
    public readonly comboValues = ['test1', 'test2', 'test3'];

    constructor() {
        this.formGroup = new FormGroup<any>({
            firstInput: new FormControl<string>(''),
            requiredInput: new FormControl<string>('', Validators.required),

            firstCombo: new FormControl<string>(''),
            requiredCombo: new FormControl<string>('', Validators.required),

            firstDate: new FormControl<string>(''),
            requiredDate: new FormControl<string>('', Validators.required),

            firstDateTime: new FormControl<string>(''),
            requiredDateTime: new FormControl<string>('', Validators.required),

            firstRadio: new FormControl<string>(''),

            firstTextarea: new FormControl<string>(''),
            requiredTextarea: new FormControl<string>('', Validators.required),

            firstTime: new FormControl<string>(''),
            requiredTime: new FormControl<string>('', Validators.required),

            firstFile: new FormControl<string>(''),
            requiredFile: new FormControl<string>('', Validators.required),

            firstCurrency: new FormControl<string>(''),
            requiredCurrency: new FormControl<string>('', Validators.required),
        });
        console.log('Test form group created');
    }

    onSub(): void {
        const value = this.formGroup.value;
        console.log({value});
    }
}
