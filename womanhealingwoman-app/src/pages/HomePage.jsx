import { useNavigate } from "react-router-dom";
import FadeInSection from "../components/FadeInSection";
import ImagePlaceholder from "../components/ImagePlaceholder";
import womenhugging from '../assets/womenhugging.png';
import image from '../assets/image2.JPG';
import { collection, addDoc } from "firebase/firestore";
import { db } from "/firebase";
import { useState } from "react";



const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-2-7-6-7-11a7 7 0 0 1 14 0c0 5-3 9-7 11Z" />
    <path strokeLinecap="round" d="M12 21V9" />
  </svg>
);

const CircleGroupIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
    <circle cx="12" cy="6" r="2.2" />
    <circle cx="5" cy="14" r="2.2" />
    <circle cx="19" cy="14" r="2.2" />
    <path strokeLinecap="round" d="M12 8.2V12M5 16.2v3M19 16.2v3M9 13l3-1 3 1" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 inline-block mr-1 -mt-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);




const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    startMonth: "",
    startDay: "",
    startYear: "",
  });


  async function handleFormSubmit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const formPayload = Object.fromEntries(formData.entries());

    console.log("Form Data Object:", formPayload); 

    try {
        const docRef = await addDoc(collection(db, "volunteer_mentors"), {
          formData: formPayload,
        });
        console.log("Document written with ID: ", docRef.id);

        event.target.reset()

      } catch (e) {
        console.error("Error adding document: ", e);
      }

  }

  return (
    <div className="home-container overflow-hidden pt-10">

      {/* Hero */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-12 py-20">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full /10 blur-3xl pointer-events-none" />

        <FadeInSection className="text-left relative z-10 leading-normal">
          <h1>Healing the Woman, Raising the Tribe</h1>
          <p className="text-lg mb-8 mt-4 leading-relaxed">
            We restore strength, purpose, and cultural wisdom. When a woman heals, her whole community begins its rise.
          </p>
          <br />
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => { navigate("/join"); }}
              className="rounded-full bg-[#652818] text-white px-8 py-4 text-lg font-medium hover:opacity-90 hover:scale-105 transition"
            >
              Join the Circle
            </button>

            <button
              onClick={() => { navigate("/"); }}
              className="rounded-full border-2 border-[#652818] text-[#652818] px-8 py-4 text-lg font-medium hover:bg-[#652818]/5 hover:scale-105 transition"
            >
              Support the Movement
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <img
            src={womenhugging}
            alt="Women gathered in a healing circle"
            className="rounded-3xl w-full h-full object-cover aspect-[4/3]"
        />
        </FadeInSection>
      </section>

      {/* The Healed Woman — white background for contrast/rhythm */}
      <section className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12 py-20 text-left">
        <FadeInSection>
          <h1>The Healed Woman</h1>
        </FadeInSection>

        <FadeInSection delay={100} className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            For generations, women have been the backbone of our families, our culture, and our neighborhoods. But too often, we carry our burdens in silence—trauma, stress, financial struggle, and the weight of taking care of everyone except ourselves. Woman Healing Woman was built to change that.
          </p>
          <p>
            Our foundation focuses on restoring the woman first, because when a woman heals, everything around her begins to heal. The children grow stronger. The family becomes more stable. The community becomes more connected. And the tribe begins to rise.
          </p>
        </FadeInSection>
      </section>

      {/* Culture, Wisdom & Sacred Mentorship */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12 py-20 text-left">
        <FadeInSection>
           <img
            src={image}
            alt="Women gathered"
            className="rounded-3xl w-full h-full object-cover aspect-[4/3]"
        />
        </FadeInSection>

        <FadeInSection delay={150} className="flex flex-col gap-6 text-lg leading-relaxed">
          <h1>Culture, Wisdom & Sacred Mentorship.</h1>
          <p>
            We bridge the gap between ancestral knowledge and modern empowerment. Through intimate mentorship and guided circles with our elders, we ensure that the healing wisdom of our ancestors is passed down to the next generation of women leaders, uplifting the entire tribe.
          </p>
        </FadeInSection>
      </section>

      {/* Volunteer/Mentor Application + Visit info — white background */}
      <section className="bg-white grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 lg:px-12 py-20 text-left">

        <FadeInSection className="bg-[#FEF7F6] p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Volunteer/Mentor Application Form</h2>
          <p className="mb-8">Please fill out all required information below.</p>

          <form action="" className="flex flex-col gap-6" onSubmit={handleFormSubmit} method="post">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First name *</label>
                <input type="text" id="firstName" name="firstName" required
                  className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last name *</label>
                <input type="text" id="lastName" name="lastName" required
                  className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email address *</label>
              <input type="email" id="email" name="email" required
                className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone number</label>
              <input type="tel" id="phone" name="phone"
                className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="position">Position you're applying for *</label>
              <select name="position" id="position" required defaultValue=""
                className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none appearance-none focus:ring-2 focus:ring-[#652818]/40">
                <option value="" disabled hidden></option>
                <option value="mentor">Mentor</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="experience">Work experience *</label>
              <textarea id="experience" name="experience" required rows={4}
                className="rounded-3xl bg-[#ecc9b8] px-5 py-3 outline-none resize-none focus:ring-2 focus:ring-[#652818]/40"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label>Available start date *</label>
              <div className="grid grid-cols-3 gap-4">
                <select id="startMonth" name="startMonth" required defaultValue=""
                  className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none appearance-none focus:ring-2 focus:ring-[#652818]/40">
                  <option value="" disabled hidden>Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <input type="number" placeholder="Day" id="startDay" name="startDay" required min="1" max="31"
                  className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
                <input type="number" placeholder="Year" id="startYear" name="startYear" required min="2026"
                  className="rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40" />
              </div>
            </div>

            <button type="submit"
              className="rounded-full bg-[#652818] text-white py-4 text-lg font-medium hover:opacity-90 hover:scale-[1.02] transition mt-2">
              Submit Application
            </button>
          </form>
        </FadeInSection>

        <FadeInSection delay={150} className="flex flex-col gap-6 leading-relaxed">
          <h1>One Healed Woman at a Time</h1>
          <p className="text-lg">
            Every contribution strengthens our circle. Your support directly funds our cultural mentorship circles, holistic wellness retreats, and the sacred space where our sisters heal and rediscover their power.
          </p>
          <div className="bg-[#FCECE3] rounded-2xl px-6 py-6 mt-4">
            <p className="text-xl font-semibold">Visit Our Sanctuary</p>
            <p className="text-lg mt-2">
              <MapPinIcon />1107 B Beatties Ford Rd, Charlotte, NC 28216
            </p>
          </div>
        </FadeInSection>
      </section>

    </div>
  );
};

export default HomePage;