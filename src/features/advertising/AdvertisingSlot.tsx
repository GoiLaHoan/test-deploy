import PropTypes from "prop-types";
import React, { useEffect, useRef, useContext, useState } from "react";
import AdvertisingContext from "./AdvertisingContext";

interface LazyLoad {
  marginPercent: number;
  mobileScaling: number;
}

interface Slot {
  id: string;
  path: string;
  enableLazyLoad?: boolean | LazyLoad | null;
}

interface Config {
  path?: string;
  sizeMappings?: Record<string, unknown>;
  globalFailSafeTimeout?: number;
  enableLazyLoad?: boolean | LazyLoad;
  prebid?: Record<string, unknown>;
  targeting?: Record<string, unknown>;
  slots?: Slot[];
  interstitialSlot?: Record<string, unknown>;
}

// Mobile device detection, based on MDN solution:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
function isMobileDevice() {
  const touchPointsExist: boolean = "maxTouchPoints" in navigator;
  const msMaxTouchPoints: boolean = "msMaxTouchPoints" in navigator;

  if (touchPointsExist) {
    return navigator.maxTouchPoints > 0;
  }
  if (msMaxTouchPoints) {
    // navigator lib dom expressions dont have this msMaxTouchPoints anymore
    // TODO: investigate why msMaxTouchPoints
    const nav = navigator as unknown as any;
    return nav.msMaxTouchPoints > 0;
  }
  const mQ =
    typeof window !== "undefined" && window?.matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    return !!mQ.matches;
  }
  if ("orientation" in window) {
    return true; // deprecated, but good fallback
  }
  // Only as a last resort, fall back to user agent sniffing
  const UA: string | null = navigator.userAgent;
  return (
    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
  );
}

function calculateRootMargin(lazyConfig: boolean | LazyLoad) {
  if (typeof lazyConfig === "boolean") {
    return undefined;
  }
  const finalMarginPercent =
    isMobileDevice() &&
    lazyConfig.mobileScaling !== undefined &&
    lazyConfig.mobileScaling !== -1
      ? lazyConfig.marginPercent * lazyConfig.mobileScaling
      : lazyConfig.marginPercent;
  return `${(finalMarginPercent / 100) * window.innerHeight}px`;
}

function isLazyLoading(lazyLoadConfig: boolean | LazyLoad) {
  if (typeof lazyLoadConfig === "boolean") {
    return lazyLoadConfig;
  }

  if (!lazyLoadConfig) {
    return false;
  }

  const { marginPercent = 0 } = lazyLoadConfig;

  if (marginPercent === 0) {
    return true;
  }

  return marginPercent > -1;
}

function getLazyLoadConfig(config: Config, id: string) {
  if (!config?.slots) {
    return false;
  }
  const slotConfig = config.slots.find((slot) => slot.id === id);
  if (!slotConfig) {
    return false;
  }
  if (
    slotConfig.enableLazyLoad !== undefined &&
    slotConfig.enableLazyLoad !== null
  ) {
    if (typeof slotConfig.enableLazyLoad === "boolean") {
      return slotConfig.enableLazyLoad;
    } else {
      return slotConfig.enableLazyLoad;
    }
  }
  return config?.enableLazyLoad === undefined ? false : config?.enableLazyLoad;
}

interface AdvertisingSlotConfig {
  id: string;
  children: any;
  className: string;
  customEventHandlers?: any;
  viewportsEnabled: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

function AdvertisingSlot({
  id,
  children,
  className,
  customEventHandlers,
  viewportsEnabled,
}: AdvertisingSlotConfig) {
  const observerRef = useRef<IntersectionObserver>();
  const containerDivRef = useRef<null | HTMLDivElement>(null);
  const { activate, config } = useContext(AdvertisingContext);
  const lazyLoadConfig = getLazyLoadConfig(config, id);
  const isLazyLoadEnabled = isLazyLoading(lazyLoadConfig);
  const [shouldRender, setRender] = useState(false);
  // const isAdhesion = id === "footer";

  useEffect(() => {
    if (!config || !isLazyLoadEnabled) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const rootMargin = calculateRootMargin(lazyLoadConfig);
    observerRef.current = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          activate(id, customEventHandlers);
          if (containerDivRef.current !== null) {
            observerRef.current?.unobserve(containerDivRef.current);
          }
        }
      },
      { rootMargin },
    );
    if (containerDivRef.current !== null) {
      observerRef.current?.observe(containerDivRef.current);
    }
    return () => {
      if (containerDivRef.current !== null) {
        observerRef.current?.unobserve(containerDivRef.current);
      }
    };
  }, [config]);

  useEffect(() => {
    if (!config || isLazyLoadEnabled) {
      return;
    }
    activate(id, customEventHandlers);
  }, [config]);

  useEffect(() => {
    const windowWidth: number = window.innerWidth;
    const viewports = {
      desktop: 1025,
      tablet: 728,
      mobile: 0,
    };
    let currentViewport;

    if (windowWidth >= viewports.desktop) {
      currentViewport = "desktop";
    } else if (windowWidth >= viewports.tablet) {
      currentViewport = "tablet";
    } else {
      currentViewport = "mobile";
    }

    if (viewportsEnabled[currentViewport] === currentViewport) {
      setRender(true);
    }
  });

  return (
    <div id={id} ref={containerDivRef} className={className}>
      {shouldRender && [children]}
    </div>
  );
}

AdvertisingSlot.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  customEventHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  viewportsEnabled: PropTypes.shape({
    desktop: PropTypes.bool,
    tablet: PropTypes.bool,
    mobile: PropTypes.bool,
  }).isRequired,
};

AdvertisingSlot.defaultProps = {
  customEventHandlers: {},
};

export default AdvertisingSlot;
