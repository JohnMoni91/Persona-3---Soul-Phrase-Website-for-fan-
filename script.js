const enterBtn = document.getElementById('enterBtn');
const velvetRoom = document.getElementById('velvetRoom');
const mainContent = document.getElementById('mainContent');
const audio = document.getElementById('audio');
const lyricDisplay = document.getElementById('lyricDisplay'); // Nosso novo container

// ESTRUTURA DE DADOS ATUALIZADA
// Agora cada item tem um 'startTime' e um 'endTime'
const lyrics = [
  { startTime: 23, endTime: 28, text: "I believe so strongly" },
  { startTime: 28, endTime: 32, text: "That tomorrow never falls away" },
  { startTime: 32, endTime: 36, text: "月光した" },
  { startTime: 36, endTime: 39, text: "It still awaits" },
  { startTime: 39, endTime: 43, text: "It still carries on through its old ways" },
  { startTime: 43, endTime: 47, text: "Till this moment of time" },
  { startTime: 47, endTime: 50, text: "あの時　交わした" },
  { startTime: 50, endTime: 54, text: "言葉が鳴り響いて" },
  { startTime: 54, endTime: 58, text: "ささやかな夢" },
  { startTime: 58, endTime: 61, text: "There is no more darkness" },
  { startTime: 61, endTime: 64, text: "No more tears in the rain" },
  { startTime: 64, endTime: 68, text: "No one hurt..." },
  { startTime: 68, endTime: 72, text: "Write me an endless song (When you let go)" },
  { startTime: 72, endTime: 76, text: "As I'll feel so alive" },
  { startTime: 76, endTime: 80, text: "聞こえるよ SOUL PHRASE (I'm walking on my way)" },
  { startTime: 80, endTime: 84, text: "Now write me an endless song (When you let go)" },
  { startTime: 84, endTime: 88, text: "As I'll feel so alive" },
  { startTime: 88, endTime: 94, text: "走り出す　闇の先へ" },
  // Adicione mais letras com startTime e endTime se desejar
];

let started = false;
let currentlyDisplayedLyric = null; // Para saber qual letra já está na tela

// A transição da Velvet Room permanece a mesma
enterBtn.addEventListener('click', () => {
  velvetRoom.classList.add('shatter'); // Use a animação de estilhaço que funcionar melhor para você
  setTimeout(() => {
    velvetRoom.style.display = 'none';
    mainContent.style.display = 'block';
    audio.play().catch(error => {
      console.warn("Autoplay bloqueado.", error);
    });
    started = true;
  }, 800);
});

// LÓGICA DE SINCRONIZAÇÃO TOTALMENTE NOVA
audio.addEventListener('timeupdate', () => {
  if (!started) return;
  const currentTime = audio.currentTime;

  // 1. Encontra a letra que deveria estar ativa AGORA
  const activeLyric = lyrics.find(lyric => 
    currentTime >= lyric.startTime && currentTime < lyric.endTime
  );

  // 2. Se encontrou uma letra ativa e ela é DIFERENTE da que está na tela
  if (activeLyric && activeLyric !== currentlyDisplayedLyric) {
    // Calcula a duração exata da frase
    const duration = activeLyric.endTime - activeLyric.startTime;
    
    // Atualiza o texto
    lyricDisplay.textContent = activeLyric.text;
    
    // Aplica a animação de entrada com a duração calculada
    lyricDisplay.style.animation = `lyric-enter ${duration}s ease-out forwards`;
    
    // Guarda a referência da letra atual
    currentlyDisplayedLyric = activeLyric;
  }
  // 3. Se NÃO encontrou nenhuma letra ativa e ANTES havia uma na tela
  else if (!activeLyric && currentlyDisplayedLyric) {
    // Aplica a animação de saída
    lyricDisplay.style.animation = `lyric-exit 0.5s ease-out forwards`;

    // Limpa a referência
    currentlyDisplayedLyric = null;
  }
});