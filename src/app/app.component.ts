import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  keyframes,
  useAnimation,
} from '@angular/animations';
import { bounce, rotateOut, fadeInLeft, rollIn } from 'ng-animate';

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
        group([
          query('.box-title', animate(1000, style({ color: 'pink' }))),
          style({ backgroundColor: 'black' }),
          // Анимации запускаются одна за одной после её выполнения
          // По умолчанию стоит метод sequence
          animate(2000, style({ backgroundColor: 'red' })),
        ]),
        animate(1000),
      ]),
    ]),

    trigger('visibility', [
      // void => *
      transition(':enter', [
        // style({ opacity: 0, transform: 'scale(0)' }),
        // animate(1000),
        animate(
          '4s',
          keyframes([
            style({ backgroundColor: 'red', offset: 0.2 }),
            style({ backgroundColor: 'green', offset: 0.3 }),
            style({ backgroundColor: 'yellow', offset: 0.4 }),
            style({ backgroundColor: 'pink', offset: 0.9 }),
          ])
        ),
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
    trigger('bounce', [
      transition('* => rotate', useAnimation(rotateOut)),
      transition('* => rollIn', useAnimation(rollIn)),
      transition(':enter', useAnimation(fadeInLeft)),
    ]),
  ],
})
export class AppComponent {
  boxState = 'start';
  animateBoxState: string;
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

  animationStarter(event: AnimationEvent): void {
    console.log('Animation Started: ', event);
  }

  animationDone(event: AnimationEvent): void {
    console.log('Animation Done: ', event);
  }

  bounceDone(): void {
    this.animateBoxState = '';
  }

  rotateBox(): void {
    this.animateBoxState = 'rotate';
  }

  rollInBox(): void {
    this.animateBoxState = 'rollIn';
  }
}
