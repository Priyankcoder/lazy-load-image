import { useEffect } from "react";

function throttle(fn, time) {
  let flag = true;
  return function (...args) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, time);
      return fn.apply(this, args);
    }
  };
}

export default function LazyLoadHook() {
  const isAboutToBeInViewport = (imageElement, differenceWhenToCalculate) => {
    const { top } = imageElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (viewportHeight + differenceWhenToCalculate >= top) {
      return true;
    }
    return false;
  };

  const lazyLoadImage = () => {
    const targetImages = document.querySelectorAll(".lazy-load");
    for (let image of targetImages) {
      if (
        image.src === "https://xxtxwl.csb.app/" &&
        isAboutToBeInViewport(image, 100)
      ) {
        //make image dynamic
        image.src = image.getAttribute("data-src");
      }
    }
  };

  useEffect(() => {
    const throttleLazyLoadImage = throttle(lazyLoadImage, 200);
    //To load the images in viewport
    throttleLazyLoadImage();
    //To load the images that will come in viewport after scrolling
    window.addEventListener("scroll", throttleLazyLoadImage);
    return () => window.removeEventListener("scroll", throttleLazyLoadImage);
  }, []);

  return null;
}

export const Image = ({ src, alt = "" }) => {
  return <img src="" data-src={src} className="lazy-load" alt={alt} />;
};
