const resumePopover = document.querySelector("#resume-popover");
const resumeButtons = document.querySelectorAll(".resume-trigger, [data-open-resume]");
const resumeTrigger = document.querySelector(".resume-trigger");
const resumeClose = document.querySelector(".resume-close");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

function setResume(open) {
  resumePopover.classList.toggle("is-open", open);
  resumePopover.setAttribute("aria-hidden", String(!open));
  resumeTrigger.setAttribute("aria-expanded", String(open));
}

resumeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setResume(!resumePopover.classList.contains("is-open"));
  });
});

resumeClose.addEventListener("click", () => setResume(false));

document.addEventListener("click", (event) => {
  const clickedInsideResume = resumePopover.contains(event.target);
  const clickedTrigger = [...resumeButtons].some((button) => button.contains(event.target));
  if (!clickedInsideResume && !clickedTrigger) {
    setResume(false);
  }
});

document.querySelectorAll(".portfolio-grid img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setResume(false);
    closeLightbox();
  }
});
