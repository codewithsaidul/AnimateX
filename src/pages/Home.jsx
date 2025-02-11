import Fetured from "../components/Home/Fetured"
import Genre from "../components/Home/Genre"
import Hero from "../components/Home/Hero"


const Home = () => {
  return (
    <div className="pt-16 flex gap-6">
      <div className="w-[75%]">
        <Hero />
        <Fetured />
      </div>

      <div className="min-h-screen w-[25%]">
        <Genre />
      </div>
    </div>
  )
}

export default Home