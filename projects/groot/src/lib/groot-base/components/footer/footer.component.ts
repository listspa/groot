import {Component, Input} from '@angular/core';
import {TranslationsLanguageService} from '../../services/translations-language.service';

@Component({
  selector: 'groot-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() languages: string[] = ['it', 'en'];
  @Input() classes: string | string[] = 'footer-sticky';

  constructor(public translationsLanguageService: TranslationsLanguageService) {
  }
}
