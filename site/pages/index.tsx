import type { NextPage } from "next";
import IntroBlock from "../components/content/home/IntroBlock";
import ArtBlock from "../components/content/home/ArtBlock";
import WritingBlock from "../components/content/home/WritingBlock";
import ContactBlock from "../components/content/home/ContactBlock";

const Home: NextPage = () => {
  return (
    <>
      <IntroBlock />
      <ArtBlock />
      <WritingBlock />
      <ContactBlock />
    </>
  );
};

export default Home;
