class BeepSound {
  constructor(freq) {
    const AudioContext = window.AudioContext;
    this.freq = freq;
    this.audioCtx = new AudioContext();
  }

  getOscillator() {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(this.freq, this.audioCtx.currentTime);
    oscillator.connect(this.audioCtx.destination);

    return oscillator;
  }

  beep() {
    const oscillator = this.getOscillator();
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 100);
  }
}
