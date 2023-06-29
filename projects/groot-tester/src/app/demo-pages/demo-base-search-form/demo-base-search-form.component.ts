import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-base-search-form',
  templateUrl: './demo-base-search-form.component.html'
})
export class DemoBaseSearchFormComponent {
  name: string;
  referenceDate: Date;
  dateTime: Date;
  selectedCurrencies: string[];
  nameApplied: string;
  referenceDateApplied: Date;
  dateTimeApplied: Date;
  selectedCurrenciesApplied: string[];
  availableCurrencies = ['EUR', 'USD', 'CHF', 'GBP', 'JPY', 'CAD'];

  anyFilter = false;

  search(): void {
    this.anyFilter = Boolean(this.name || this.referenceDate || this.dateTime
      || (this.selectedCurrencies && this.selectedCurrencies.length));
    this.nameApplied = this.name;
    this.referenceDateApplied = this.referenceDate;
    this.dateTimeApplied = this.dateTime;
    this.selectedCurrenciesApplied = this.selectedCurrencies;
  }

  reset(): void {
    this.name = null;
    this.referenceDate = null;
    this.dateTime = null;
    this.selectedCurrencies = [];
    this.nameApplied = null;
    this.referenceDateApplied = null;
    this.dateTimeApplied = null;
    this.selectedCurrenciesApplied = [];
    this.anyFilter = false;
  }
}
