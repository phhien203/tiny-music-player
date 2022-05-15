import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { combineLatest, fromEvent, map, Observable, startWith } from 'rxjs';
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
  currentTime$!: Observable<string>;
  progressPercent$!: Observable<number>;

  ngOnInit(): void {
    const timeUpdate$ = fromEvent(this.audio.nativeElement, 'timeupdate');

    this.duration$ = timeUpdate$.pipe(
      map((e: any) => e.target.duration),
      map((duration) => calculateDurationTime(duration)),
      map(
        ({ durationMinutes, durationSeconds }) =>
          `${durationMinutes}:${durationSeconds}`
      )
    );

    this.currentTime$ = timeUpdate$.pipe(
      map((e: any) => e.target.currentTime),
      map((currentTime) => calculateCurrentTime(currentTime)),
      map(
        ({ currentMinutes, currentSeconds }) =>
          `${currentMinutes}:${currentSeconds}`
      )
    );

    this.progressPercent$ = timeUpdate$.pipe(
      map((e: any) => {
        const duration: number = e.target.duration ?? 1;
        const currentTime: number = e.target.currentTime ?? 0;
        return (currentTime / duration) * 100;
      }),
      startWith(0)
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

  updateProgressBar(e: any): void {
    const progressBarWidth: number = e.target.clientWidth;
    this.audio.nativeElement.currentTime =
      (e.offsetX / progressBarWidth) * this.audio.nativeElement.duration;
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

function calculateCurrentTime(currentTime: number) {
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds: number | string = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  return {
    currentMinutes,
    currentSeconds,
  };
}
