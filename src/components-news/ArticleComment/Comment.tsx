import React, { useState, useRef, useEffect } from "react";
import styles from "./ArticleComment.module.scss";
import clsx from "clsx";

const Comment = ({ text, threshold }) => {
  const [expanded, setExpanded] = useState(false);
  const commentRef = useRef(null);
  const [numLines, setNumLines] = useState(0);

  useEffect(() => {
    if (commentRef.current) {
      const lineHeight = parseInt(
        getComputedStyle(commentRef.current).lineHeight,
      );
      const height = commentRef.current.clientHeight;
      const lines = Math.round(height / lineHeight);
      setNumLines(lines);
    }
  }, [text]);

  const ShowSeeMore = () => {
    if (numLines > threshold && !expanded) {
      return (
        <button className="font-bold" onClick={() => setExpanded(true)}>
          ...See more
        </button>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={clsx(
          numLines > threshold && styles.message,
          expanded && styles.expanded,
        )}
      >
        <p ref={commentRef} className="text-black pb-1">
          {text}
        </p>
      </div>
      <ShowSeeMore />
    </>
  );
};

export default Comment;
