import { Injectable } from '@angular/core';
import {ISound} from '../models/sound.model';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
    private sound: ISound = JSON.parse(localStorage.getItem('sound') || 'null') || {
      name: "Música dos Campeões",
      src: "audios/campeoes.mp3"
    };

    setSound(sound: ISound) {
      this.sound = sound;
    }

    getSound() {
      return this.sound;
    }
}
