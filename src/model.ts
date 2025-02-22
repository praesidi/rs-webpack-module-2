import { Weather } from "./models";

const soundFileNames = {
	sun: "summer.mp3",
	rain: "rain.mp3",
	snow: "winter.mp3",
};

const model = (() => {
	const playSound = (audio: HTMLAudioElement, weather: Weather) => {
		audio.src = `./assets/sounds/${soundFileNames[weather]}`;
		audio.play();
		audio.loop = true;
	};

	const pauseSound = (audio: HTMLAudioElement) => {
		audio.pause();
	};

	const changeVolume = (audio: HTMLAudioElement, volume: number) => {
		audio.volume = volume / 100;
	};

	return {
		playSound,
		pauseSound,
		changeVolume,
	};
})();

export default model;
