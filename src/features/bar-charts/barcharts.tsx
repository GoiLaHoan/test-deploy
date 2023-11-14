import clsx from "clsx";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const symbolsAtom = atom<string[]>([]);

async function loadLibrary() {
  const lib = await import("@barchart/chart-lib");
  return lib;
}

async function barcharts() {
  const lib = await loadLibrary();

  if (!lib?.getFeed()) {
    // this library is so dog shit
    // @ts-ignore
    lib.initFeed(lib.BarchartSiteDataFeed, {
      defaultTemplate: "/thumbnail.def.json",
      throttleMillis: 5000,
      mode: "InternalFeed",
      credentials: { username: "kitcoChart", password: "data" },
      apiKey: `37800fbe8be1378806120895e41d12fe`,
    });
  }
  return {
    init: async () => {
      const isReady = await lib?.getFeed()?.ready();
      if (!isReady) {
        // @ts-ignore
        lib.initFeed(lib.BarchartSiteDataFeed, {
          defaultTemplate: "/thumbnail.def.json",
          throttleMillis: 5000,
          mode: "InternalFeed",
          credentials: { username: "kitcoChart", password: "data" },
          apiKey: `37800fbe8be1378806120895e41d12fe`,
        });
      }
    },
    syncSymbols: async (symbols: string[]) => {
      try {
        const isReady = await lib.getFeed()?.ready();
        if (isReady) {
          for (let i = 1; i < symbols.length + 1; ++i) {
            const chartExistsInLib = lib?.getFeed()?.getChart("chart" + i);
            const chartExistsInDOM = document.getElementById("chart" + i);
            if (!chartExistsInLib && chartExistsInDOM) {
              lib?.getFeed()?.addChart("chart" + i, {
                symbol: symbols[i - 1],
              });
            }
          }
        }
      } catch (error) {
        console.error("Could not sync symbols");
      }
    },
    destroy: async () => {
      try {
        const isReady = await lib.getFeed()?.ready();
        if (isReady) {
          lib.shutdownFeed();
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
}

export function Barcharts(props: {
  symbol: string;
  title?: string;
  href?: string;
}) {
  const [read, write] = useAtom(symbolsAtom);

  // load the barcharts library and function in the browser
  // this is a hack to get around the fact that the library is not SSR compatible
  const mountingAtom = useMemo(() => {
    const a = atom(
      (get) => get(symbolsAtom),
      async (get, set) => {
        const bc = await barcharts();
        const current = get(symbolsAtom);
        set(symbolsAtom, [...current, props.symbol]);
        const updated = get(symbolsAtom);
        bc.syncSymbols(updated);
      },
    );
    a.onMount = (set) => {
      set([props.symbol]);
    };
    return a;
  }, [props.symbol]);
  useAtom(mountingAtom);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = async () => {
      const bc = await barcharts();
      await bc.destroy();
      write([]);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div>
      {props.href && (
        <Link
          href={props.href}
          className={clsx(
            "block",
            "text-base font-semibold text-black",
            "hover:underline",
          )}
        >
          {props.title}
        </Link>
      )}
      <div className="chart">
        <div id={"chart" + (read.indexOf(props.symbol) + 1)} />
      </div>
    </div>
  );
}
