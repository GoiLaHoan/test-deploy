import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const NewsMore: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/news/more/gold");
  }, []);

  return <div />;
};

export default NewsMore;
