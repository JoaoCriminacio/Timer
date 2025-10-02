import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
    private timer: number = Number(localStorage.getItem('time')) || 300;

    setTimer(time: number) {
      this.timer = time;
    }

    getTime() {
      return this.timer;
    }
}
