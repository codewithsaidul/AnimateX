import Genre from "../components/Home/Genre";
import AllUpcoming from "../components/Upcoming/AllUpcoming";

const Upcoming = () => {
  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <AllUpcoming />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <Genre />
      </div>
    </div>
  );
};

export default Upcoming;
