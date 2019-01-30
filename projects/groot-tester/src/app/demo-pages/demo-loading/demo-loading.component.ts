import {Component} from '@angular/core';
import {LoadingService} from '../../../../../groot/src/lib/services/loading.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-demo-loading',
  templateUrl: './demo-loading.component.html'
})
export class DemoLoadingComponent {
  constructor(private loadingService: LoadingService) {
  }

  testLoading() {
    this.loadingService.startLoading();
    timer(3000).subscribe(() => this.loadingService.doneLoading());
  }
}
