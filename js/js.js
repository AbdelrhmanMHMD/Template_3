Object.defineProperty(String.prototype, "capitalize", {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false,
});

// Usable Functions
function handleActive(ev) {
	ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
		element.classList.remove("active");
	});
	ev.target.classList.add("active");
}
function handleYesNo(btn) {
	btn.classList.toggle("inactive");
	btn.children[0].classList.toggle("inactive");
}
let headerLinks = document.querySelectorAll(".landing-page .header ul li"),
	headerLinksArr = Array.from(headerLinks);

for (let i = 0; i < headerLinks.length; i++) {
	headerLinks[i].addEventListener("click", (e) => {
		handleActive(e);
		localStorage.setItem("active-link", headerLinksArr.indexOf(e.target));
	});
}
// links.forEach(e => {
//     e.addEventListener('click', (ev) => {
//         document.querySelectorAll('.landing-page .active').forEach(ele => {
//             ele.classList.remove('active')
//         })
//         ev.target.classList.add('active')
//         localStorage.setItem('active-link',headerLinksArr.indexOf(ev.target))
//     })
// })
if (localStorage.getItem("active-link") !== null) {
	headerLinks[localStorage.getItem("active-link")].classList.add("active");
}

function showSetting(icon) {
	icon.classList.toggle("fa-spin");
	document.querySelector(".setting-box").classList.toggle("open");
}

let colorsIl = document.querySelectorAll(".setting-box .box .color .colors li");
colorsIl.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		localStorage.setItem("color-option", ele.dataset.color);
		document.documentElement.style.setProperty(
			"--main-color",
			ele.dataset.color
		);
		handleActive(e);
	});
});
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
	document.documentElement.style.setProperty("--main-color", mainColor);
	colorsIl.forEach((e) => {
		if (e.dataset.color == mainColor) {
			e.classList.add("active");
		}
	});
} else {
	colorsIl[0].classList.add("active");
}

let landingPage = document.querySelector(".landing-page"),
	backsInterval,
	randomBackOption = true;
function randomBacks() {
	if (randomBackOption == true) {
		backsInterval = setInterval(() => {
			let randomNum = Math.floor(Math.random() * 4) + 1;
			landingPage.style.backgroundImage = `url("images/header-back${randomNum}.jpg")`;
			localStorage.setItem(
				"chosen-bg",
				landingPage.style.backgroundImage
			);
		}, 10000);
	}
}

let backgroundBtn = document.querySelector(
		".setting-box .box .background span .btn"
	),
	backgroundButton = document.querySelector(
		".setting-box .box .background span"
	);

function backChanging() {
	handleYesNo(backgroundButton);
	if (backgroundButton.classList.contains("inactive") == true) {
		randomBackOption = false;
		clearInterval(backsInterval);
		localStorage.setItem("random-backs", randomBackOption);
	} else {
		randomBackOption = true;
		randomBacks();
		localStorage.setItem("random-backs", randomBackOption);
	}
}

let backLocalOption = localStorage.getItem("random-backs");
if (backLocalOption !== null) {
	landingPage.style.backgroundImage = localStorage.getItem("chosen-bg");
	if (backLocalOption == "true") {
		randomBackOption == true;
		randomBacks();
	} else {
		randomBackOption == false;
		clearInterval(backsInterval);
		backgroundBtn.classList.add("inactive");
		backgroundButton.classList.add("inactive");
	}
} else {
	landingPage.style.backgroundImage = 'url("images/header-back1.jpg")';
	randomBacks();
}

window.onscroll = () => {
	let skills = document.querySelector(".skills"),
		skillsOffsetHeight = skills.offsetHeight,
		skillsOffsetTop = skills.offsetTop,
		windowHeight = this.innerHeight,
		windowScrolled = this.pageYOffset;

	if (windowScrolled > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
		let progress = document.querySelectorAll(
			".skills .skill-box .skill-progress span"
		);
		progress.forEach((ele) => {
			ele.style.width = ele.dataset.progress;
		});
	}
};

