import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setIsMobile(mobile);
  }, []);

  return isMobile;
}
