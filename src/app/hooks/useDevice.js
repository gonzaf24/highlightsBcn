import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import responsiveConfig from '../../styles/responsive';

const useDevice = () => {
  const { width } = useWindowSize();
  const [isSmallMobile, setIsSmallMobile] = useState(undefined);
  const [isBigMobile, setIsBigMobile] = useState(undefined);
  const [isMobile, setIsMobile] = useState(undefined);
  const [isSmallTablet, setIsSmallTablet] = useState(undefined);
  const [isBigTablet, setIsBigTablet] = useState(undefined);
  const [isTablet, setIsTablet] = useState(undefined);
  const [isSmallDesktop, setIsSmallDesktop] = useState(undefined);
  const [isBigDesktop, setIsBigDesktop] = useState(undefined);
  const [isDesktop, setIsDesktop] = useState(undefined);
  const { BREAKPOINTS_DEVICES } = responsiveConfig;

  useEffect(() => {
    setIsSmallMobile(width <= BREAKPOINTS_DEVICES.SMALL_MOBILE);
    setIsBigMobile(width > BREAKPOINTS_DEVICES.SMALL_MOBILE && width <= BREAKPOINTS_DEVICES.MOBILE);
    setIsMobile(width <= BREAKPOINTS_DEVICES.MOBILE);
    setIsSmallTablet(width > BREAKPOINTS_DEVICES.MOBILE && width <= BREAKPOINTS_DEVICES.SMALL_TABLET);
    setIsBigTablet(width > BREAKPOINTS_DEVICES.SMALL_TABLET && width <= BREAKPOINTS_DEVICES.TABLET);
    setIsTablet(width > BREAKPOINTS_DEVICES.MOBILE && width <= BREAKPOINTS_DEVICES.TABLET);
    setIsSmallDesktop(width > BREAKPOINTS_DEVICES.TABLET && width <= BREAKPOINTS_DEVICES.BIG_DESKTOP);
    setIsBigDesktop(width > BREAKPOINTS_DEVICES.BIG_DESKTOP);
    setIsDesktop(width > BREAKPOINTS_DEVICES.TABLET);
  }, [BREAKPOINTS_DEVICES.BIG_DESKTOP,
    BREAKPOINTS_DEVICES.MOBILE,
    BREAKPOINTS_DEVICES.SMALL_MOBILE,
    BREAKPOINTS_DEVICES.SMALL_TABLET,
    BREAKPOINTS_DEVICES.TABLET,
    width]);

  return {
    isSmallMobile,
    isBigMobile,
    isMobile,
    isSmallTablet,
    isBigTablet,
    isTablet,
    isSmallDesktop,
    isBigDesktop,
    isDesktop,
  };
};

export default useDevice;