let images = document.querySelectorAll(".gallary .images-box img");
images.forEach((img) => {
	img.addEventListener("click", (e) => {
		let popupOverlay = document.createElement("div"),
			closeBtn = document.createElement("div"),
			closeBtnIcon = document.createTextNode("X");
		closeBtn.append(closeBtnIcon);
		popupOverlay.append(closeBtn);
		popupOverlay.className = "popup-overlay";
		document.body.append(popupOverlay);

		let popupBox = document.createElement("div"),
			popupImg = document.createElement("img"),
			popupHeading = document.createElement("h2"),
			popupText = document.createTextNode(img.alt);

		closeBtn.className = "close-button";
		popupHeading.className = "popup-header";
		popupHeading.append(popupText);
		popupImg.src = img.src;
		popupBox.className = "popup-box";
		popupBox.append(popupHeading, popupImg);
		document.body.append(popupBox);
		document.addEventListener("click", (ev) => {
			if (ev.target == popupOverlay || ev.target == closeBtn) {
				document.body.removeChild(popupOverlay);
				document.body.removeChild(popupBox);
			}
		});
	});
});

let sections = document.querySelectorAll("section"),
	navBullets = document.querySelector(".nav-bullets");
window.onload = function () {
	sections.forEach((sec) => {
		let bullet = document.createElement("div"),
			toolTip = document.createElement("div"),
			toolTipTxt = document.createTextNode(sec.dataset.name);
		bullet.className = "bullet";
		bullet.dataset.section = `.${sec.classList[0]}`;
		bullet.appendChild(toolTip);
		toolTip.appendChild(toolTipTxt);
		toolTip.className = "tooltip";
		navBullets.append(bullet);
	});
	let bullets = document.querySelectorAll(".nav-bullets .bullet");
	function scrollToSection(elements) {
		elements.forEach((ele) => {
			ele.addEventListener("click", (e) => {
				document
					.querySelector(e.target.dataset.section)
					.scrollIntoView({
						behavior: "smooth",
					});
			});
		});
	}
	scrollToSection(headerLinks);
	scrollToSection(bullets);
};

let bulletButton = document.querySelector(
	".setting-box .box .bullets span.yes-or-no"
);
function showBullets() {
	handleYesNo(bulletButton);
	if (!bulletButton.classList.contains("inactive") == true) {
		navBullets.style.display = "block";
		localStorage.setItem("nav-bullets", true);
	} else {
		navBullets.style.display = "none";
		localStorage.setItem("nav-bullets", false);
	}
}
let bulletsLocalStorage = localStorage.getItem("nav-bullets");
if (bulletsLocalStorage !== null) {
	if (bulletsLocalStorage == `true`) {
		navBullets.style.display = "block";
		bulletButton.classList.remove("inactive");
	} else {
		navBullets.style.display = "none";
		bulletButton.classList.add("inactive");
		bulletButton.children[0].classList.add("inactive");
	}
}
document.querySelector(".setting-box .reset-options").onclick = () => {
	// localStorage.clear();
	localStorage.removeItem("chosen-bg");
	localStorage.removeItem("random-backs");
	localStorage.removeItem("color-option");
	localStorage.removeItem("nav-bullets");
	localStorage.removeItem("active-link");
	window.location.reload();
};

let toggleMenuBtn = document.querySelector(".toggle-links-btn"),
	linksContainer = document.querySelector(".links-container");
toggleMenuBtn.onclick = function (e) {
	e.stopPropagation();
	toggleMenuBtn.classList.toggle("active");
	linksContainer.classList.toggle("open");
};
document.addEventListener("click", function (e) {
	if (e.target != linksContainer) {
		toggleMenuBtn.classList.remove("active");
		linksContainer.classList.remove("open");
	}
});
