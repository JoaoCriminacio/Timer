import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISound} from '../../shared/models/sound.model';
import {SoundService} from '../../shared/services/sound.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sounds',
  imports: [
    NgClass
  ],
  templateUrl: './sounds.component.html',
  styleUrl: './sounds.component.css'
})
export class SoundsComponent implements OnInit, OnDestroy {
    protected sounds: ISound[] = [
      {
        name: "Música dos Campeões",
        src: "audios/campeoes.mp3"
      },
      {
        name: "Champions League",
        src: "audios/champions-league.mp3"
      },
      {
        name: "China",
        src: "audios/china.mp3"
      },
      {
        name: "Drop",
        src: "audios/drop.mp3"
      },
      {
        name: "Fein",
        src: "audios/fein.mp3"
      },
      {
        name: "Fortnite",
        src: "audios/fortnite.mp3"
      },
      {
        name: "Hotline Bling",
        src: "audios/hotline-bling.mp3"
      },
      {
        name: "Kuduro",
        src: "audios/kuduro.mp3"
      },
      {
        name: "Lasflau",
        src: "audios/lasflau.mp3"
      }
    ];

    protected previewSound!: ISound;
    protected selectedSound!: ISound;
    protected audio!: HTMLAudioElement;
    protected playing: boolean = false;

    constructor(private soundService: SoundService) {}

    ngOnInit() {
      this.selectedSound = this.soundService.getSound();
      this.previewSound = this.selectedSound;
      this.audio = new Audio(this.previewSound?.src);
    }

    ngOnDestroy() {
      this.audio.pause();
    }

    protected playSound(sound: ISound) {
      if (this.previewSound?.src === sound.src) {
        this.soundAction(this.playing ? 'pause' : 'play');
        return;
      }

      this.audio.pause();
      this.audio = new Audio(sound.src);
      this.audio.currentTime = 0;
      this.audio.play();

      this.previewSound = sound;
      this.playing = true;
    }

    protected selectSound(sound: ISound) {
      this.selectedSound = sound;
      localStorage.setItem('sound', JSON.stringify(sound));
      this.soundService.setSound(sound);
    }

    protected soundAction(action: 'play' | 'pause') {
      if (action === 'play') {
        this.audio.play();
        this.playing = true;
      } else {
        this.audio.pause();
        this.playing = false;
      }
    }
}
