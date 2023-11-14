import Head from "next/head";
interface Props {
  children?: React.ReactNode;
  title: string;
}
const LayoutAdvertising = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
};
export default LayoutAdvertising;
