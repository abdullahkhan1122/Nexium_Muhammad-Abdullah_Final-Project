import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Techs from "@/components/techs/Techs";
import HowToUse from "@/components/HowToUse/page";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="how">
        <HowToUse />
      </section>
      <section id="techs">
        <Techs />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
