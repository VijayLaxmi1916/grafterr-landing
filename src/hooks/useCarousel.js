import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const getItemsPerView = (config) => {
  if (typeof window === 'undefined') return config.desktop ?? 3;
  const width = window.innerWidth;
  if (width < 768) return config.mobile ?? 1;
  if (width < 1024) return config.tablet ?? 2;
  return config.desktop ?? 3;
};

export default function useCarousel(totalItems, itemsPerViewConfig = { mobile: 1, tablet: 2, desktop: 3 }) {
  const [itemsPerView, setItemsPerView] = useState(() => getItemsPerView(itemsPerViewConfig));
  const [index, setIndex] = useState(0);

  const maxIndex = useMemo(
    () => Math.max(0, totalItems - itemsPerView),
    [totalItems, itemsPerView]
  );

  useEffect(() => {
    const handleResize = () => {
      const next = getItemsPerView(itemsPerViewConfig);
      setItemsPerView((current) => (current === next ? current : next));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerViewConfig]);

  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(0, totalItems - itemsPerView)));
  }, [totalItems, itemsPerView]);

  const next = useCallback(() => {
    setIndex((current) => Math.min(current + 1, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  const goTo = useCallback(
    (target) => {
      setIndex(() => Math.max(0, Math.min(target, maxIndex)));
    },
    [maxIndex]
  );

  const touchRef = useRef({ startX: 0, active: false });

  const onTouchStart = useCallback((event) => {
    touchRef.current = { startX: event.touches[0].clientX, active: true };
  }, []);

  const onTouchEnd = useCallback(
    (event) => {
      if (!touchRef.current.active) return;
      const deltaX = event.changedTouches[0].clientX - touchRef.current.startX;
      touchRef.current.active = false;
      const threshold = 50;
      if (deltaX > threshold) prev();
      else if (deltaX < -threshold) next();
    },
    [next, prev]
  );

  return {
    index,
    itemsPerView,
    maxIndex,
    isStart: index === 0,
    isEnd: index >= maxIndex,
    next,
    prev,
    goTo,
    touchHandlers: { onTouchStart, onTouchEnd },
  };
}
