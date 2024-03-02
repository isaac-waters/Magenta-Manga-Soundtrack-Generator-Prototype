//general skeleton of NoteSequence's for project, creating a sad NoteSequence and happy NoteSequence and code to integrate MusicVAE (very far from complete)
//add to header of webpage:
//<script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0"></script>

//sad music base NoteSequence:
SAD_BGM = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 1
  };

  player = new mm.Player();
  
  player.start(SAD_BGM);
  player.stop();


//happy music base NoteSequence:
HAPPY_BGM ={
    notes: [
        {pitch: 55, startTime: 0.0, endTime: 0.5},
    ],
    totalTime: 1
};

player - new mm.Player();

player.start(HAPPY_BGM);
player.stop();
<script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0"></script>
<script>
  // Expanded sad music base NoteSequence
  const SAD_BGM = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
      {pitch: 58, startTime: 0.5, endTime: 1.0},
      {pitch: 56, startTime: 1.0, endTime: 1.5},
      {pitch: 54, startTime: 1.5, endTime: 2.0},
    ],
    totalTime: 2
  };

  // Expanded happy music base NoteSequence
  const HAPPY_BGM = {
    notes: [
      {pitch: 72, startTime: 0.0, endTime: 0.4},
      {pitch: 76, startTime: 0.4, endTime: 0.8},
      {pitch: 79, startTime: 0.8, endTime: 1.2},
      {pitch: 84, startTime: 1.2, endTime: 1.6},
    ],
    totalTime: 1.6
  };

  // Initializing players
  const player = new mm.Player();
  const vaePlayer = new mm.Player();

  // Initialize the MusicVAE model
  const music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
  music_vae.initialize().then(() => {
    console.log('MusicVAE model loaded');
  }).catch(error => {
    console.error('Error loading MusicVAE model:', error);
  });

  // Function to play sad or happy music
  function playMusic(musicType) {
    const sequence = musicType === 'SAD' ? SAD_BGM : HAPPY_BGM;
    if (player.isPlaying()) {
      player.stop();
    } else {
      player.start(sequence);
    }
  }

  // Function to play music using MusicVAE
  function playVAE() {
    const vae_temperature = 0.5; // Default temperature
    if (vaePlayer.isPlaying()) {
      vaePlayer.stop();
    } else {
      music_vae.sample(1, vae_temperature).then(samples => {
        vaePlayer.start(samples[0]);
      }).catch(error => {
        console.error('Error generating music with MusicVAE:', error);
      });
    }
  }
</script>
