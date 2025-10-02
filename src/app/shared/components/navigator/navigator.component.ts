import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navigator',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.css'
})
export class NavigatorComponent {
  opened: boolean = false;

  constructor() {}

  toggle() {
    this.opened = !this.opened;
  }

  isOpened() {
    return this.opened ? "opened" : "closed";
  }
}
