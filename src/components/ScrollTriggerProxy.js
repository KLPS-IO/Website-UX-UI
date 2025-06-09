import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollTriggerProxy = () => {
  // Get the locomotive scroll instance
  const { scroll } = useLocomotiveScroll();

  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (scroll) {
      const element = scroll.el; // Locomotive's scrolling element (e.g., the container)

      // Sync ScrollTrigger updates with Locomotive scroll
      scroll.on("scroll", ScrollTrigger.update);

      // Set up scroller proxy for Locomotive
      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: element.style.transform ? "transform" : "fixed",
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }

    // Cleanup on unmount
    return () => {
      // Remove the scroll listener
      if (scroll) scroll.off("scroll", ScrollTrigger.update);

      // Kill all ScrollTrigger instances to avoid memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Optionally refresh ScrollTrigger (not usually needed in cleanup)
      ScrollTrigger.refresh();
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;
