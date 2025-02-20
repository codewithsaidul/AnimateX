import PropTypes from "prop-types";

const Tabs = ({ activeTab, setActiveTab }) => {

  const tabs = ["Info", "Trailer", "Cast"];

  return (
    <div className="border-t-2 border-b-2 border-white py-5 mt-7 flex gap-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-white text-sm font-semibold py-1 px-4 ${
            activeTab === tab && "bg-primary rounded-md"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default Tabs;
