import {Component} from '@angular/core';
import {LoadingService} from '../../../../../groot/src/lib/groot-base/services/loading.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-demo-loading',
  templateUrl: './demo-loading.component.html'
})
export class DemoLoadingComponent {
  constructor(private loadingService: LoadingService) {
  }

  testLoading() {
    const stopLoading = this.loadingService.startLoading();
    timer(3000).subscribe(stopLoading);
  }

  testFastLoading() {
    const stopLoading = this.loadingService.startLoading();
    timer(100).subscribe(stopLoading);
  }
}
