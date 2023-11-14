import Head from "next/head";

interface Props {
  data?: any;
  isPageNotCrawlable?: boolean;
  title: string;
}

const Header = ({ isPageNotCrawlable = false, title }: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />

      {isPageNotCrawlable ? (
        // For some reason, isPageNotCrawlable ? (<meta/ >) didn't work, so I had to make it more verbose.
        <meta name="robots" content="noindex" />
      ) : (
        false
      )}

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/video.js/6.7.3/video-js.css"
        rel="stylesheet"
      />
      {/* <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js" /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400;700&family=Mulish:wght@300;500;600;700&display=swap"
        rel="stylesheet"
      />

      <title>{title}</title>
    </Head>
  );
};
export default Header;
