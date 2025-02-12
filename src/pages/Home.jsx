import Fetured from "../components/Home/Fetured"
import Genre from "../components/Home/Genre"
import Hero from "../components/Home/Hero"
import LatestMovies from "../components/Home/LatestMovies"
import TvWebSeries from "../components/Home/TvWebSeries"
import UpComingMovies from "../components/Home/UpComingMovies"


const Home = () => {
  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <Hero />
        <Fetured />
        <LatestMovies />
        <TvWebSeries />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <UpComingMovies />
        <Genre />
      </div>
    </div>
  )
}

export default Home