import { useMedia } from "use-media";
const useScreenSize = (): {
  isDesktopExtraLarge: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
} => {
  const isDesktopExtraLarge = useMedia({ minWidth: "1280px" });

  // kitco doesnt follow screen size standards
  const isDesktop = useMedia({ minWidth: "1240px" });
  // const isDesktop = useMedia({ minWidth: '1024px' })

  const isTablet = useMedia({ minWidth: "768px", maxWidth: "1240px" });

  const isMobile = useMedia({ maxWidth: "768px" });

  return { isDesktopExtraLarge, isDesktop, isMobile, isTablet };
};

export default useScreenSize;
