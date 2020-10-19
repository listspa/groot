import {Component, Input} from '@angular/core';
import {TranslationsLanguageService} from '../../services/translations-language.service';
import {ClassesType} from '../../../model/classes-type.model';

@Component({
  selector: 'groot-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() languages: string[] = ['it', 'en'];
  @Input() classes: ClassesType = 'footer-sticky';

  constructor(public translationsLanguageService: TranslationsLanguageService) {
  }
}
