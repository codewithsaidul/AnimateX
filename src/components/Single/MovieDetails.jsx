import PropTypes from "prop-types";
import { useState } from "react";
import Tabs from "../Tabs/Tabs";
import Info from "../Tabs/TabData/Info";
import Trailer from "../Tabs/TabData/Trailer";
import Cast from "../Tabs/TabData/Cast";
import { FaStar } from "react-icons/fa";

const MovieDetails = ({ movie }) => {
  const [activeTab, setActiveTab] = useState("Info");

  return (
    <div className="px-6 mt-12">
      <div>
        <div className="flex flex-col sm:flex-row gap-5">
          <figure className="w-full h-60 sm:w-[30%] sm:h-52">
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt={movie.title || movie.name}
              className="w-full h-full"
              loading="lazy"
            />
          </figure>
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold">
              {movie.title || movie.name} (
              {movie.release_date
                ? movie.release_date.substring(0, 4)
                : movie.first_air_date?.substring(0, 4)}
              ) Dual Audio [Hindi ORG & Malayalam] WEB-DL 480p, 720p & 1080p |
              GDRive
            </h3>

            <div className="mt-4">
              <ul className="flex gap-3">
                {movie?.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="text-base text-white font-medium"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>

              <p className="text-white text-sm font-light my-1">
                {new Date(
                  movie.release_date || movie.first_air_date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div>
                <div className="flex items-center gap-3">
                  {movie.runtime && (
                    <p className="text-normalText font-light text-sm">
                      Runtime: {movie.runtime}M
                    </p>
                  )}
                  {movie.episode_run_time && (
                    <p className="text-normalText font-light text-sm">
                      Episode Runtime: {movie.episode_run_time}M
                    </p>
                  )}
                  {movie.seasons && (
                    <p className="text-normalText text-sm font-light">
                      Total Seasons: {movie.seasons.length}
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  {movie.original_name && (
                    <p className="text-base text-normalText font-normal">
                      Original Name: {movie.original_name}
                    </p>
                  )}

                  <p className="text-white text-xs flex items-center gap-1">
                    <FaStar size={14} />
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-normalText text-sm font-normal mt-5">
            <span className="text-white font-bold">Overview:</span>{" "}
            {movie.overview}
          </p>
        </div>
      </div>

      {/* data tav container */}

      <div className="">
        {/* tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* tab data */}
        <div>
          {activeTab === "Info" && <Info images={movie.images} />}
          {activeTab === "Trailer" && <Trailer videos={movie.videos.results} />}
          {activeTab === "Cast" && <Cast casts={movie.credits.cast} />}
        </div>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object,
};

export default MovieDetails;
