import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  sequence,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('box', [
      state(
        'start',
        style({ backgroundColor: 'green', transform: 'scale(1.2)' })
      ),
      state('end', style({ backgroundColor: 'tomato' })),
      state(
        'special',
        style({ backgroundColor: '#00b7ff', borderRadius: '50%' })
      ),
      transition('start <=> end', animate(1000)),
      transition('special <=> *', [
        style({ backgroundColor: 'black' }),
        // Анимации запускаются одна за одной после её выполнения
        // По умолчанию стоит метод sequence
        animate(3000, style({ backgroundColor: 'red' })),
        animate(1000),
      ]),
    ]),

    trigger('visibility', [
      // void => *
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(1000),
      ]),
      // * => void
      transition(':leave', [
        style({ opacity: 1 }),
        // Метод group() для запуска анимаций одновременно
        // По умолчанию стоит метод sequence
        group([
          animate(1000, style({ opacity: 0, transform: 'scale(0)' })),
          animate(500, style({ color: '#000', fontWeight: 'bold' })),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  boxState = 'start';
  visible = true;

  toggleAnimate(): void {
    this.boxState = this.boxState === 'start' ? 'end' : 'start';
  }

  toggleSpecial(): void {
    this.boxState = 'special';
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }
}
