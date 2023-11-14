const StrippedString = (value: string): string => {
  if (typeof window !== "undefined" && window.document) {
    const divCustom = document.createElement("div");
    divCustom.innerHTML = value?.trim();
    const pFirst = divCustom.getElementsByTagName("p")[0]?.outerHTML;
    const strippedString = pFirst?.replace(/(<([^>]+)>)/gi, "");

    return strippedString;
  }

  return null;
};

export default StrippedString;

export const firstSentence = (value: string): string => {
  if (typeof window !== "undefined" && window.document) {
    const firstLine = value.split("&#10")[0].replace("<pre>", "");

    return firstLine;
  }

  return null;
};
