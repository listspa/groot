import {Component, Input} from '@angular/core';
import {Release, ReleaseChangeType} from '../release.model';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent {
  ReleaseChangeType = ReleaseChangeType;
  @Input() release: Release;
}
