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

  const expanded = navMenu.classList.contains(
    "active"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    expanded
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

    if(menuToggle){
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

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

/* ================= COUNTER ANIMATION ================= */

const statNumbers =
document.querySelectorAll(
".stat-number"
);

const getDynamicTarget =
(element) => {

  const source =
  element.dataset.countSource;

  if(source === "projects"){
    const value =
    document.querySelectorAll(
    ".project-card"
    ).length;

    return Number.isFinite(value)
      ? value
      : 0;
  }

  if(source === "skills"){
    const value =
    document.querySelectorAll(
    ".skill-card"
    ).length;

    return Number.isFinite(value)
      ? value
      : 0;
  }

  if(source === "percent"){
    return 100;
  }

  const parsedValue =
  Number.parseInt(
  element.dataset.target || "0",
  10
  );

  return Number.isFinite(parsedValue)
    ? parsedValue
    : 0;
};

const getChartColor =
(value) => {

  if(value < 50){
    return "low";
  }

  if(value >= 50 && value <= 70){
    return "medium";
  }

  return "full";
};

const updateChartHeight =
(card, value) => {

  const bars =
  card.querySelectorAll(
  ".mini-chart span"
  );

  const normalized =
  Math.max(0, Math.min(value, 100));

  const level =
  getChartColor(normalized);

  card.setAttribute(
  "data-current-level",
  level
  );

  bars.forEach(
  (bar, index) => {
    const progress =
    (normalized / 100) * (bars.length - 1);

    const isActive =
    index <= progress;

    bar.style.height =
    isActive ?
    `${(index + 1) * 18}%` :
    "14%";

    bar.style.opacity =
    isActive ? "1" : "0.18";

    bar.classList.remove(
    "low",
    "medium",
    "full"
    );

    bar.classList.add(level);
  });
};

/* ================= TESTIMONIAL FLIP HANDLER ================= */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.testimonial-card');

  cards.forEach(card => {
    // Toggle on click (works for touch)
    card.addEventListener('click', (e) => {
      card.classList.toggle('is-flipped');
    });

    // Keyboard accessibility: Enter or Space toggles flip
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
});

const animateCounter =
(element, targetValue, suffix = "") => {

  const target =
  Number.parseInt(
  targetValue,
  10
  );

  if(!Number.isFinite(target)){
    element.textContent =
    `0${suffix}`;
    return;
  }

  const card =
  element.closest(
  ".stats-card"
  );

  const duration = 1200;
  const start =
  performance.now();

  const updateValue =
  (currentTime) => {

    const elapsed =
    currentTime - start;

    const progress =
    Math.min(elapsed / duration, 1);

    const eased =
    1 - Math.pow(1 - progress, 3);

    const currentValue =
    Math.round(target * eased);

    element.textContent =
    `${currentValue}${suffix}`;

    if(card){
      updateChartHeight(
      card,
      currentValue
      );
    }

    if(progress < 1){
      requestAnimationFrame(updateValue);
    }
    else{
      element.textContent =
      `${target}${suffix}`;

      if(card){
        updateChartHeight(
        card,
        target
        );
      }
    }

  };

  requestAnimationFrame(updateValue);
};

const initializeCounters =
() => {

  if(!statNumbers.length){
    return;
  }

  statNumbers.forEach(
  (number) => {
    const targetValue =
    getDynamicTarget(number);

    number.dataset.target =
    String(targetValue);

    number.dataset.active =
    "false";

    number.textContent = "0";
  });

  document.querySelectorAll(
  ".chart-bar"
  ).forEach(
  (bar, index) => {
    const rawHeight =
    bar.style.getPropertyValue(
    "--h"
    );

    const value =
    Number.parseInt(
    rawHeight,
    10
    );

    if(value < 50){
      bar.dataset.level =
      "low";
    }
    else if(value === 50){
      bar.dataset.level =
      "medium";
    }
    else if(value === 100){
      bar.dataset.level =
      "full";
    }

    bar.style.setProperty(
    "--delay",
    `${index * 100}ms`
    );
  });
};

const triggerCounters =
() => {

  if(!statNumbers.length){
    return;
  }

  const statsSection =
  document.querySelector(
  ".stats-grid"
  );

  if(!statsSection){
    return;
  }

  const rect =
  statsSection.getBoundingClientRect();

  const inView =
  rect.top < window.innerHeight * 0.85 &&
  rect.bottom > 0;

  if(!inView){
    statNumbers.forEach(
    (number) => {
      number.dataset.active =
      "false";

      number.textContent = "0";
    });

    document.querySelectorAll(
    ".stats-card"
    ).forEach(card => {
      card.classList.remove(
      "is-active"
      );

      card.setAttribute(
      "data-current-level",
      "low"
      );

      card.querySelectorAll(
      ".mini-chart span"
      ).forEach(bar => {
        bar.style.height =
        "14%";
        bar.style.opacity =
        "0.18";
      });
    });

    return;
  }

  const cards =
  document.querySelectorAll(
  ".stats-card"
  );

  cards.forEach(
  card => {
    card.classList.add(
    "is-active"
    );
  });

  statNumbers.forEach(
  (number, index) => {
    if(number.dataset.active === "true"){
      return;
    }

    number.dataset.active =
    "true";

    const targetValue =
    getDynamicTarget(number);

    setTimeout(
    () => {
      animateCounter(
      number,
      targetValue,
      number.dataset.suffix || ""
      );
    },
    index * 100
    );
  });
};

if(document.readyState === "loading"){
  document.addEventListener(
  "DOMContentLoaded",
  () => {
    initializeCounters();
    triggerCounters();
  }
  );
} else {
  initializeCounters();
  triggerCounters();
}

window.addEventListener(
"scroll",
triggerCounters
);

window.addEventListener(
"load",
triggerCounters
);

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

