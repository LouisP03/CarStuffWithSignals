import { Component } from '@angular/core';
import {CarPageComponent} from './car-page/car-page.component';

@Component({
  selector: 'app-root',
  imports: [CarPageComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarStuffWithSignals';
}
