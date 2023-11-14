import React from "react";
import BlockHeader from "~/src/components/BlockHeader/BlockHeader";

function BlockShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-ktc-borders">
      {title && <BlockHeader title={title} />}
      {children}
    </div>
  );
}

export default BlockShell;
