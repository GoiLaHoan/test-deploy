// function returnCorrectSlots() {
//     if (typeof window === 'undefined') {
//         return;
//     }
//
//     const viewportWidth =
//         window.innerWidth || document.documentElement.clientWidth;
//     let units = [];
//
//     if (viewportWidth > 1024) {
//         units = desktopAdSlots;
//     } else if (viewportWidth >= 768) {
//         units = tabletAdSlots;
//     } else {
//         units = mobileAdSlots;
//     }
//
//     return units;
// }

const sizeDefaults = {
  skyscraper: [[160, 600]],
  rectangle: [[300, 250]],
  mediumRectangle: [
    [300, 250],
    [300, 600],
  ],
  largeRectangle: [
    [300, 250],
    [300, 600],
    [300, 1050],
  ],
  leaderboard: [
    [728, 90],
    [320, 100],
    [320, 50],
    [300, 50],
  ],
  native: ["fluid"],
  footer: [
    [728, 90],
    [320, 100],
    [300, 50],
  ],
  banner: [
    [300, 250],
    [320, 50],
    [300, 50],
    [320, 100],
    [728, 90],
  ],
  inContent: [
    [300, 250],
    [336, 280],
  ],
  interstitial: [
    [300, 250],
    [320, 480],
    [336, 280],
  ],
  video: [
    [1, 1],
    [300, 250],
  ],
};

const viewports = {
  mobile: [0, 0],
  tablet: [768, 60],
  desktop: [1025, 250],
};

export const adConfig = {
  enableLazyLoad: true,
  sizeMappings: {
    leaderboard: [
      {
        viewPortSize: viewports.mobile,
        sizes: [
          [320, 50],
          [320, 100],
        ],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[728, 90]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [[728, 90]],
      },
    ],
    leftRail1: [
      {
        viewPortSize: viewports.mobile,
        sizes: [],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[160, 600]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [
          [300, 250],
          [300, 600],
        ],
      },
    ],
    rightRail: [
      {
        viewPortSize: viewports.mobile,
        sizes: [[300, 250]],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[300, 250]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [[300, 250]],
      },
    ],
    banner: [
      {
        viewPortSize: viewports.mobile,
        sizes: [[300, 250]],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[728, 90]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [[728, 90]],
      },
    ],
    bannerRectangle: [
      {
        viewPortSize: viewports.mobile,
        sizes: [[300, 250]],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[728, 90]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [[300, 250]],
      },
    ],
    footer: [
      {
        viewPortSize: viewports.mobile,
        sizes: [
          [320, 100],
          [320, 50],
          [300, 50],
        ],
      },
      {
        viewPortSize: viewports.tablet,
        sizes: [[728, 90]],
      },
      {
        viewPortSize: viewports.desktop,
        sizes: [],
      },
    ],
  },
  slots: [
    {
      path: "/21841313772,22554256/kitco/leaderboard",
      id: "leaderboard",
      sizes: sizeDefaults.leaderboard,
      sizeMappingName: "leaderboard",
      prebid: [],
    },
    {
      path: "/21841313772,22554256/kitco/mid_banner_one",
      id: "banner-1",
      sizes: sizeDefaults.banner,
      sizeMappingName: "bannerRectangle",
    },
    {
      path: "/21841313772,22554256/kitco/mid_banner_two",
      id: "banner-2",
      sizes: sizeDefaults.banner,
      sizeMappingName: "banner",
    },
    {
      path: "/21841313772,22554256/kitco/mid_banner_three",
      id: "banner-3",
      sizes: sizeDefaults.banner,
      sizeMappingName: "banner",
    },
    {
      path: "/21841313772,22554256/kitco/mid_banner_four",
      id: "banner-4",
      sizes: sizeDefaults.banner,
      sizeMappingName: "banner",
    },
    {
      path: "/21841313772,22554256/kitco/right_rail_one",
      id: "right-rail-1",
      sizes: sizeDefaults.rectangle,
    },
    {
      path: "/21841313772,22554256/kitco/right_rail_two",
      id: "right-rail-2",
      sizes: sizeDefaults.rectangle,
    },
    {
      path: "/21841313772,22554256/kitco/right_rail_large",
      id: "right-rail-lg",
      sizes: sizeDefaults.mediumRectangle,
    },
    {
      path: "/21841313772,22554256/kitco/oop",
      id: "oop",
      sizes: sizeDefaults.video,
    },
    {
      path: "/21841313772,22554256/kitco/native_news_1",
      id: "news-native",
      sizes: sizeDefaults.native,
    },
    // {
    //   path: '/21841313772,22554256/kitco/footer',
    //   id: 'footer',
    //   sizes: sizeDefaults.footer,
    //   sizeMappingName: 'footer',
    //   closeable: true,
    // },
  ],
  targeting: {
    testing: "true",
  },
};
