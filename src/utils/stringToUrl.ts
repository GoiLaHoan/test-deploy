const StringToUrl = (site: string | null): string | null => {
  if (site === null || site.trim() === "" || site === undefined) {
    return null;
  }

  if (site.startsWith("http")) {
    return site;
  }

  return "https://" + site;
};

export default StringToUrl;
