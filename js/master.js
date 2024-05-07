//Reset All Settings
let resetBtn = document.querySelector(".reset");
resetBtn.onclick = () => {
  // Clear Local Storage
  localStorage.clear();

  // Reload The Page
  location.reload();
};
//Global Variable
let colorsList = document.querySelectorAll(".colors-list li");

let backgroundOption = true;

let countToChange;

// Check Color in local storage

let mainColor = window.localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  colorsList.forEach((ele) => {
    if (ele.getAttribute("data-color") === mainColor) {
      // Remove Active Class
      colorsList.forEach((li) => {
        li.classList.remove("active");
      });

      ele.classList.add("active");
    }
  });
}

// Check Background in Local Storage
let randomBackgroundState = window.localStorage.getItem("background_option");
if (randomBackgroundState !== null) {
  if (randomBackgroundState == "true") {
    document.querySelector(".adjuster .yes").classList.add("active");

    randomizeImgs();
  } else {
    document.querySelector(".adjuster .no").classList.add("active");
  }

  // Remove Active Class From Span
  document
    .querySelectorAll(".adjuster .active")
    .forEach((ele) => ele.classList.remove("active"));

  // Add Active Class to Span
  if (randomBackgroundState === "true") {
    document.querySelector(".adjuster .yes").classList.add("active");
  } else {
    document.querySelector(".adjuster .no").classList.add("active");
  }
}

// onclick on cogs event

let cogs = document.querySelector(".settings .fa-gear");

let settings = document.querySelector(".settings");

cogs.addEventListener("click", function () {
  this.classList.toggle("fa-spin");

  settings.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  // console.log("e.target", e.target);
  // console.log(settings, "contains", "?", e.target, settings.contains(e.target));

  if (!settings.contains(e.target) && settings.matches(".open")) {
    cogs.click();
  }
});
// changing background image

let landingPage = document.querySelector(".landing-page");

let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

// change background image url

function randomizeImgs() {
  if (backgroundOption === true) {
    countToChange = setInterval(() => {
      // get random element from the array
      let random = images[Math.floor(Math.random() * images.length)];

      landingPage.style.backgroundImage = `url(imgs/${random})`; // this script is running in index.html page any url you set will be relative to the index.html page (the page which the script runs onto it)
    }, 5000);
  }
}

// Switch Colors

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Add Class Active Remove Active Class
    handleActive(e);

    // Change Color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
  });
});

// Start And Stop Random BackGround Change

let randomBackgroundEle = document.querySelectorAll(".adjuster span");

randomBackgroundEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Add Active Class && Remove Active Class
    handleActive(e);

    // Stop And Start Change
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      // Add To Local Storage

      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(countToChange);

      // Add To Local Storage
      window.localStorage.setItem("background_option", false);
    }
  });
});

// open Drop Down Menu

let barsIcon = document.querySelector(".fa-bars-staggered");

let headerLinks = document.querySelector(".links");

let exitBtn = document.querySelector(".fa-circle-xmark");

barsIcon.addEventListener("click", (e) => {
  headerLinks.classList.toggle("opend");

  // headerLinks.style.cssText = "top : 110%; opacity: 1;";
});

exitBtn.addEventListener("click", (e) => {
  headerLinks.classList.toggle("opend");
  // Remove this line of code 120 + remove pages folder

  // location.assign("pages/test.html"); // i don't need to say ./pages/test.html because im changing the url only
});

document.addEventListener("click", (e) => {
  if (e.target !== barsIcon && e.target !== headerLinks) {
    // Check Menu Is Open Or Not

    if (headerLinks.classList.contains("opend")) {
      headerLinks.classList.toggle("opend");
    }
  }
});

// skills progress

let skillsSection = document.querySelector(".skills");

let skillsProgress = document.querySelectorAll(".skill-progress span");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = skillsSection.offsetTop;

  // OuterHeight
  let skillsOuterHeight = skillsSection.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.scrollY;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    skillsProgress.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }

  let imagesBox = document.querySelector(".images-box");

  // Imgs Offset Top
  let imgsOffsetTop = imagesBox.offsetTop;

  // OuterHeight
  let imgsOuterHeight = imagesBox.offsetHeight;

  if (windowScrollTop >= imgsOffsetTop + imgsOuterHeight - windowHeight) {
    imagesBox.style.cssText = "transform: scale(1)";
  }
};
// gallary Section

// transform: translateX(-200%);
let allImages = document.querySelectorAll(".images-box img");

// on click make overlay
allImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay div
    let overlay = document.createElement("div");

    overlay.classList.add("pop-up-overlay");

    document.body.appendChild(overlay);

    // create pop-up
    let imgPopUp = document.createElement("div");

    imgPopUp.classList.add("img-pop-up");

    document.body.appendChild(imgPopUp);

    if (img.alt !== null) {
      // Create img title
      let imgTitle = document.createElement("h2");

      let imgTitleText = document.createTextNode(img.alt);

      imgTitle.appendChild(imgTitleText);

      imgPopUp.appendChild(imgTitle);
    }
    // Create popUP Img
    let popUpImg = document.createElement("img");

    popUpImg.src = img.src;

    imgPopUp.appendChild(popUpImg);

    // Create Close Btn
    let closeBtn = document.createElement("i");

    closeBtn.classList.add("close-btn");

    closeBtn.innerHTML = "X";

    imgPopUp.appendChild(closeBtn);

    // Remove pop-Up
    document.addEventListener("click", (e) => {
      if (e.target.className == "close-btn") {
        // Remove popUp
        imgPopUp.remove();

        // Remove Overlay
        overlay.remove();
      }
    });
  });
});
// NavBullets Counter
let navBullets = document.querySelector(".nav-bullets");

// Show Bullets And Hide
let settingsOptions = document.querySelectorAll(
  ".settings-option .handle span"
);

let bulletsLocalItem = window.localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
  settingsOptions.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "flex") {
    navBullets.style.display = "flex";

    document
      .querySelector(".settings-option .handle .yes")
      .classList.add("active");
  } else {
    navBullets.style.display = "none";

    document
      .querySelector(".settings-option .handle .no")
      .classList.add("active");
  }
}

settingsOptions.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Add And Remove Active

    handleActive(e);

    // Hide Bullets

    if (e.target.dataset.show == "no") {
      navBullets.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    } else {
      navBullets.style.display = "flex";

      localStorage.setItem("bullets_option", "flex");
    }
  });
});

let allHeaderLinks = document.querySelectorAll(".links a");

// Create Section bullets
createSectionWithToolTip();
//
//
//
//
//
//
//
//
//
// Functions

let allBullets = document.querySelectorAll(".bullet");

// Scroll To Section Function
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allHeaderLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active class from all childerns

  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Active Class On Self
  ev.target.classList.add("active");
}

// Create Section Bullets and toolTip
function createSectionWithToolTip() {
  for (let i = 0; i < allHeaderLinks.length; i++) {
    // Create Bullet Div
    let bullet = document.createElement("div");

    bullet.classList.add("bullet");
    // console.log(allHeaderLinks[i].getAttribute("data-section"));
    // Add Data-Section Attr

    bullet.setAttribute(
      "data-section",
      allHeaderLinks[i].getAttribute("data-section")
    );

    //Create ToolTip

    let toolTip = document.createElement("div");

    toolTip.classList.add("tool-tip");

    toolTip.innerHTML = allHeaderLinks[i].textContent;

    bullet.appendChild(toolTip);

    // Append All to Nav Bullets
    navBullets.appendChild(bullet);
  }
}
