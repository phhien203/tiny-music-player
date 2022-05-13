import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';
import { Song } from '../app.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() songs: Song[] = [];

  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  songIndex = 0;
  duration$!: Observable<string>;

  ngOnInit(): void {
    this.duration$ = fromEvent(this.audio.nativeElement, 'timeupdate').pipe(
      map((e: any) => e.target.duration),
      map((duration) => calculateDurationTime(duration)),
      map(
        ({ durationMinutes, durationSeconds }) =>
          `${durationMinutes}:${durationSeconds}`
      )
    );
  }

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

function calculateDurationTime(duration: number) {
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds: number | string = Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  return {
    durationMinutes,
    durationSeconds,
  };
}
