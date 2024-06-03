import logo from "../assets/logo.png";
import logo20 from "../assets/20_anos.png";

const imgClass = "w-32 h-32 object-contain";

function Header() {
  return (
    <header className="flex justify-between items-center w-full p-8">
      <div className="flex flex-row gap-2 items-center justify-center">
        <img src={logo} alt="Logo" className={imgClass} />
      </div>
      <img src={logo20} alt="20 anos" className={imgClass} />
    </header>
  );
}

export default Header;
