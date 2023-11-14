import * as Rad from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

export const preventHover = (event: any) => {
  const e = event as Event;
  if (window.innerWidth < 1024) e.preventDefault();
};

function Item(props: { children: React.ReactNode }) {
  const r = useRouter();
  return (
    <Rad.Item
      className={clsx(
        "relative px-0 py-2 block h-auto w-full",
        "lg:px-3 lg:py-0 lg:border-r",
        r.pathname.includes("/news/video")
          ? "bg-[#0F181D] lg:border-[#0F181D]"
          : "bg-ktc-black lg:border-white/5",
      )}
    >
      {props.children}
    </Rad.Item>
  );
}

function Trigger(props: { children: React.ReactNode }) {
  // i am sorry this is so hacky
  const [expanded, setExpanded] = useState(false);
  const [re, rerender] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const ariaExpanded = ref.current.getAttribute("aria-expanded");
      setExpanded(ariaExpanded === "true");
    }
  }, [re]);

  return (
    <Rad.Trigger
      onPointerMove={preventHover}
      onPointerLeave={preventHover}
      ref={ref}
      onClick={() => {
        rerender((x) => x + 1);
      }}
      className={clsx(
        "w-full text-left block",
        "flex items-center justify-between",
        "lg:h-full",
      )}
    >
      {props.children}
      <span className={clsx("opacity-50 mr-4 lg:hidden")}>
        {!expanded ? (
          <AiOutlinePlus color="white" size="16px" />
        ) : (
          <IoMdClose color="white" size="16px" />
        )}
      </span>
    </Rad.Trigger>
  );
}

function Content(props: { children: React.ReactNode }) {
  const r = useRouter();
  return (
    <div className={clsx("block relative h-auto")}>
      <Rad.Content
        onPointerLeave={preventHover}
        className={clsx("relative top-0", "flex justify-center")}
      >
        <div
          className={clsx(
            "py-2",
            r.pathname.includes("/news/video")
              ? "bg-[#0F181D]"
              : "bg-ktc-black",
          )}
        >
          {props.children}
        </div>
      </Rad.Content>
    </div>
  );
}

const SubMenuGrid = (props: { children: React.ReactNode }) => (
  <div
    className={clsx(
      "relative grid grid-cols-2 px-4 py-2",
      "md:grid-cols-3",
      "divide-x divide-white/10",
    )}
  >
    {props.children}
  </div>
);

const SubMenuColumn = (props: { children: React.ReactNode }) => (
  <div className={clsx("pl-4 w-1/2 md:min-w-[240px] md:w-1/3")}>
    {props.children}
  </div>
);

export { Item, Trigger, Content, SubMenuGrid, SubMenuColumn };
