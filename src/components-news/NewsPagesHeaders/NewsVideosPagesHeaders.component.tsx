import { Fragment, useRef } from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "react-query";
import { VideoGetCategoriesQuery } from "~/src/generated";
import { vcms } from "~/src/lib/vcms-factory.lib";

export function NewsVideosPagesHeader() {
  const { data, isLoading, isFetching } = useQuery(vcms.listPlaylists());
  return (
    <div
      className={clsx(
        "max-w-full",
        "flex items-center justify-between",
        "lg:block",
      )}
    >
      <h1 className="uppercase text-[24px] lg:text-[48px]">Video News</h1>
      <div className="hidden lg:block">
        {isLoading || isFetching ? (
          <VideoPlaylistsMenuDesktopLoading />
        ) : (
          <VideoPlaylistsMenuDesktop data={data} />
        )}
      </div>
      <div className="block lg:hidden">
        <VideoPlaylistsMenu data={data} buttonLabel="Shows" />
      </div>
    </div>
  );
}

function VideoPlaylistsMenuDesktop({
  data,
}: { data: VideoGetCategoriesQuery }) {
  return (
    <div className="flex items-center relative">
      <h5 className="font-semibold mr-4 relative">Shows:</h5>
      <ul className="flex items-center overflow-hidden">
        {data?.VideoGetCategories?.map((x, idx) => (
          <Fragment key={x.id}>
            <li className="flex items-center">
              <Link
                href={`/news/video${x?.urlAlias}` || "/notfound"}
                className="text-white whitespace-nowrap text-base"
                key={x.id}
              >
                <span>{x.name}</span>
              </Link>
              {idx !== data?.VideoGetCategories?.length - 1 ? (
                <div className="h-1 w-1 rounded-full bg-white mx-4" />
              ) : null}
            </li>
          </Fragment>
        ))}
      </ul>
      <div className="relative w-full lg:w-auto">
        <VideoPlaylistsMenu data={data} buttonLabel="MORE" />
      </div>
    </div>
  );
}

function VideoPlaylistsMenuDesktopLoading() {
  return (
    <div className="flex items-center relative">
      <h5 className="font-semibold mr-4 relative">Shows:</h5>
      <ul className="flex items-center overflow-hidden">
        {Array.from(Array(6).keys()).map((_, idx: number) => (
          <Fragment key={idx}>
            <li className="flex items-center">
              <span className="h-6 w-20 rounded-md mx-4 animate-loading" />
              {idx !== 6 ? (
                <div className="h-1 w-1 rounded-full bg-white mx-4" />
              ) : null}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

function VideoPlaylistsMenu({
  data,
  buttonLabel,
}: {
  data: VideoGetCategoriesQuery;
  buttonLabel: string;
}) {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutDuration = 200;
  let timeout: any;

  const openMenu = () => buttonRef?.current?.click();
  const closeMenu = () =>
    dropdownRef?.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      }),
    );

  const onMouseEnter = (closed: boolean) => {
    clearTimeout(timeout);
    closed && openMenu();
  };
  const onMouseLeave = (open: boolean) => {
    open && (timeout = setTimeout(() => closeMenu(), timeoutDuration));
  };

  return (
    <Menu>
      {({ open }) => (
        <>
          <div
            onClick={openMenu}
            onMouseEnter={() => onMouseEnter(!open)}
            onMouseLeave={() => onMouseLeave(open)}
          >
            <Menu.Button
              ref={buttonRef}
              className="flex items-center pl-4 font-semibold"
              // onMouseEnter={() => setShowMoreMenu(true)}
              // onMouseLeave={() => setShowMoreMenu(false)}
            >
              <span>{buttonLabel}</span>
              <BiChevronDown />
            </Menu.Button>
          </div>
          {open && (
            <Menu.Items
              static
              ref={dropdownRef}
              onMouseEnter={() => onMouseEnter(!open)}
              onMouseLeave={() => onMouseLeave(open)}
              className={clsx(
                "absolute z-30 bg-gray-100 p-4",
                "left-0 w-full", //mobile styles
                "lg:right-0 lg:left-auto lg:w-auto", // tablet and desktop
              )}
            >
              {data?.VideoGetCategories?.map((x) => (
                <Menu.Item key={x.id} as={Fragment}>
                  <div className="my-1 py-1">
                    <Link
                      className="text-black font-semibold whitespace-nowrap"
                      href={`/news/video${x?.urlAlias}` || "/notfound"}
                    >
                      {x.name}
                    </Link>
                  </div>
                </Menu.Item>
              ))}
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
}

// only to be used /news/video/[date]
// and /news/video/[date]/[alias]
export function NewsVideosPagesCategoryAndDetailHeader({
  routeLabel,
}: {
  routeLabel: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-full",
        "flex items-center justify-between",
        "lg:block",
      )}
    >
      <h1 className="uppercase flex items-center gap-3 text-[24px] lg:text-[48px]">
        <Link
          href="/news/video"
          className="text-white/70"
          style={{ fontFamily: "Bebas Neue" }}
        >
          Video News
        </Link>
        <span className="opacity-60" style={{ fontFamily: "Bebas Neue" }}>
          /
        </span>
        {!routeLabel ? (
          <span className="w-96 h-8 block animate-loading rounded-md" />
        ) : (
          <span style={{ fontFamily: "Bebas Neue" }}>{routeLabel}</span>
        )}
      </h1>
    </div>
  );
}
