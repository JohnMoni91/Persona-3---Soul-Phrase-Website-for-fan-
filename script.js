  const enterBtn = document.getElementById('enterBtn');
  const velvetRoom = document.getElementById('velvetRoom');
  const mainContent = document.getElementById('mainContent');
  const audio = document.getElementById('audio');
  const lyricsFall = document.getElementById('lyricsFall');

  // Lyrics timed (seconds) and text fragments to fall
  const lyrics = [
    { time: 23, text: "I believe so strongly" },
    { time: 28, text: "That tomorrow never falls away" },
    { time: 32, text: "月光した" },
    { time: 36, text: "It still awaits" },
    { time: 39, text: "It still carries on through its old ways" },
    { time: 43, text: "Till this moment of time" },
    { time: 47, text: "あの時　交わした" },
    { time: 50, text: "言葉が鳴り響いて" },
    { time: 54, text: "ささやかな夢" },
    { time: 58, text: "There is no more darkness" },
    { time: 61, text: "No more tears in the rain" },
    { time: 64, text: "No one hurt..." },
    { time: 68, text: "Write me an endless song (When you let go)" },
    { time: 72, text: "As I'll feel so alive" },
    { time: 76, text: "聞こえるよ SOUL PHRASE (I'm walking on my way)" },
    { time: 80, text: "Now write me an endless song (When you let go)" },
    { time: 84, text: "As I'll feel so alive" },
    { time: 88, text: "走り出す　闇の先へ" },
    { time: 94, text: "Write me an endless song (When you let go)" },
    { time: 98, text: "As I'll feel so alive" },
    { time: 102, text: "聞こえるよ SOUL PHRASE (I'm walking on my way)" },
    { time: 106, text: "Now write me an endless song (When you let go)" },
    { time: 110, text: "As I'll feel so alive" },
    { time: 114, text: "渡りゆく　闇の先へ" }
  ];

  let started = false;
  let lastIndex = -1;

  // When user clicks Enter on velvet room
  enterBtn.addEventListener('click', () => {
    // Add glitch animation
    velvetRoom.classList.add('glitch');
    setTimeout(() => {
      velvetRoom.style.display = 'none';
      mainContent.style.display = 'block';
      audio.play().catch(() => {});
      started = true;
    }, 600);
  });

  // Create falling text element and animate
  function createFallingText(text) {
    const el = document.createElement('div');
    el.classList.add('falling-text');
    el.textContent = text;
    el.style.left = `${Math.random() * 90 + 5}vw`;
    el.style.fontSize = `${Math.random() * 1 + 1}rem`;
    el.style.animationDuration = `${Math.random() * 6 + 6}s`;
    lyricsFall.appendChild(el);
    // Remove after animation
    el.addEventListener('animationend', () => el.remove());
  }

  // Sync lyrics to music time - show lyrics falling on correct time
  audio.addEventListener('timeupdate', () => {
    if (!started) return;
    const currentTime = audio.currentTime;
    // For every lyric that should appear now
    while (lastIndex + 1 < lyrics.length && currentTime >= lyrics[lastIndex + 1].time) {
      lastIndex++;
      // Make the lyric fall (split by words for effect)
      const words = lyrics[lastIndex].text.split(' ');
      words.forEach(word => {
        createFallingText(word);
      });
    }
    // Loop reset
    if (currentTime < lyrics[0].time) {
      lastIndex = -1;
    }
  });