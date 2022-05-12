import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Song } from '../app.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() songs: Song[] = [];

  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  songIndex = 0;

  playMusic(): void {
    this.isPlaying = true;
    this.audio.nativeElement.play();
  }

  pauseMusic(): void {
    this.isPlaying = false;
    this.audio.nativeElement.pause();
  }

  nextSong(): void {
    this.songIndex++;

    if (this.songIndex > this.songs.length - 1) {
      this.songIndex = 0;
    }

    this.playMusic();
  }

  previousSong(): void {
    this.songIndex--;

    if (this.songIndex < 0) {
      this.songIndex = this.songs.length - 1;
    }

    this.playMusic();
  }
}
