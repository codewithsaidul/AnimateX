import PropTypes from "prop-types";

const Cast = ({ casts }) => {

  return (
    <div className="mt-7">
      <h5 className="text-normalText text-sm font-normal mb-5">Cast</h5>

      {/* ========== Cast Container ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {casts.length > 0 ? (
          casts.map((act) => (
            <div key={act.id} className="flex items-center gap-3">
                <figure className="w-40 h-40 rounded-full">
                  <img
                    src={`https://image.tmdb.org/t/p/original${act.profile_path}`}
                    alt={act.name}
                    className="w-full h-full rounded-full"
                    loading="lazy"
                  />
                </figure>

                <div className="space-y-2">
                    <h2 className="text-xl text-white  font-bold">Character Name: {act.character}</h2>
                    <p className="text-lg font-medium text-normalText">Orginal Name: {act.name}</p>
                    <div className="flex gap-5 items-center text-normalText font-light">
                        <p>{act.known_for_department}</p>
                        <span>Popularty {act.popularity.toFixed(2)}</span>
                    </div>
                </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">❌ No Cast Found</p>
        )}
      </div>
    </div>
  );
};

Cast.propTypes = {
  casts: PropTypes.object,
};

export default Cast;
