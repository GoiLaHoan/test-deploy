import { NEWS_SECTIONS } from "~/src/types/enums";

function hrefMatcher(url: string): NEWS_SECTIONS {
  const finder = url?.split("/");

  switch (finder && finder[1]) {
    case "audio":
      return NEWS_SECTIONS.AUDIO;
    case "authors":
      return NEWS_SECTIONS.AUTHOR;
    case "categories":
      return NEWS_SECTIONS.CATEGORIES;
    case "commentaries":
      return NEWS_SECTIONS.COMMENTARIES;
    case "guests":
      return NEWS_SECTIONS.GUESTS;
    case "news":
      return NEWS_SECTIONS.NEWS;
    case "pages":
      return NEWS_SECTIONS.PAGES;
    case "sponsored":
      return NEWS_SECTIONS.SPONSORED;
    case "sponsors":
      return NEWS_SECTIONS.SPONSORS;
    case "tags":
      return NEWS_SECTIONS.TAGS;
    case "video":
      return NEWS_SECTIONS.VIDEOS;
    // TODO: this will be audio eventually
    case "node":
      return NEWS_SECTIONS.NEWS;
    default:
      return NEWS_SECTIONS.HOME; // default just prevents crashing
  }
}

export default hrefMatcher;
