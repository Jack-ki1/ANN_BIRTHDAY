/* ═══════════════════════════════════════════
   ann-birthday / js/player.js
   Full HTML5 Audio music player

   HOW TO ADD YOUR OWN SONGS
   ──────────────────────────
   1. Drop your .mp3 files into  assets/music/
   2. Update the TRACKS array below with the
      correct filename, title, artist and art emoji.
   3. That's it — the player handles the rest.

   NOTE: If no audio files are provided the player
   still shows the UI but clicking play will display
   a friendly notice instead of throwing an error.
   ═══════════════════════════════════════════ */

const Player = (() => {

// ── TRACK LIST ────────────────────────────
  // Edit this array to match your music files.
  // `file` paths are relative to index.html.
  const TRACKS = [
    {
      file:   'assets/music/Bridget Blue – NI WEWE (Official Video) [rdysNyQzUnM].mp3',
      title:  'NI WEWE',
      artist: 'Bridget Blue',
      art:    '💖',
      color:  'linear-gradient(135deg,#FF4E8E,#8B1A4A)',
    },
    {
      file:   'assets/music/Bridget Blue & Bien - I Choose You (Official Lyric Video) [-Yv9MRa28dY].mp3',
      title:  'I Choose You',
      artist: 'Bridget Blue & Bien',
      art:    '💍',
      color:  'linear-gradient(135deg,#C9A7FF,#5C1040)',
    },
{
      file:   'assets/music/Bridget Blue & Nikita Kering – Mimi na Wewe (Track 8) _ Listening Session [OXKNU6yOjqY].mp3',
      title:  'Mimi na Wewe',
      artist: 'Bridget Blue & Nikita Kering',
      art:    '🎤',
      color:  'linear-gradient(135deg,#F7DBA7,#8B1A4A)',
    },
    {
      file:   'assets/music/Ella Mai - 100 (Official Music Video) - EllaMaiVEVO.mp3',
      title:  '100',
      artist: 'Ella Mai',
      art:    '💯',
      color:  'linear-gradient(135deg,#FFB3CF,#C9A7FF)',
    },
    {
      file:   'assets/music/Ella Mai - First Day (Official Visualizer) - EllaMaiVEVO.mp3',
      title:  'First Day',
      artist: 'Ella Mai',
      art:    '🌅',
      color:  'linear-gradient(135deg,#FF4E8E,#C9A7FF)',
    },
  ];

  // ── STATE ─────────────────────────────────
  let audio        = new Audio();
  let currentIndex = -1;
  let isPlaying    = false;
  let hasAudio     = false; // true once a file loads without error

  // ── DOM REFS ──────────────────────────────
  const npArtwork   = document.getElementById('np-artwork');
  const npTitle     = document.getElementById('np-title');
  const npArtist    = document.getElementById('np-artist');
  const btnPlay     = document.getElementById('btn-play');
  const progressFill  = document.getElementById('progress-fill');
  const progressThumb = document.getElementById('progress-thumb');
  const progCurrent   = document.getElementById('prog-current');
  const progDuration  = document.getElementById('prog-duration');
  const volSlider     = document.getElementById('volume-slider');
  const trackEls      = document.querySelectorAll('.track[data-index]');

  // ── HELPERS ───────────────────────────────
  function fmt(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, '0');
    return `${m}:${sec}`;
  }

  function setActiveTrack(idx) {
    trackEls.forEach(el => el.classList.remove('active'));
    const el = document.querySelector(`.track[data-index="${idx}"]`);
    if (el) el.classList.add('active');
  }

  function updateNowPlaying(idx) {
    const t = TRACKS[idx];
    npTitle.textContent  = t.title;
    npArtist.textContent = t.artist;
    npArtwork.textContent = t.art;
    npArtwork.style.background = t.color;
  }

  function updateProgress() {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width        = pct + '%';
    progressThumb.style.left        = pct + '%';
    progCurrent.textContent          = fmt(audio.currentTime);
    progDuration.textContent         = fmt(audio.duration);
  }

  function showPlayBtn()  { btnPlay.textContent = '▶'; }
  function showPauseBtn() { btnPlay.textContent = '⏸'; }

  // ── AUDIO EVENTS ──────────────────────────
  audio.addEventListener('timeupdate',  updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);
  audio.addEventListener('ended', () => { nextTrack(); });

  audio.addEventListener('canplaythrough', () => { hasAudio = true; });

  audio.addEventListener('error', () => {
    // File missing — show notice, stay paused
    isPlaying = false;
    showPlayBtn();
    npArtwork.classList.remove('playing');
    if (!hasAudio) showNoAudioNotice();
  });

  // ── PUBLIC API ────────────────────────────
  function playTrack(idx) {
    currentIndex = idx;
    const t = TRACKS[idx];
    audio.src = t.file;
    audio.volume = parseFloat(volSlider.value);
    updateNowPlaying(idx);
    setActiveTrack(idx);
    audio.play().then(() => {
      isPlaying = true;
      showPauseBtn();
      npArtwork.classList.add('playing');
      showToast(`🎵 Now playing: ${t.title}`);
    }).catch(() => {
      // Browser autoplay blocked or file missing
      isPlaying = false;
      showPlayBtn();
      npArtwork.classList.remove('playing');
      showNoAudioNotice();
    });
  }

  function togglePlay() {
    if (currentIndex < 0) { playTrack(0); return; }
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      showPlayBtn();
      npArtwork.classList.remove('playing');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        showPauseBtn();
        npArtwork.classList.add('playing');
      }).catch(showNoAudioNotice);
    }
  }

  function nextTrack() {
    const next = (currentIndex + 1) % TRACKS.length;
    playTrack(next);
  }

  function prevTrack() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    const prev = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    playTrack(prev);
  }

  function seekTo(e) {
    const bar  = document.getElementById('progress-bar');
    const rect = bar.getBoundingClientRect();
    const pct  = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    if (audio.duration) audio.currentTime = pct * audio.duration;
  }

  function setVolume(v) {
    audio.volume = parseFloat(v);
  }

  function showNoAudioNotice() {
    let notice = document.querySelector('.no-audio-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'no-audio-notice';
      notice.innerHTML = `
        🎵 <strong>Music files not found.</strong><br>
        Drop your .mp3 files into <code>assets/music/</code> and rename them to match the filenames in <code>js/player.js</code>.
        See the <strong>README</strong> for full instructions.
      `;
      const bar = document.querySelector('.now-playing-bar');
      bar.parentNode.insertBefore(notice, bar.nextSibling);
    }
    notice.style.display = 'block';
  }

  // ── EXPOSE GLOBALS (called from HTML) ─────
  window.playTrack  = playTrack;
  window.togglePlay = togglePlay;
  window.nextTrack  = nextTrack;
  window.prevTrack  = prevTrack;
  window.seekTo     = seekTo;
  window.setVolume  = setVolume;

})();
