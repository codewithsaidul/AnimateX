import Fetured from "../components/Home/Fetured"
import Hero from "../components/Home/Hero"


const Home = () => {
  return (
    <div className="pt-16">
      <div className="w-full">
        <Hero />
        <Fetured />
      </div>

      {/* <div className="min-h-screen w-[20%] bg-rose-400"></div> */}
    </div>
  )
}

export default Home