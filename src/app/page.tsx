import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Notes } from "@/components/Notes";
import { Ticker } from "@/components/Ticker";
import { Toolbox } from "@/components/Toolbox";
import { WorkIndex } from "@/components/WorkIndex";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Experience />
      <Notes />
      <WorkIndex />
      <Toolbox />
      <Contact />
    </>
  );
}
