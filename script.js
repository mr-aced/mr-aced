/* ================= MOBILE MENU ================= */

const menuToggle =
document.getElementById(
"menu-toggle"
);

const navMenu =
document.getElementById(
"nav-menu"
);

menuToggle.addEventListener(
"click",
() => {

  navMenu.classList.toggle(
  "active"
  );

}
);

/* CLOSE MENU WHEN CLICKED */

document
.querySelectorAll(
".nav-links a"
)
.forEach(link => {

  link.addEventListener(
  "click",
  () => {

    navMenu.classList.remove(
    "active"
    );

  });

});

/* ================= TYPING EFFECT ================= */

const roles = [

"Data Scientist",

"Machine Learning Enthusiast",

"Data Analyst",

"Researcher"

];

let roleIndex = 0;
let charIndex = 0;

const typing =
document.getElementById(
"typing"
);

function typeText(){

  if(
  charIndex <
  roles[roleIndex].length
  ){

    typing.textContent +=
    roles[roleIndex]
    .charAt(charIndex);

    charIndex++;

    setTimeout(
    typeText,
    90
    );

  }

  else{

    setTimeout(
    eraseText,
    1500
    );

  }
}

function eraseText(){

  if(
  charIndex > 0
  ){

    typing.textContent =
    roles[
    roleIndex
    ].substring(
      0,
      charIndex - 1
    );

    charIndex--;

    setTimeout(
    eraseText,
    50
    );

  }

  else{

    roleIndex++;

    if(
    roleIndex >=
    roles.length
    ){

      roleIndex = 0;
    }

    setTimeout(
    typeText,
    400
    );

  }
}

document.addEventListener(
"DOMContentLoaded",
() => {

  if(roles.length){
    setTimeout(
    typeText,
    500
    );
  }

});

/* ================= SCROLL REVEAL ================= */

const sections =
document.querySelectorAll(
".floating-section"
);

const revealSection =
() => {

  sections.forEach(
  section => {

    const sectionTop =
    section
    .getBoundingClientRect()
    .top;

    const triggerPoint =
    window.innerHeight
    - 100;

    if(
    sectionTop <
    triggerPoint
    ){

      section.classList.add(
      "show"
      );

    }

  });

};

window.addEventListener(
"scroll",
revealSection
);

revealSection();

/* ================= SMOOTH SCROLL ================= */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor => {

  anchor.addEventListener(
  "click",
  function(e){

    e.preventDefault();

    const target =
    document.querySelector(
    this.getAttribute(
    "href"
    )
    );

    if(target){

      target.scrollIntoView({

        behavior:
        "smooth"

      });

    }

  });

});

/* ================= ACTIVE NAV ================= */

const navLinks =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
() => {

  let current =
  "";

  document
  .querySelectorAll(
  "section"
  )
  .forEach(section => {

    const sectionTop =
    section.offsetTop;

    if(
    pageYOffset >=
    sectionTop - 150
    ){

      current =
      section.getAttribute(
      "id"
      );

    }

  });

  navLinks.forEach(
  link => {

    link.classList.remove(
    "active"
    );

    if(
    link.getAttribute(
    "href"
    ) ===
    `#${current}`
    ){

      link.classList.add(
      "active"
      );

    }

  });

});

/* ================= GALLERY CAROUSEL ================= */

const gallerySlides =
document.querySelectorAll(
".gallery-slide"
);

const nextGallery =
document.querySelector(
".next-gallery"
);

const prevGallery =
document.querySelector(
".prev-gallery"
);

let galleryIndex = 0;

function showGallery(index){

  gallerySlides.forEach(
  slide =>
  slide.classList.remove(
  "active-gallery"
  )
  );

  gallerySlides[index]
  .classList.add(
  "active-gallery"
  );
}

if(nextGallery && prevGallery){

  nextGallery.addEventListener(
  "click",
  () => {

    galleryIndex++;

    if(
    galleryIndex >=
    gallerySlides.length
    ){
      galleryIndex = 0;
    }

    showGallery(
    galleryIndex
    );

  });

  prevGallery.addEventListener(
  "click",
  () => {

    galleryIndex--;

    if(
    galleryIndex < 0
    ){
      galleryIndex =
      gallerySlides.length - 1;
    }

    showGallery(
    galleryIndex
    );

  });

}

/* ================= PROJECT COUNTER ================= */

function animateCounter(id, target, duration = 1200) {

  const element = document.getElementById(id);

  if (!element) return;

  let start = 0;
  let startTime = null;

  function updateCounter(currentTime) {

    if (!startTime) startTime = currentTime;

    const progress = currentTime - startTime;

    const value = Math.min(
      Math.floor((progress / duration) * target),
      target
    );

    element.innerText = value + "+";

    if (progress < duration) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

window.addEventListener("load", () => {

  const projects =
  document.querySelectorAll(".project-card").length;

  animateCounter("project-count", projects);

});