import {Component} from '@angular/core';
import {BsLocaleService} from 'ngx-bootstrap';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(translate: TranslateService,
              localeService: BsLocaleService) {
    translate.use('en');
    localeService.use('en');
  }
}
