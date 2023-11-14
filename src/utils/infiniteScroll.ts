import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

// params state and setter purely for convention
function useParams(limit = 10, more = undefined) {
  const VARIABLES_DEFAULT = { limit: limit, offset: 0 };
  const [params, setParams] = useState(VARIABLES_DEFAULT);
  const itemMore = more ?? limit;
  const r = useRouter();

  const incrementParams = useCallback(() => {
    setParams((pre) => ({
      ...pre,
      offset: pre.offset + pre.limit,
      limit: itemMore,
    }));
  }, [params]);

  useEffect(() => {
    setParams(VARIABLES_DEFAULT);
  }, [r.asPath]);

  return { params, incrementParams };
}

// infinite scroller
interface UseInfiniteArgs<T> {
  items: Array<T>;
  incrementParams: () => void;
  total: number;
}

function useInfinite<T>(args: UseInfiniteArgs<T>) {
  const r = useRouter();
  const [itemScroll, setItemScroll] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    // To trigger the infinite scroll when the user reaches 2/3 of a list item
    rootMargin: "0px 0px 33% 0px",
  });
  const isNextPage = args.total > itemScroll?.length;

  useEffect(() => {
    setItemScroll([]);
  }, [r.asPath]);

  useEffect(() => {
    setLoading(true);
    if (args.items) {
      setLoading(false);
      setItemScroll((pre) => [...pre, ...args.items]);
    }
  }, [JSON.stringify(args.items)]);

  useEffect(() => {
    if (!inView) return;

    if (isNextPage) {
      args.incrementParams();
    }
  }, [inView]);

  // Handle action loadmore
  const fetchMore = () => {
    if (isNextPage) {
      args.incrementParams();
    }
  };

  return {
    ref,
    items: itemScroll,
    isNextPage,
    fetchMore,
    loading,
  };
}

export { useParams, useInfinite };
