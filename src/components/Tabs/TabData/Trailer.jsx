import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const Trailer = ({ videos }) => {

  return (
    <div className="mt-7">
        <h5 className="text-normalText text-sm font-normal mb-5">Trailers</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {videos.length > 0 ? (
            videos.slice(0, 4).map((video) => (
              <ReactPlayer
                key={video.key}
                url={`https://www.youtube.com/watch?v=${video.key}`}
                controls
                width={"100%"}
              />
            ))
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-red-500">❌ No trailer available</p>
          )}
        </div>
    </div>
  );
};

Trailer.propTypes = {
  videos: PropTypes.object,
};

export default Trailer;
