"use client"
import { useEffect, useRef, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';


export const Animation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        // loop: true,
        
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: '/test.json',
      });
      animation.setSpeed(0.6);
      animation.resize()

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <>
    <div className='h-[300px]' ref={ref} />
    </>
  );
};