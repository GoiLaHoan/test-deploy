import clsx from "clsx";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { Content, Item, Trigger } from "@radix-ui/react-navigation-menu";
import { preventHover } from "../Composables";

const links = [
  {
    id: 1,
    name: "Premium Service Account",
    href: "https://premium.kitco.com/my/login#top",
  },
  {
    id: 2,
    name: "Online Store Account",
    href: "https://online.kitco.com/signin.html",
  },
];

const Account = () => {
  return (
    <Item className={clsx("h-full")}>
      <Trigger
        onPointerMove={preventHover}
        onPointerLeave={preventHover}
        className={clsx("h-full px-2 grid place-items-center")}
      >
        <Link href="/account">
          <MdAccountCircle size="25px" color="white" />
          {/* <MobileOpenClose visible={visible} handleMenu={handleMenu} /> */}
        </Link>
      </Trigger>
      <Content
        className={clsx(
          "relative w-full max-w-[1240px] flex justify-end mx-auto",
        )}
      >
        <div className={clsx("relative", "bg-ktc-black")}>
          <ul className={clsx("flex flex-col gap-3 p-3")}>
            {links.map((x) => (
              <li key={x.id}>
                <a
                  href={x.href}
                  className={clsx("text-white", "hover:underline")}
                >
                  {x.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Content>
    </Item>
  );
};

export default Account;
