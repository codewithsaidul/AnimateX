import Genre from "../components/Home/Genre"
import TvWebSeries from "../components/Home/TvWebSeries"
import UpComingMovies from "../components/Home/UpComingMovies"


const ALLWebSeries = () => {
  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <TvWebSeries cusClass="hidden" />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <UpComingMovies />
        <Genre />
      </div>
    </div>
  )
}

export default ALLWebSeries