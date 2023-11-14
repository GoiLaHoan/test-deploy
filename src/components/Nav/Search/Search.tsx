import { useState } from "react";
import { useRouter } from "next/router";
import { Content, Item, Trigger } from "@radix-ui/react-navigation-menu";
import clsx from "clsx";

import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { preventHover } from "../Composables";
import useScreenSize from "~/src/utils/useScreenSize";

import searchStyles from "./Search.module.scss";

interface Props {
  mobileNavActivate: boolean;
  toggleMobileNav?: () => void;
}

const Search = ({ mobileNavActivate, toggleMobileNav }: Props) => {
  const r = useRouter();
  const { isDesktop } = useScreenSize();
  return (
    <>
      <Item
        // className={clsx("flex-grow w-full", "bg-ktc-black")}
        className={clsx(
          "relative left-0 px-0 py-2 block h-full w-full ",
          "lg:px-3 lg:py-0",
          r.pathname.includes("/news/video") ? "bg-[#0F181D]" : "bg-ktc-black",
        )}
      >
        <Trigger
          onPointerMove={preventHover}
          onPointerLeave={preventHover}
          onClick={toggleMobileNav}
          className={clsx(
            "h-full w-full px-2 pt-[2px]",
            "flex items-center justify-end",
          )}
        >
          <BiSearch color="white" size="25px" />
        </Trigger>
        {isDesktop && (
          <Content
            // forceMount={true}
            // forceMount={!isDesktop && mobileNavActivate ? true : false}
            onPointerLeave={preventHover}
            className={clsx(
              "absolute left-0",
              "w-full flex justify-center items-center",
              "bg-ktc-black",
              "lg:mt-0 lg:py-8",
            )}
          >
            <SearchNavInput mobileNavActivate={mobileNavActivate} />
          </Content>
        )}
      </Item>
    </>
  );
};

export default Search;

export const SearchNavInput = (props: Props) => {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const { isDesktop } = useScreenSize();

  function submitSearchTerm() {
    router.push({ pathname: "/search", query: { term } });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      submitSearchTerm();
    }
  }

  const onClear = () => setTerm("");
  return isDesktop || props.mobileNavActivate ? (
    <div
      className={clsx(
        "flex items-center",
        "absolute px-4 left-0 z-[1] w-full",
        "lg:relative lg:right-auto lg:w-auto",
      )}
    >
      <input
        type="text"
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        onKeyDown={onKeyDown}
        className={clsx(
          searchStyles.input,
          "w-full lg:w-96",
          "ring-0 outline-none text-black",
        )}
      />
      <button
        type="button"
        placeholder="Search..."
        onClick={submitSearchTerm}
        className={searchStyles.submitButton}
      >
        Search
      </button>
      <div
        className={clsx(
          searchStyles.closeIcon,
          term.length < 1 ? "opacity-40" : "opacity-100",
        )}
      >
        <button type="button" onClick={onClear}>
          <span>
            <IoClose size="20px" color="white" />
          </span>
        </button>
      </div>
    </div>
  ) : null;
};
