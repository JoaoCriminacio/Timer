import {Component, OnDestroy, OnInit} from '@angular/core';
import {SoundService} from '../../shared/services/sound.service';
import {TimerService} from '../../shared/services/timer.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [
    NgClass
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
    protected timeInSeconds!: number;
    protected selectedTime!: number;
    protected audio!: HTMLAudioElement;
    protected timer: any = null;
    protected isEditing: boolean = false;
    protected isTimerPlaying: boolean = false;
    protected isSoundPlaying: boolean = false;

    constructor (protected timerService: TimerService,
                 protected soundService: SoundService) {}

    ngOnInit() {
      this.timeInSeconds = this.timerService.getTime();
      this.selectedTime = this.timeInSeconds;
      this.audio = new Audio(this.soundService.getSound().src);
    }

    ngOnDestroy() {
      this.stopTimer();
      this.stopSound();
    }

    get formattedTime(): string {
      const hours = Math.floor(this.timeInSeconds / 3600);
      const minutes = Math.floor((this.timeInSeconds % 3600) / 60);
      const seconds = this.timeInSeconds % 60;
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    protected toggleEdit() {
      this.isEditing = !this.isEditing;
    }

    protected setTimeManually(value: string) {
      value = value.trim();

      if (/[a-zA-Z]/.test(value)) {
        this.timeInSeconds = this.selectedTime;
        this.setTimeVariables();
        this.isEditing = false;
        return;
      }

      if (/^\d+$/.test(value)) {
        const seconds = parseInt(value, 10);
        if (!isNaN(seconds)) {
          this.timeInSeconds = seconds;
          this.setTimeVariables();
        } else {
          this.timeInSeconds = this.selectedTime;
          this.setTimeVariables();
        }

        this.isEditing = false;
        return;
      }

      if (value.includes(':')) {
        const parts = value.split(':').map(v => parseInt(v, 10) || 0);

        let hh = 0, mm = 0, ss = 0;

        if (parts.length === 3) [hh, mm, ss] = parts;
        else if (parts.length === 2) [mm, ss] = parts;
        else if (parts.length === 1) [ss] = parts;

        this.timeInSeconds = hh * 3600 + mm * 60 + ss;
        this.setTimeVariables();
        this.isEditing = false;
        return;
      }

      this.timeInSeconds = this.selectedTime;
      this.setTimeVariables();
      this.isEditing = false;
    }

    protected start() {
      if (this.timer || this.timeInSeconds <= 0) return;
      this.timer = setInterval(() => {
        if (this.timeInSeconds > 0) {
          this.timeInSeconds--;
          this.timerService.setTimer(this.timeInSeconds);
          this.isTimerPlaying = true;
        } else {
          this.stopTimer();
          this.playSound();
          this.isTimerPlaying = false;
        }
      }, 1000);
    }

    protected reset() {
      this.stopTimer();
      this.timeInSeconds = this.selectedTime;
      this.setTimeVariables();
      this.audio.pause();
    }

    protected stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.isTimerPlaying = false;
    }

    protected stopSound() {
      this.audio.pause();
      this.isSoundPlaying = false;
    }

    private playSound() {
      this.isSoundPlaying = true;
      let count = 0;

      const playAgain = () => {
        if (count < 3) {
          this.audio.currentTime = 0;
          this.audio.play();
          count++;
        } else {
          this.isSoundPlaying = false;
        }
      };

      this.audio.addEventListener('ended', playAgain, { once: false });
      playAgain();
    }

    private setTimeVariables() {
      this.selectedTime = this.timeInSeconds;
      this.timerService.setTimer(this.timeInSeconds);
      localStorage.setItem('time', this.timeInSeconds.toString());
    }

    private pad(num: number): string {
      return num < 10 ? `0${num}` : `${num}`;
    }
}
