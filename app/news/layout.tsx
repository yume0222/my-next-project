import Hero from "../_components/Hero";
import Sheet from "../_components/Sheet";

type props = {
  children: React.ReactNode;
};

export default function layout({ children }: props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
