import {animate, state, style, transition, trigger} from '@angular/animations';

export const dropDownAnimation = trigger('toggle', [
  state('collapsed', style({opacity: 0.0, height: 0, display: 'none'})),
  state('expanded', style({opacity: 1.0, height: '*'})),
  transition('collapsed => expanded', [
    style({opacity: 0.0, height: 0}),
    animate('0.15s ease-in-out', style({opacity: 1.0, height: '*'}))
  ]),
  transition('expanded => collapsed', [
    style({opacity: 1.0, height: '*'}),
    animate('0.15s ease-in-out', style({opacity: 0.0, height: 0}))
  ])
]);
