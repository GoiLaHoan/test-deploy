// if (process.env.NODE_ENV === 'development') {
//   require('preact/debug')
// }

import React, { useEffect, useRef } from "react";
import "~/src/styles/global.scss";
import "~/src/styles/barchart.css";
import "react-day-picker/lib/style.css";
import { SWRDataCtx } from "~/src/utils/swr-gql";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import AdProvider from "~/src/features/advertising/AdvertisingProvider";
import { adConfig as config } from "~/src/features/advertising/config";
import plugins from "~/src/features/advertising/plugins";

// tree-shaken out for prod
import { ReactQueryDevtools } from "react-query/devtools";
import useSWR, { SWRConfig } from "swr";

const App = ({ Component, pageProps }) => {
  const fallback = pageProps.fallback || <div>Loading...</div>;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            useErrorBoundary: false,
            retry: false,
            // enabled: false, // turn this off to see stuff that only loads on client
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <SWRDataCtx ssrData={pageProps.ssrData}>
          <SWRConfig value={{ fallback, use: [silentRevalidate] }}>
            <AdProvider config={config} plugins={plugins}>
              <Component {...pageProps} />
            </AdProvider>
          </SWRConfig>
        </SWRDataCtx>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;

// This is a SWR middleware for keeping the data even if key changes.
// this also creates a new Timestamp as a magical sideeffect lol react rendering
function silentRevalidate(useSWRNext: typeof useSWR) {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isRevalidating =
      swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isRevalidating,
    });
  };
}
