 import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Movies",
      path: "/movies",
    },
    {
      title: "Genres",
      path: "/genres/tv-web-series",
    },
    {
      title: "Upcoming",
      path: "/upcoming",
    },
  ];


  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="header">
      <nav className="px-6 mx-auto nav">
        <div className="nav__menu">
          <a href="/" className="nav__logo">
            <img src="/Logo.svg" alt="logo" />
            <h3 className="text-primary">AnimateX</h3>
          </a>

          <div>
            <ul className="nav__list">
              {navLinks.map((link, index) => (
                <li key={index} className="nav__item">
                  <a href={link.path} className="nav__link">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSearch} className="header__search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          <button>
            <FaMagnifyingGlass size={24} />
          </button>
        </form>

      </nav>
    </header>
  );
};

export default Navbar;
