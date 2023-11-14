import { useEffect, useState } from "react";

export interface BidAskState {
  ask: number;
  bid: number;
}

export function usePriceAnimator(bid: number, ask: number) {
  const [direction, setDirection] = useState<"down" | "up" | "reset">("reset");
  const [previous, setPrevious] = useState<BidAskState>({ bid, ask });

  useEffect(() => {
    if (typeof bid === "undefined" || typeof ask === "undefined") {
      setPrevious((p) => ({ ...p }));
    }

    if (typeof bid === "number" || typeof ask === "number") {
      setPrevious((p) => ({ ...p, bid, ask }));
    }

    if (bid !== previous.bid) {
      setPrevious((p) => ({ ...p, bid }));
    }

    if (bid < previous.bid) {
      setDirection("down");
    }

    if (bid > previous.bid) {
      setDirection("up");
    }

    const reset = setTimeout(() => {
      setDirection("reset");
    }, 1000);

    return () => window.clearTimeout(reset);
  }, [bid]);

  return { direction };
}
