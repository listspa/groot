import {Component, OnInit} from '@angular/core';
import {ComboDataRequest, ComboDataRequestWithSelected, PaginatedResponse} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';
import {endIndex, startIndex} from '../../../../../groot/src/lib/groot-base/utils/pagination-utils';
import {UntypedFormControl, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {DatepickerDateCustomClasses} from 'ngx-bootstrap/datepicker';
import {NgxCurrencyInputMode} from 'ngx-currency';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html'
})
export class DemoFormComponent implements OnInit {
  form = {
    name: '',
    lastName: '',
    currency: null,
    selectedCurrencies: [],
    selectedManyCurrencies: [],
    selectedManyCurrenciesAndDisabled: [],
    selectedManyCurrenciesById: [],
    selectedAlbumId: null,
    selectedRadio: 'first-radio',
    customCheck0: true,
    customCheck1: false,
    date: new Date(),
    toggler: false,
    file: null,
    files: null,
    label: null,
    labels: [],
    time: null,
    dateTime: new Date(),
    selectedCountry: null,
    amount: null,
    search: null,
  };

  public currencies = ['EUR', 'USD', 'JPY', 'CNY', 'RUB'];
  public currenciesAndDisabled = [
    {name: 'EUR'},
    {name: 'USD'},
    {name: 'JPY', disabled: true},
    {name: 'CNY', disabled: true},
    {name: 'RUB'}];
  public albums = [
    {
      id: 1,
      name: 'Dark side of the moon',
      author: {titleAndAuthor: 'Pink Floyd - Dark side of the moon'},
    },
    {
      id: 2,
      name: 'Who\'s next',
      author: {titleAndAuthor: 'The Who - Who\'s next'},
    },
    {
      id: 3,
      name: 'Tommy',
      author: {titleAndAuthor: 'The Who - Tommy'},
    }
  ];
  public manyCurrencies = [
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'ATS',
    'AUD',
    'AWG',
    'AZN',
    'BAM',
    'BBD',
    'BDT',
    'BEF',
    'BGL',
    'BGN',
    'BHD',
    'BIF',
    'BMD',
    'BND',
    'BOB',
    'BRL',
    'BSD',
    'BTN',
    'BWP',
    'BYN',
    'BYR',
    'BZD',
    'CAD',
    'CDF',
    'CHF',
    'CLP',
    'CNH',
    'CNY',
    'COP',
    'CRC',
    'CUP',
    'CVE',
    'CYP',
    'CZK',
    'DEM',
    'DJF',
    'DKK',
    'DOP',
    'DZD',
    'EEK',
    'EGP',
    'ERN',
    'ESP',
    'ETB',
    'EUR',
    'FIM',
    'FJD',
    'FKP',
    'FOZ',
    'FRF',
    'GBP',
    'GEL',
    'GHC',
    'GHS',
    'GIP',
    'GMD',
    'GNF',
    'GRD',
    'GTQ',
    'GYD',
    'HKD',
    'HNL',
    'HRK',
    'HTG',
    'HUF',
    'IDR',
    'IEP',
    'ILS',
    'INR',
    'IQD',
    'IRR',
    'ISK',
    'ITL',
    'JMD',
    'JOD',
    'JPY',
    'KES',
    'KGS',
    'KHR',
    'KMF',
    'KPW',
    'KRW',
    'KWD',
    'KYD',
    'KZT',
    'LAK',
    'LBP',
    'LKR',
    'LRD',
    'LSL',
    'LTL',
    'LUF',
    'LVL',
    'LYD',
    'MAD',
    'MDL',
    'MGA',
    'MGF',
    'MKD',
    'MMK',
    'MNT',
    'MOP',
    'MRO',
    'MTL',
    'MUR',
    'MVR',
    'MWK',
    'MXN',
    'MYR',
    'MZN',
    'NAD',
    'NGN',
    'NIO',
    'NLG',
    'NOK',
    'NPR',
    'NZD',
    'OMR',
    'PAB',
    'PEN',
    'PGK',
    'PHP',
    'PKR',
    'PLN',
    'PTE',
    'PYG',
    'QAR',
    'RON',
    'RSD',
    'RUB',
    'RWF',
    'SAR',
    'SBD',
    'SCR',
    'SDD',
    'SDG',
    'SEK',
    'SGD',
    'SHP',
    'SIT',
    'SKK',
    'SLL',
    'SOR',
    'SOS',
    'SRD',
    'SRG',
    'SSP',
    'STD',
    'SVC',
    'SYP',
    'SZL',
    'THB',
    'TJS',
    'TMM',
    'TMT',
    'TND',
    'TOP',
    'TRL',
    'TRY',
    'TTD',
    'TWD',
    'TZS',
    'UAH',
    'UGX',
    'USD',
    'UYU',
    'UZS',
    'VEB',
    'VEF',
    'VND',
    'VUV',
    'WST',
    'XAF',
    'XAU',
    'XCD',
    'XDR',
    'XEU',
    'XOF',
    'XPF',
    'YER',
    'ZAR',
    'ZMK',
    'ZMW',
    'ZWD',
    'ZWL',
  ];
  public manyCurrenciesObjects = this.manyCurrencies.map((curr, idx) => ({id: idx, currency: curr}));
  currenciesFiltered: string[];
  currenciesPage: PaginatedResponse<string>;
  inputFormControl = new UntypedFormControl('foo', Validators.required);
  checkBoxFormControl = new UntypedFormControl(true);
  radioFormControl = new UntypedFormControl('valueA');
  dateFormControl = new UntypedFormControl();
  timeFormControl = new UntypedFormControl();
  dateTimeFormControl = new UntypedFormControl(null, [Validators.required]);
  quickSearchFormControl = new UntypedFormControl(null);
  format: string;
  minDate: any;
  labels = ['common.yes', 'common.no', 'common.pleaseConfirm'];
  countries = [
    {area: 'Europe', name: 'Italy'},
    {area: 'Europe', name: 'France'},
    {area: 'Europe', name: 'Germany'},
    {area: 'Asia', name: 'China'},
    {area: 'Asia', name: 'Japan'},
    {area: 'Asia', name: 'India'},
  ];

