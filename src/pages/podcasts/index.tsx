import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { CardPodcasts } from "~/src/components/CardPodcasts/CardPodcasts";
import PodcastsMeta from "~/src/components/PodcastsMeta/PodcastsMeta";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";

const PodcastsLanding = () => {
  const connectRoundtable = [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/ca/podcast/kitco-news-roundtable/id1536837266",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4Rd745LTiUv66LQZerx3Bd",
    },
    {
      name: "Google Podcasts",
      url: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9HckZEYkRNUA?sa=X&ved=0CAcQrrcFahcKEwj4ovKEuKP-AhUAAAAAHQAAAAAQLA",
    },
    {
      name: "RSS Feed",
      url: "https://feeds.simplecast.com/GrFDbDMP",
    },
  ];

  const connectOther = [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/ca/podcast/the-metals-money-and-markets-weekly-by-mickey-fulp/id1537184725",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/62UGhoQTI5mCtzlIiKRd2y",
    },
    {
      name: "Google Podcasts",
      url: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9OanQzUF9WYw?sa=X&ved=0CAcQrrcFahgKEwj4ovKEuKP-AhUAAAAAHQAAAAAQtAE",
    },
    {
      name: "RSS Feed",
      url: "https://feeds.simplecast.com/Njt3P_Vc",
    },
  ];

  return (
    <LayoutNewsLanding title="Mining Podcast, Gold Podcast, Silver Podcast, Cryptocurrency Podcast | KITCO">
      <PodcastsMeta />
      <div className="px-4 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px] ">
        <div className="pt-[8px] lg:pt-0 pb-[32px] lg:pb-[44px]">
          <h1 className="text-[34px] md:text-5xl leading-[120%] md:tracking-[-0.005em] tracking-[0] !font-lato font-bold">
            Podcasts from Kitco
          </h1>
          <div className="text-[14px] md:text-xl leading-[130%] tracking-[0.005em] md:tracking-[0.0075em] text-[#838383] font-lato font-bold mt-[8px]">
            Subscribe to our podcasts and listen to us when you are on the go.
          </div>
        </div>

        <div className="flex gap-0 sm:gap-5">
          <div className="w-full md:w-2/3 flex gap-5 flex-col lg:flex-row">
            <CardPodcasts
              urlIframe="https://player.simplecast.com/a23eaa2b-983a-490d-85b9-9ce2f0fc4ebb?dark=false&show=true"
              title="Kitco NEWS Roundtable"
              description="Join Kitco correspondent Paul Harris and Mining Audiences
                  Manager Michael McCrae as they highlight the biggest news in
                  precious metals and mining."
              connect={connectRoundtable}
            />
            <div className="block md:hidden self-center">
              <AdvertisingSlot
                id={"podcasts-landing-page-300x250-1"}
                className={"h-[250px] w-[300px] bg-red-500 "}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            </div>
            <CardPodcasts
              urlIframe="https://player.simplecast.com/c056a548-4309-466f-b2b8-31e3abb559c5?dark=false&show=true"
              title="The Metals, Money, And Markets Weekly"
              description="Join The Mercenary Geologist Mickey Fulp and Chris Temple
              every Friday afternoon for a recap of metals, money, and
              markets. Each episode provides commentary on performances and
              a look ahead to next week's markets. You can listen to
              the weekly wrap exclusively at Kitco.com. We trust you will
              find our podcast of value and hope it becomes a part of your
              weekly due diligence and research. May all your trades be to
              the upside."
              connect={connectOther}
            />
            <div className="block md:hidden self-center">
              <AdvertisingSlot
                id={"podcasts-landing-page-300x250-1"}
                className={"h-[250px] w-[300px] bg-red-500 "}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            </div>
          </div>
          <div className="hidden md:block lg:w-1/3 lg:ml-[70px]">
            <AdvertisingSlot
              id={"podcasts-landing-page-300x600"}
              className={
                "h-[600px] w-[300px] mx-auto bg-red-400 flex justify-center items-center"
              }
              viewportsEnabled={{ desktop: true, tablet: true, mobile: false }}
            />
          </div>
        </div>
      </div>
    </LayoutNewsLanding>
  );
};

export default PodcastsLanding;
