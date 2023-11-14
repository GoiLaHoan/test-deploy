import Document, { Head, Html, Main, NextScript } from "next/document";
import { env } from "~/src/env/client.mjs";

const gamInitScript = `var googletag=googletag||{};googletag.cmd=googletag.cmd||[]`;
export default function MyDocument({ router }) {
  const AdvertisingLayout = (): JSX.Element => {
    if (router.pathname === "/advertising") {
      return (
        <>
          <link
            href="https://fonts.googleapis.com/css?family=Muli:400,700|Raleway:400,700"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/brands.css"
            integrity="sha384-rf1bqOAj3+pw6NqYrtaE1/4Se2NBwkIfeYbsFdtiR6TQz0acWiwJbv1IM/Nt/ite"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css"
            integrity="sha384-1rquJLNOM3ijoueaaeS5m+McXPJCGdr5HcA03/VHXxcp2kX2sUrQDmFc3jR5i/C7"
            crossOrigin="anonymous"
          />
          <script src="/reach/libraries/jquery-3.3.1.min.js" />
          <script src="/reach/libraries/bootstrap.min.js" />
          <script src="/reach/libraries/app.min.js" />
          <script src="/reach/libraries/jquery.form.min.js" />
          <script src="/reach/libraries/jquery.validate.min.js" />
          <script src="/reach/libraries/formsubmit.js" />
        </>
      );
    }

    if (router.pathname.startsWith("/services/")) {
      return (
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Muli:300,400,600,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,500,500i,600,700,800,900"
            rel="stylesheet"
          />

          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
            rel="stylesheet"
            type="text/css"
          />

          <script
            src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/libraries/jquery.min.js`}
          />
          <script
            src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/libraries/bootstrap.min.js`}
          />
          <script
            src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/libraries/bootstrap-notify.min.js`}
          />
          <script
            src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/libraries/main.js`}
          />
        </>
      );
    }

    return null;
  };

  const dataTheme = () => {
    if (router.pathname === "/advertising") {
      return "advertising";
    }

    if (router.pathname === "/services/cpm-group-signals") {
      return "services";
    }

    return "";
  };

  return (
    <Html data-theme={dataTheme()}>
      <Head>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script>{gamInitScript}</script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <AdvertisingLayout />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, router: ctx };
};
