import PropTypes from "prop-types";

const Info = ({ images }) => {

  const ss = images.posters || images.backdrops;

  return (
    <div className="text-white mt-7">

      <h5 className="text-normalText text-sm font-normal mb-5">Screenshots</h5>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        {ss.slice(0, 10).map((image) => (
          <figure key={image.file_path} className="w-full h-full">
            <img
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              alt=""
              className="w-full h-full"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </div>
  );
};

Info.propTypes = {
  images: PropTypes.object,
};

export default Info;
