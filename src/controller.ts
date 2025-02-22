import "./styles/index.scss";
import view from "./view";
import model from "./model";
import { Weather } from "./models";

type CurrentSound = {
	weather: Weather | null;
	isPlaying: boolean;
};

const controller = () => {
	view.changeBackground("sun");
	const root = document.getElementById("app");

	view.renderTitle(root);
	const buttons = view.renderButtons(root);
	const volumeSlider = view.renderVolumeSlider(root);
	const audio = new Audio();
	let currentWeather: CurrentSound = {
		weather: null,
		isPlaying: false,
	};

	const handleButtonClick = (e: Event) => {
		const button = (e.target as HTMLElement).closest("button");

		if (button) {
			const selectedWeather = button.name as Weather;

			if (selectedWeather === currentWeather.weather) {
				currentWeather.isPlaying = !currentWeather.isPlaying;
			} else {
				currentWeather.isPlaying = true;
			}

			if (currentWeather.isPlaying) {
				model.playSound(audio, selectedWeather);
				view.changeIcon(button, true, buttons);
			} else {
				model.pauseSound(audio);
				view.changeIcon(button, false, buttons);
			}

			view.changeBackground(selectedWeather);
			currentWeather.weather = selectedWeather;
		}
	};

	const handleVolumeChange = (e: InputEvent) => {
		const volume = Number((e.target as HTMLInputElement).value);

		model.changeVolume(audio, volume);
	};

	volumeSlider.addEventListener("change", handleVolumeChange);
	buttons.addEventListener("click", handleButtonClick);
};

export default controller;
