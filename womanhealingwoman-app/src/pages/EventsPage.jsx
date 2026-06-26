import { useState } from "react";
import EventPanel from "../components/EventPanel";
import FadeInSection from "../components/FadeInSection";

const mockEvents = [
  // {
  //   id: 1,
  //   EventName: "Global Women Empowerment Conference",
  //   EventDate: "Wed, Oct 08",
  //   EventLocation: "Charlotte, NC",
  //   EventImage: sitting,
  // },
  // {
  //   id: 2,
  //   EventName: "Healing Circle Retreat",
  //   EventDate: "Sat, Nov 14",
  //   EventLocation: "Charlotte, NC",
  //   EventImage: sitting,
  // },
  // {
  //   id: 3,
  //   EventName: "Mentorship Kickoff Gathering",
  //   EventDate: "Sun, Dec 06",
  //   EventLocation: "Charlotte, NC",
  //   EventImage: sitting,
  // },
];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

const EventsPage = () => {
  // Temporary dev toggle — flip to false to preview the empty state.
  // Once you have a real events source, replace this with something like
  // `mockEvents.length > 0` based on actual fetched data.
  const [isEvents] = useState(true);
  const events = isEvents ? mockEvents.slice(0, 3) : [];

  return (
    <div className="text-center">
      <section className="px-6 lg:px-12 pt-16 pb-4">
        <FadeInSection>
          <h1>Upcoming Events</h1>
          <p className="mx-auto text-lg mt-4">
            Join us at our upcoming gatherings, circles, and conferences as we continue healing and raising the tribe together.
          </p>
        </FadeInSection>
      </section>



      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12 py-16 justify-center">
          {events.map((event, index) => (
            <FadeInSection key={event.id} delay={index * 100}>
              <EventPanel
                EventName={event.EventName}
                EventDate={event.EventDate}
                EventLocation={event.EventLocation}
                EventImage={event.EventImage}
              />
            </FadeInSection>
          ))}
        </div>
      ) : (
        <FadeInSection>
          <div className="max-w-md mx-auto px-6 py-20 flex flex-col items-center gap-5 text-[#652818]">
            <CalendarIcon />
            <h2 className="text-2xl font-semibold">No Events Right Now</h2>
            <p className="text-lg">
              There are no events scheduled at the moment. Stay tuned, more gatherings are on the way.
            </p>
            <a href="https://www.instagram.com/womanhealingwoman/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#652818] text-white px-8 py-3 text-lg font-medium hover:opacity-90 transition mt-2"
            >
              Follow us on Instagram
            </a>
          </div>
        </FadeInSection>
      )}
    </div>
  );
};

export default EventsPage;