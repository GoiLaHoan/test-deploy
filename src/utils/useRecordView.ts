import { useEffect } from "react";

/**
 *  the execute argument
 *  anything that will be truthy or falsey
 */

export default function useRecordView(execute: any, id: number): void {
  useEffect(() => {
    if (execute) {
      void fetch(
        `${window.location.origin}/api/cms-proxy/recordView?nid=${id}`,
        {
          method: "POST",
        },
      ).catch((err) => console.error(err));
    }
  }, [execute]);
}
