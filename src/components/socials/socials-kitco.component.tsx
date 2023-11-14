import { clsx } from "clsx";
import { useCallback, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

export const getMeta = (metaName: string) => {
  if (typeof window !== "undefined") {
    const metas = document?.getElementsByTagName("meta");

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === metaName) {
        return metas[i].getAttribute("content");
      }
    }
  }

  return "";
};

export const SocialsKitco = (p: {
  className?: string;
  hidePrint?: boolean;
  listAuthorStr?: string;
  bodyEmail?: string;
}) => {
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const copyLinkHandler = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 3000);
  }, []);

  const handlePrint = () => {
    if (window.print) {
      window.print();
    }
  };
  const getUrlCurrent =
    typeof window !== "undefined" ? window.location.href : "/";

  const newLine = `\n`;

  const bodyEmail = p.bodyEmail
    ? p.bodyEmail
    : getMeta("twitter:title") +
      " | Kitco News" +
      newLine +
      newLine +
      p.listAuthorStr +
      newLine +
      newLine +
      getMeta("description") +
      newLine +
      newLine;

  return (
    <div
      className={clsx([
        "flex items-center gap-2",
        !p?.className ? undefined : p.className,
      ])}
    >
      <FacebookShareButton url={getUrlCurrent} className="text-kitco-black">
        <FaFacebookF size={20} />
      </FacebookShareButton>

      <TwitterShareButton
        title={getMeta("twitter:title")}
        url={getUrlCurrent}
        via={getMeta("twitter:site").slice(1)}
        className="text-kitco-black"
      >
        <FaXTwitter size={20} />
      </TwitterShareButton>

      <EmailShareButton
        url={getUrlCurrent}
        body={bodyEmail}
        subject={getMeta("twitter:title")}
        className="text-kitco-black"
      >
        <IoMailOutline size={24} />
      </EmailShareButton>
      <div className="flex">
        <button
          type="button"
          className="text-kitco-black"
          onClick={copyLinkHandler}
        >
          <BiLink size={24} />
        </button>
        {!showCopyAlert ? null : (
          <span className="block absolute top-10 whitespace-nowrap left-[-26px] width-[75px]">
            Link copied!
          </span>
        )}
      </div>
      {p.hidePrint ? null : (
        <a className="text-kitco-black" onClick={handlePrint}>
          <AiOutlinePrinter size={24} />
        </a>
      )}
    </div>
  );
};
