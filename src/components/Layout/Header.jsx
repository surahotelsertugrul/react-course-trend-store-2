import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onShowCart, cartIsShow }) => {
  return (
    <header className="header">
      <h1>Trend Mağaza</h1>
      <HeaderCartButton onShowCart={onShowCart} cartIsShow={cartIsShow} />
    </header>
  );
};

export default Header;
