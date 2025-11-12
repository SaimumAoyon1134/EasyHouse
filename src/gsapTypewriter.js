import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export const typewriterEffect = (selector, delay = 0) => {
  const el = document.querySelector(selector);
  if (!el) return;

  const text = el.textContent;
  el.textContent = ""; // start empty

  gsap.to(el, {
    duration: text.length * 0.07, // typing speed
    text: text,
    ease: "none",
    delay: delay,
  });
};
