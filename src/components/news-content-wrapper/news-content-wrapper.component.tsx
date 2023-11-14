import type { FC } from "react";
import cs from "~/src/utils/cs";

export const NewsContentWrapper: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => (
  <div
    id="newsContentWrapper"
    className={cs(["px-5 mx-auto w-auto md:px-10 lx:px-0"])}
  >
    {children}
  </div>
);

// this has overflow for the video section and carousel
export const NewsContentWrapperWithOverflow: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => (
  <div className={cs(["px-5 mx-auto w-auto max-w-[1240px] md:px-10 2xl:px-0"])}>
    {children}
  </div>
);
