import {Component} from '@angular/core';

const INITIAL_RECORD = {
  name: '',
  spamMe: true
};

@Component({
  selector: 'app-demo-cards',
  templateUrl: './demo-cards.component.html'
})
export class DemoCardsComponent {
  record = {...INITIAL_RECORD};

  resetForm() {
    this.record = {...INITIAL_RECORD};
  }

  submitForm() {
    alert('salvato');
  }
}
