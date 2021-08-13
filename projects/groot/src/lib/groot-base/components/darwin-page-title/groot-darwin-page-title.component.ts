import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-darwin-page-title',
  templateUrl: './groot-darwin-page-title.component.html',
})
export class GrootDarwinPageTitleComponent {
  @Input() icon: string | string[];
  @Input() icons: Array<string | string[]>;
  @Input() title: string;
  @Input() titleTranslationObj: any;
  @Input() subtitle: string;
  @Input() subtitleTranslationObj: any;
  @Input() isDashboard: boolean;
  @Input() reducedHeight = false;
}
