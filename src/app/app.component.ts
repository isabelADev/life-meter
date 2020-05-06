import {Component, ViewChild} from '@angular/core';
import {environment} from "../environments/environment";
import {TrackerComponent} from "./tracker/tracker.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hpTitle = environment.hpTitle;
  mpTitle = environment.mpTitle;
  @ViewChild(TrackerComponent) hijomp: TrackerComponent;

  curar10hp() {
    this.hijomp.increment(10);
  }

  damage30hp() {
    this.hijomp.increment(-5);
  }
}
