import { Weather } from "./models";

const buttonsData = [
	{
		id: "sunny-weather-button",
		btn_name: "sun",
		icon_src: "./assets/icons/sun.svg",
		icon_alt: "sun-icon",
		bg_src: "./assets/backgrounds/summer-bg.jpg",
	},
	{
		id: "rainy-weather-button",
		btn_name: "rain",
		icon_src: "./assets/icons/cloud-rain.svg",
		icon_alt: "cloud-rain-icon",
		bg_src: "./assets/backgrounds/rainy-bg.jpg",
	},
	{
		id: "snowy-weather-button",
		btn_name: "snow",
		icon_src: "./assets/icons/cloud-snow.svg",
		icon_alt: "cloud-snow-icon",
		bg_src: "./assets/backgrounds/winter-bg.jpg",
	},
];

const backgroundFileNames = {
	sun: "summer-bg.jpg",
	rain: "rainy-bg.jpg",
	snow: "winter-bg.jpg",
};

const view = (() => {
	const renderVolumeSlider = (parent: HTMLElement) => {
		const container = document.createElement("div");
		container.className = "volume-slider-container";

		const input = document.createElement("input");
		input.type = "range";
		input.id = "volume-slider";
		input.name = "volume";
		input.min = "0";
		input.max = "100";

		container.appendChild(input);
		parent.appendChild(container);

		return input;
	};

	const renderButtons = (parent: HTMLElement) => {
		const container = document.createElement("div");
		container.className = "buttons-container";

		buttonsData.forEach((item) => {
			const wrapper = document.createElement("div");
			wrapper.className = "button-wrapper";

			const button = document.createElement("button");
			button.className = "button";
			button.id = item.id;
			button.name = item.btn_name;
			button.style.backgroundImage = `url(${item.bg_src})`;
			button.style.backgroundSize = "cover";
			button.style.backgroundRepeat = "no-repeat";
			button.style.backgroundPosition = "center";
			button.style.backgroundSize = "200%";
			button.innerHTML = `<img src="${item.icon_src}" alt="${item.icon_alt}">`;

			wrapper.appendChild(button);
			container.appendChild(wrapper);
		});

		parent.appendChild(container);
		return container;
	};

	const renderTitle = (parent: HTMLElement) => {
		const title = document.createElement("h1");
		title.className = "title";
		title.textContent = "Weather Sounds";
		parent.appendChild(title);
	};

	const changeBackground = (weather: Weather) => {
		const body = document.querySelector("body");
		body.style.backgroundImage = `url('./assets/backgrounds/${backgroundFileNames[weather]}')`;
		body.style.backgroundSize = "cover";
		body.style.backgroundRepeat = "no-repeat";
		body.style.backgroundPosition = "center";
		body.style.backgroundSize = "150%";
	};

	const changeIcon = (
		element: HTMLButtonElement,
		isPaused: boolean,
		buttonsContainer: HTMLElement
	) => {
		buttonsContainer.querySelectorAll("button").forEach((item) => {
			const icon = item.querySelector("img");
			const info = buttonsData.find((el) => el.id === item.id);

			icon.src = info.icon_src;
			icon.alt = info.icon_alt;
		});

		const icon = element.querySelector("img");

		if (isPaused) {
			icon.src = "./assets/icons/pause.svg";
			icon.alt = "pause-icon";
		}
	};

	return {
		changeIcon,
		renderTitle,
		renderButtons,
		changeBackground,
		renderVolumeSlider,
	};
})();

export default view;
