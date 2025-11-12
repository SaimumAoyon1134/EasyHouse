import { gsap } from "gsap";

export const startTextAnimation = () => {
  const text = document.getElementById("profileTitle");
  if (!text) return;

  gsap.fromTo(
    text,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }
  );
};