  dateCustomClasses = new Array<DatepickerDateCustomClasses>();

  currencyInputMode = NgxCurrencyInputMode;

  onModelChange(field: string, value: any): void {
    console.log('field %o changed: %o', field, value);
  }

  loadCurrenciesFiltered(event: ComboDataRequest): void {
    console.log('asked for filtered set of currencies: %o', event);

    // Filter in javascript, with a timeout to show the "loading" indicator.
    // In real code you would filter on the server
    setTimeout(() => {
      this.currenciesFiltered = this.manyCurrencies
        .filter(text => DemoFormComponent.currencyMatches(text, event));
    }, 400);
  }

  loadCurrenciesFilteredWithSelected(event: ComboDataRequestWithSelected | ComboDataRequest): void {
    console.log('asked for filtered set of currencies: %o', event);

    // Filter in javascript, with a timeout to show the "loading" indicator.
    // In real code you would filter on the server
    setTimeout(() => {
      this.currenciesFiltered = this.manyCurrencies
        .filter(text => DemoFormComponent.currencyMatchesWithSelected(text, event as ComboDataRequestWithSelected));
    }, 400);
  }

  loadCurrenciesPage(event: ComboDataRequest): void {
    console.log('asked for page of currencies: %o', event);
    const filteredCurrencies = this.manyCurrencies
      .filter(text => DemoFormComponent.currencyMatches(text, event));
    const rows = filteredCurrencies.slice(startIndex(event), endIndex(event));
    this.currenciesPage = {
      pageNum: event.pageNum,
      pageLen: event.pageLen,
      records: rows,
      totalNumRecords: filteredCurrencies.length
    };
  }

  // tslint:disable-next-line:member-ordering
  private static currencyMatches(text, event: ComboDataRequest): boolean {
    return text.indexOf(event.filterText || '') !== -1;
  }

  // tslint:disable-next-line:member-ordering
  private static currencyMatchesWithSelected(text, event: ComboDataRequestWithSelected): boolean {
    return (!event.showOnlySelected || (event.selected && event.selected.indexOf(text) !== -1))
            && text.indexOf(event.filterText || '') !== -1;
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.format = 'yyyy-MM-dd';
    this.inputFormControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => console.log('Input changed: ', value));

    this.checkBoxFormControl.valueChanges
      .subscribe(value => console.log('Checkbox changed: ', value));

    this.radioFormControl.valueChanges
      .subscribe(value => console.log('Radio changed: ', value));

    this.dateFormControl.valueChanges
      .subscribe(value => console.log('Date changed: ', value));

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.dateCustomClasses.push({
      date: yesterday,
      classes: ['bs-datepicker-custom-yesterday', 'bs-datepicker-custom-date']
    }, {
      date: new Date(),
      classes: ['bs-datepicker-custom-today']
    });
  }
}
