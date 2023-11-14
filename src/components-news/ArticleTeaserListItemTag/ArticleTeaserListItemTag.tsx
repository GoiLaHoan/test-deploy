import React from "react";
import { Label } from "~/src/generated";

const ArticleTeaserListItemTag: React.FC<{ tag: Label }> = ({ tag }) => {
  if (!tag) {
    return null;
  }

  if (tag.imageUrl) {
    return (
      <img src={tag.imageUrl} alt="Video Article Image" className="mr-2" />
    );
  }

  const styles = {
    backgroundColor: tag.backgroundColor,
    color: tag.textColor,
    borderRadius: "2px",
    marginRight: "0.25em",
    padding: "0 5px",
    fontSize: "13px",
    fontWeight: 600,
  };

  return <div style={styles}>{tag.name}</div>;
};

export default ArticleTeaserListItemTag;
