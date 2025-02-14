import Fetured from "../components/Home/Fetured"
import Genre from "../components/Home/Genre"
import UpComingMovies from "../components/Home/UpComingMovies"
import Movies from "../components/Movie/Movies"

const AllMovie = () => {
  return (
    <div className="pt-16 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[75%]">
        <Fetured />
        <Movies />
      </div>

      <div className="min-h-screen w-full lg:w-[25%] px-6">
        <UpComingMovies />
        <Genre />
      </div>
    </div>
  )
}

export default AllMovie