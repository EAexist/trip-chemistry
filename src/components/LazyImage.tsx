import { PropsWithChildren, useEffect, useRef, useState } from "react";

/* https://dev.to/kunalukey/make-your-own-lazy-loading-image-component-in-react-2j7m
 * Kunal Ukey. 2022.11.21. Make Your Own Lazy Loading Image Component In React. DEV Community.
*/

interface LazyImageProps{
    src: string;
    alt: string;
    className?: string;
    placeholderSrc?: string;
    placeholderClassName?: string;
} 

function LazyImageP ({ placeholderSrc, placeholderClassName, src, alt, className }: LazyImageProps) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState("");
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      // Set actual image source && unobserve when intersecting
      if (entries[0].isIntersecting) {
        setView(src);
        if(placeholderRef.current){
          observer.unobserve(placeholderRef.current);
        }
      }
    });

    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);

  return (
    <>
      {!isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className={placeholderClassName}
          ref={placeholderRef}
        />
      )}
      <img
        src={view} // Gets src only when placeholder intersecting
        className={isLoaded ? 'hidden' : className}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

function LazyImage ({ src, alt, className, children }: PropsWithChildren<LazyImageProps>) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState("");
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      // Set actual image source && unobserve when intersecting
      if (entries[0].isIntersecting) {
        setView(src);
        if(placeholderRef.current){
          observer.unobserve(placeholderRef.current);
        }
      }
    });

    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);

  return (
    <>
      <div className='absolute w-full h-full' ref={placeholderRef}>{!isLoaded && children}</div>      
      <img
        src={view} // Gets src only when placeholder intersecting
        className={isLoaded ? className : 'hidden'}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

export default LazyImage;