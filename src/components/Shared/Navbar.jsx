import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
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
      path: "/genres",
    },
    {
      title: "Upcoming",
      path: "/upcoming",
    },
  ];

  return (
    <header className="header">
      <nav className="px-6 mx-auto nav">
        <div className="nav__menu">
            <a href="/" className="nav__logo">
              <img src="public/Logo.svg" alt="logo" />
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

        <div className="header__search">
            <input type="text"  placeholder="Search..." />
            <FaMagnifyingGlass size={24}/>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
