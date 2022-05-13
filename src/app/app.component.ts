import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface Song {
  name: string;
  displayName: string;
  artist: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'tiny-music-player';
  songs: Song[] = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Good Night, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];

  ngOnInit(): void {
    /*const music = document.querySelector('audio');
    const progressContainer = document.getElementById('progress-container');
    const progress = document.getElementById('progress');

    const durationEl = document.getElementById('duration');
    const currentTimeEl = document.getElementById('current-time');

    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const playBtn = document.getElementById('play');

    const image = document.querySelector('img');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');

    let songIndex = 0;

    function calculateCurrentTIme(currentTime: any) {
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds: any = Math.floor(currentTime % 60);

      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }

      return {
        currentMinutes,
        currentSeconds,
      };
    }

    function updateProgress(e: any) {
      const { currentTime, duration } = e.target;
      const progressPercent = (currentTime / duration) * 100;
      progress!.style.width = `${progressPercent}%`;

      const { durationMinutes, durationSeconds } =
        calculateDurationTime(duration);

      if (durationMinutes) {
        durationEl!.textContent = `${durationMinutes}:${durationSeconds}`;
      }

      const { currentMinutes, currentSeconds } =
        calculateCurrentTIme(currentTime);

      if (currentSeconds) {
        currentTimeEl!.textContent = `${currentMinutes}:${currentSeconds}`;
      }
    }

    function updateProgressBar(e: any) {
      const progressBarWidth = e.target.clientWidth;
      // const { duration } = music;
      music!.currentTime = (e.offsetX / progressBarWidth) * music!.duration;
    }

    progressContainer!.addEventListener('click', updateProgressBar);
    music!.addEventListener('timeupdate', updateProgress);
    // music!.addEventListener('ended', nextSong);*/
  }
}
