import PropTypes from "prop-types";

const NoMovie = ({ title }) => {
  return (
    <div className="text-white text-6xl">
      <h3>
        Not Found <span className="text-primary">{title}</span>
      </h3>

      <div className="mt-8">
        <h5 className="text-2xl text-normalText font-semibold">Suggestion: </h5>
        <div className="flex gap-1 pl-7 mt-5">
          <div className="w-2 h-2 bg-white mt-2"></div>
          <p className="text-sm font-normal text-white">
            The movie may not be on the site. Or you may have typed the wrong
            name in the search. Search the movie name on Google to find the
            correct name.
          </p>
        </div>
      </div>
    </div>
  );
};

NoMovie.propTypes = {
  title: PropTypes.string,
};
export default NoMovie;
