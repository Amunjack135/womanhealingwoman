import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "/firebase";

/* ── small reusable input style ── */
const inputClass =
  "rounded-full bg-[#ecc9b8] px-5 py-3 outline-none focus:ring-2 focus:ring-[#652818]/40 w-full";
const labelClass = "text-sm font-medium mb-1 block";

/* ── toast notification ── */
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg text-white transition-all
        ${type === "success" ? "bg-[#652818]" : "bg-red-600"}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 text-xl leading-none">×</button>
    </div>
  );
};

/* ── volunteer detail modal ── */
const VolunteerModal = ({ volunteer, onClose }) => {
  if (!volunteer) return null;
  const d = volunteer.formData || {};

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 z-50 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-5 text-2xl text-[#652818] hover:opacity-60">×</button>

        <h2 className="text-2xl font-semibold mb-6">
          {d.firstName} {d.lastName}
        </h2>

        <div className="flex flex-col gap-4 text-sm">
          {[
            { label: "Position", value: d.position },
            { label: "Email", value: d.email },
            { label: "Phone", value: d.phone },
            {
              label: "Available Start Date",
              value: d.startMonth && d.startDay && d.startYear
                ? `${d.startMonth}/${d.startDay}/${d.startYear}`
                : "—",
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3">
              <span className="font-semibold w-36 flex-shrink-0">{label}:</span>
              <span className="capitalize">{value || "—"}</span>
            </div>
          ))}

          {d.experience && (
            <div className="mt-2">
              <span className="font-semibold block mb-1">Work Experience:</span>
              <p className="bg-[#FCECE3] rounded-2xl px-4 py-3 leading-relaxed">
                {d.experience}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── update event modal ── */
const UpdateEventModal = ({ event, onClose, onUpdate }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 z-50">
        <button onClick={onClose} className="absolute top-4 right-5 text-2xl text-[#652818] hover:opacity-60">×</button>
        <h2 className="text-xl font-semibold mb-6">Update Event</h2>

        <form onSubmit={onUpdate} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Event Name</label>
            <input
              type="text"
              name="eventName"
              defaultValue={event.eventName}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Event Date</label>
            <input
              type="date"
              name="eventDate"
              defaultValue={event.eventDate}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              defaultValue={event.eventLocation}
              required
              className={inputClass}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#652818] text-white py-3 font-medium hover:opacity-90 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border-2 border-[#652818] text-[#652818] py-3 font-medium hover:bg-[#652818]/5 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── main admin page ── */
const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [volunteersMentors, setVolunteersMentors] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("events");

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3500);
  };

  useEffect(() => {
    fetch_events();
    fetch_volunteers_mentors();
  }, []);

  async function add_event(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const formPayload = Object.fromEntries(formData.entries());

    // NOTE: eventImage is a File object — to store images you need Firebase Storage.
    // For now, image is excluded. To add it:
    // 1. import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
    // 2. Upload the file, get the download URL, then store that URL string in Firestore.
    delete formPayload.eventImage;

    try {
      const docRef = await addDoc(collection(db, "events"), formPayload);
      setEvents((prev) => [...prev, { id: docRef.id, ...formPayload }]);
      e.target.reset();
      showToast("Event added successfully!");
    } catch (err) {
      showToast("Error adding event.", "error");
    }
    setLoading(false);
  }

  async function delete_event(id) {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      showToast("Event deleted.");
    } catch (err) {
      showToast("Error deleting event.", "error");
    }
  }

  async function update_event(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formPayload = Object.fromEntries(formData.entries());
    try {
      await updateDoc(doc(db, "events", editingEvent.id), formPayload);
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...formPayload } : ev
        )
      );
      setEditingEvent(null);
      showToast("Event updated!");
    } catch (err) {
      showToast("Error updating event.", "error");
    }
  }

  async function fetch_events() {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      setEvents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast("Error fetching events.", "error");
    }
  }

  async function fetch_volunteers_mentors() {
    try {
      const snapshot = await getDocs(collection(db, "volunteer_mentors"));
      setVolunteersMentors(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showToast("Error fetching volunteers.", "error");
    }
  }

  const tabClass = (tab) =>
    `px-6 py-2.5 rounded-full font-medium transition text-sm ${
      activeTab === tab
        ? "bg-[#652818] text-white"
        : "border-2 border-[#652818] text-[#652818] hover:bg-[#652818]/5"
    }`;

  return (
    <div className="min-h-screen px-6 lg:px-12 py-12 text-left pt-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-1">Admin Dashboard</h1>
        <p className="text-lg">Manage events and view volunteer & mentor applications.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-10 flex-wrap">
        <button className={tabClass("events")} onClick={() => setActiveTab("events")}>
          Events
        </button>
        <button className={tabClass("volunteers")} onClick={() => setActiveTab("volunteers")}>
          Volunteers & Mentors
          {volunteersMentors.length > 0 && (
            <span className="ml-2 bg-white text-[#652818] rounded-full text-xs px-2 py-0.5 font-bold">
              {volunteersMentors.length}
            </span>
          )}
        </button>
      </div>

      {/* ── EVENTS TAB ── */}
      {activeTab === "events" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Add Event Form */}
          <div className="bg-[#FEF7F6] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Add New Event</h2>
            <form onSubmit={add_event} className="flex flex-col gap-5">
              <div>
                <label className={labelClass}>Event Name *</label>
                <input type="text" name="eventName" required placeholder="e.g. Healing Circle Retreat" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Event Date *</label>
                <input type="date" name="eventDate" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Event Location *</label>
                <input type="text" name="eventLocation" required placeholder="e.g. Charlotte, NC" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Event Image</label>
                <input
                  type="file"
                  name="eventImage"
                  accept="image/*"
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-medium file:bg-[#652818] file:text-white hover:file:opacity-90"
                />
                <p className="text-xs mt-1 opacity-60">Image upload requires Firebase Storage setup.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#652818] text-white py-3 font-medium hover:opacity-90 transition disabled:opacity-50 mt-2"
              >
                {loading ? "Adding..." : "Add Event"}
              </button>
            </form>
          </div>

          {/* Event List */}
          <div>
            <h2 className="text-xl font-semibold mb-6">
              Current Events
              <span className="ml-2 text-base font-normal opacity-60">({events.length})</span>
            </h2>

            {events.length === 0 ? (
              <div className="bg-[#FEF7F6] rounded-3xl p-10 text-center">
                <p className="opacity-60">No events yet. Add your first one.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl px-6 py-5 shadow-sm flex items-center justify-between gap-4 flex-wrap"
                  >
                    <div>
                      <p className="font-semibold">{event.eventName}</p>
                      <p className="text-sm opacity-60 mt-0.5">
                        {event.eventDate} · {event.eventLocation}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="px-4 py-2 rounded-full border-2 border-[#652818] text-[#652818] text-sm font-medium hover:bg-[#652818]/5 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => delete_event(event.id)}
                        className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── VOLUNTEERS TAB ── */}
      {activeTab === "volunteers" && (
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Applications
            <span className="ml-2 text-base font-normal opacity-60">({volunteersMentors.length})</span>
          </h2>

          {volunteersMentors.length === 0 ? (
            <div className="bg-[#FEF7F6] rounded-3xl p-10 text-center max-w-md">
              <p className="opacity-60">No applications submitted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {volunteersMentors.map((person) => {
                const d = person.formData || {};
                return (
                  <div
                    key={person.id}
                    className="bg-white rounded-2xl px-6 py-5 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {d.firstName} {d.lastName}
                      </p>
                      <p className="text-sm capitalize opacity-60 mt-0.5">
                        {d.position || "Applicant"}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedVolunteer(person)}
                      className="px-4 py-2 rounded-full bg-[#652818] text-white text-sm font-medium hover:opacity-90 transition flex-shrink-0"
                    >
                      View
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <VolunteerModal
        volunteer={selectedVolunteer}
        onClose={() => setSelectedVolunteer(null)}
      />
      <UpdateEventModal
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onUpdate={update_event}
      />

      {/* Toast */}
      <Toast
        message={toast.text}
        type={toast.type}
        onClose={() => setToast({ text: "", type: "" })}
      />
    </div>
  );
};

export default AdminPage;