import { useNavigate } from "react-router-dom";

const EventPanel = ({ EventName, EventDate, EventLocation, EventImage }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl overflow-hidden bg-[#FCECE3] w-full max-w-xs mx-auto shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-56 w-full">
        <img src={EventImage} alt={EventName} className="w-full h-full object-cover" />
      </div>

      <div className="px-6 py-6 text-center flex flex-col items-center gap-3">
        <h2 className="text-2xl font-semibold leading-tight">{EventName}</h2>

        <div className="text-sm font-medium w-full truncate">
          <span>{EventDate}</span>
          <span className="mx-2">|</span>
          <span>{EventLocation}</span>
        </div>

        <a href="" className="underline underline-offset-4 mt-1">
          More info
        </a>

        <button
          onClick={() => { navigate("/join"); }}
          className="w-full rounded-xl bg-[#652818] text-white py-3 text-lg font-medium hover:opacity-90 transition mt-2"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default EventPanel;