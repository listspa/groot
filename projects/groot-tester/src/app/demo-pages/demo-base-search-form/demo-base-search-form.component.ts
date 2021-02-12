import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-base-search-form',
  templateUrl: './demo-base-search-form.component.html'
})
export class DemoBaseSearchFormComponent {
  name: string;
  referenceDate: Date;
  selectedCurrencies: string[];
  availableCurrencies = ['EUR', 'USD', 'CHF', 'GBP', 'JPY', 'CAD'];

  anyFilter = false;

  search(): void {
    this.anyFilter = Boolean(this.name || this.referenceDate || (this.selectedCurrencies && this.selectedCurrencies.length));
  }

  reset(): void {
    this.name = null;
    this.referenceDate = null;
    this.selectedCurrencies = [];
    this.anyFilter = false;
  }
}
