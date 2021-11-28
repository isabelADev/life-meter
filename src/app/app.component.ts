import { Component, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { TrackerComponent } from './tracker/tracker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hpTitle = environment.hpTitle;

  mpTitle = environment.mpTitle;

  @ViewChild(TrackerComponent)
  tracker: TrackerComponent;

  public heal10hp() {
    this.tracker.increment(10);
  }

  public damage30hp() {
    this.tracker.increment(-5);
  }
}
