import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {CurrencyMaskConfig, CurrencyMaskInputMode} from 'ngx-currency';
import {Subscription} from 'rxjs';
import {unsubscribeSafe} from '../../../groot-base/utils/subscription-utils';
import {GrootInputCurrencyService} from '../../services/groot-input-currency.service';

@Component({
  selector: 'groot-input-currency',
  templateUrl: './groot-input-currency.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootInputCurrencyComponent),
      multi: true
    }
  ]
})
export class GrootInputCurrencyComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {

  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  @Input() errorMessage = 'common.required';
  @Input() hidePlaceholder = false;

  @Input() formControl: FormControl | null = null;

  @Output() enter: EventEmitter<number> = new EventEmitter();
  value: number;
  private valueSent: number;
  input: NgModel;

  private readonly defaultConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: '.',
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.NATURAL
  };

  private eventConfig: Partial<CurrencyMaskConfig> = {};
  private eventConfigSubscription: Subscription;

  @Input() align: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  @Input() allowNegative: boolean;
  @Input() allowZero: boolean;
  @Input() decimal: ',' | '.';
  @Input() precision: number;
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() thousands: ',' | '.';
  @Input() nullable: true;
  @Input() min: number;
  @Input() max: number;
  @Input() inputMode: CurrencyMaskInputMode;

  @Input() currencyOptions: Partial<CurrencyMaskConfig> = {};
  options: CurrencyMaskConfig = {...this.defaultConfig};
  onChange = (value: number) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private grootInputCurrencyService: GrootInputCurrencyService) {
  }

  ngOnInit(): void {
    this.eventConfigSubscription = this.grootInputCurrencyService.onChangeConfig()
      .subscribe(conf => {
        this.eventConfig = conf;
        this.updateConfig();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      align,
      allowNegative,
      allowZero,
      decimal,
      precision,
      prefix,
      suffix,
      thousands,
      nullable,
      min,
      max,
      inputMode,
      currencyOptions
    } = changes;
    if (align || allowNegative || allowZero || decimal || precision || prefix || suffix || thousands || nullable || min || max || inputMode || currencyOptions) {
      this.updateConfig();
    }
  }

  private updateConfig() {
    const defaultConfig = (this.defaultConfig || {});
    const eventConfig = (this.eventConfig || {});
    const currencyOptions = (this.currencyOptions || {});
    this.options = {
      align: this.align,
      allowNegative: this.allowNegative,
      allowZero: this.allowZero,
      decimal: this.decimal,
      precision: this.precision,
      prefix: this.prefix,
      suffix: this.suffix,
      thousands: this.thousands,
      nullable: this.nullable,
      min: this.min,
      max: this.max,
      inputMode: this.inputMode
    };
    this.overrideOptionIfEmpty(currencyOptions);
    this.overrideOptionIfEmpty(eventConfig);
    this.overrideOptionIfEmpty(defaultConfig);
  }

  private overrideOptionIfEmpty(options: Partial<CurrencyMaskConfig>) {
    Object.keys(this.options)
      .filter(o => this.options[o] == null)
      .forEach(o => this.options[o] = options[o]);
  }

  ngOnDestroy(): void {
    unsubscribeSafe(this.eventConfigSubscription);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number): void {
    this.value = value;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(value: any) {
    this.writeValue(value);
    this.onChange(this.value);
  }

  onEnterPressed() {
    if (this.value !== this.valueSent) {
      this.valueSent = this.value;
      this.enter.emit(this.value);
    }
  }

}

