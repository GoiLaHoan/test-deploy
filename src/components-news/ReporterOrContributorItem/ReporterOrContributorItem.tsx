import React from "react";
import Link from "next/link";
import type { Author } from "~/src/generated";
import { AuthorAvatarSmall } from "../AuthorAvatar/AuthorAvatar";

export const ReporterOrContributorItem: React.FC<{
  item: Pick<Author, "id" | "urlAlias" | "imageUrl" | "name">;
}> = ({ item }) => {
  return (
    <li key={item.id}>
      <Link href={item.urlAlias} className={"flex items-center"}>
        <AuthorAvatarSmall src={item.imageUrl} alt={item.name} />
        <span className="pl-[5px]">{item.name}</span>
        <span className="ml-auto justify-self-end">&gt;</span>
      </Link>
    </li>
  );
};
