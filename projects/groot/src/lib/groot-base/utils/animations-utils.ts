import {animate, animation, style, transition, trigger, useAnimation} from '@angular/animations';

/**
 * Slide down animation.
 */
export const openDivAnimation = animation([
  style({opacity: 0.0, height: 0}),
  animate('0.15s ease-in-out', style({opacity: 1.0, height: '*'}))
]);

/**
 * Slide up animation.
 */
export const closeDivAnimation = animation([
  style({opacity: 1.0, height: '*'}),
  animate('0.15s ease-in-out', style({opacity: 0.0, height: 0}))
]);

/**
 * Animation that can be used with an *ngIf to animate an element: when the
 * condition goes from false to true, the element will be animated, entering
 * from the top and sliding down. The trigger to use is `dropDown`.
 */
export const dropDownOnCreateAnimation = trigger('dropDown', [
  transition(':enter', [useAnimation(openDivAnimation)]),
  transition(':leave', [useAnimation(closeDivAnimation)])]
);

/**
 * Empty animation on enter. If you have an element that needs to slide down
 * on :enter, but you don't want it to show at the first loading, you can append
 * this (empty) animation on the parent element.
 * @see https://stackoverflow.com/questions/44111239/angular-is-there-a-way-to-skip-enter-animation-on-initial-render
 */
export const emptyEnterAnimation = trigger('emptyEnter', [
  transition(':enter', [])
]);
