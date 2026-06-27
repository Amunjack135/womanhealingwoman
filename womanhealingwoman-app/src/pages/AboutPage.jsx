import { useEffect, useRef, useState } from "react";
import founder from "../assets/tangerlajackson.png";

/* Scroll-reveal hook: detects when an element enters the viewport */
const useInView = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // only animate once
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

/* Wrapper that fades + slides content up as it scrolls into view */
const FadeInSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* Simple inline icons so card placeholders don't look "broken" before you have photos */
const MissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.6-8-11.2C4 6.7 6.5 4 9.5 4 11 4 12 5 12 5s1-1 2.5-1c3 0 5.5 2.7 5.5 5.8C20 16.4 12 21 12 21Z" />
  </svg>
);
const FounderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);
const VisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const PrinciplesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 14.5 2-5 5-2-2 5-5 2Z" />
  </svg>
);

const whoWeAreCards = [
  { title: "Our Mission", Icon: MissionIcon },
  { title: "Our Founder", Icon: FounderIcon },
  { title: "Our Vision", Icon: VisionIcon },
  { title: "Our Principles", Icon: PrinciplesIcon },
];

const corePurpose = [
  "Healing of the Spirit",
  "Empowerment of the Self",
  "Cultural and Community Growth",
  "Alignment with Fate",
  "Service to Others",
];

const guidingPrinciples = [
  { title: "Divine Source", description: "The eternal energy that guides, heals, and empowers." },
  { title: "Fate and Purpose", description: "Life's journey is directed by divine design." },
  { title: "Healing through Empowerment", description: "Awakening to self-worth brings healing." },
  { title: "Unity in Diversity", description: "We honor every individual's connection to the Source." },
  { title: "Sacred Service", description: "To serve humanity is to serve the Divine within all beings." },
];

const AboutPage = () => {
  return (
    <div className="text-left overflow-hidden">
      {/* Hero with decorative blurred background shape */}
      <section className="relative px-6 lg:px-12 py-20 text-center">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full /10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full /10 blur-3xl pointer-events-none" />

        <FadeInSection>
          <h1 className="leading-normal">About Woman Healing Woman Foundation</h1>
          <p className="mx-auto text-lg mt-4 relative leading-normal">
            Woman Healing Woman Foundation is a nonprofit organization dedicated to providing safe, nurturing, and empowering spaces where women can heal emotionally, grow spiritually, and thrive collectively through sisterhood, education, wellness programs, and community engagement.
          </p>
        </FadeInSection>
      </section>

      {/* Who We Are - card grid with icon placeholders + hover lift */}
      <section className="px-6 lg:px-12 pb-20">
        <FadeInSection>
          <h2 className="text-center mb-10">Who We Are</h2>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoWeAreCards.map(({ title, Icon }, index) => (
            <FadeInSection key={title} delay={index * 100}>
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-[#FCECE3] to-[#E8B89C] text-[#652818]">
                  <Icon />
                </div>
                <div className="bg-[#652818] text-white text-center py-5 font-semibold text-lg">
                  {title}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Mission - elevated white card for contrast against the peach page background */}
      <section className="px-6 lg:px-12 py-20">
        <FadeInSection>
          <div className="bg-white rounded-3xl shadow-sm px-8 lg:px-16 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <h2>Our Mission</h2>
            <div className="border-l-4 border-[#652818] pl-6 text-lg">
              <p>
                To provide safe, nurturing, and empowering spaces where women can heal emotionally, grow spiritually, and thrive collectively through sisterhood, education, and wellness-centered programs.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Founder spotlight - stylish placeholder panel instead of a broken image */}
      <section className="px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeInSection>
          <div className="rounded-3xl overflow-hidden aspect-square w-full">
            <img
              src={founder}
              alt="Tangerla Jackson, Founder of Woman Healing Woman Foundation"
              className="w-full h-full object-fill"
            />
          </div>
        </FadeInSection>
        <FadeInSection delay={150}>
          <div>
            <h2>Meet Our Founder</h2>
            <p className="text-lg mt-4">
              Woman Healing Woman Foundation was established by Tangerla Jackson-Blakely to serve as a
              sanctuary of renewal, empowerment, and transformation for all who seek alignment
              with the Divine Source and the unfolding guidance of fate. Under her leadership,
              the Foundation acknowledges the Divine Source as the eternal creative power that
              flows through all existence — the unseen energy that guides fate, purpose, and
              transformation.
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Core Purpose - numbered badges for visual rhythm against white background */}
      <section className="px-6 lg:px-12 py-20 bg-white">
        <FadeInSection>
          <h2 className="text-center mb-10">Our Core Purpose</h2>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          {corePurpose.map((item, index) => (
            <FadeInSection key={item} delay={index * 80}>
              <div className="bg-[#FCECE3] rounded-2xl px-4 py-10 h-full flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
                <span className="w-9 h-9 rounded-full bg-[#652818] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="font-semibold">{item}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Guiding Principles - dark contrast block */}
      <section className="bg-[#652818] text-white px-6 lg:px-12 py-20">
        <FadeInSection>
          <h2 className="text-white text-center mb-10">Our Guiding Principles</h2>
        </FadeInSection>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {guidingPrinciples.map((principle, index) => (
            <FadeInSection key={principle.title} delay={index * 100}>
              <div className="flex gap-4">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-lg">
                  <span className="font-semibold">{principle.title}</span> — {principle.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Vision + Visit */}
      <section className="px-6 lg:px-12 py-20 text-center">
        <FadeInSection>
          <h2 className="mb-4">Our Vision</h2>
          <p className="mx-auto text-lg mb-10">
            We envision a world where individuals awaken to their sacred power, live in
            harmony with their divine fate, and walk in alignment with their true purpose.
          </p>
          <br />
          <p className="font-semibold text-lg">Visit Our Sanctuary</p>
          <p className="text-lg">1107 B Beatties Ford Rd, Charlotte, NC 28216</p>
        </FadeInSection>
      </section>
    </div>
  );
};

export default AboutPage;