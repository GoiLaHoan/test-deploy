import Head from "next/head";
interface Props {
  children?: React.ReactNode;
  title: string;
}
const LayoutServices = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | KITCO`}</title>
      </Head>
      <main>{children}</main>
    </>
  );
};
export default LayoutServices;
