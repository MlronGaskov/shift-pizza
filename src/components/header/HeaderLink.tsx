import { NavLink } from "react-router-dom";
import "../../styles/header/HeaderLink.css"

interface HeaderLinkProps {
  link: string,
  logo: string,
  text: string,
}

interface HeaderButtonProps {
  onClick: () => void,
  logo: string,
  text: string,
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({link, logo, text}: HeaderLinkProps) => {
  return (
    <NavLink to={link} className="header-nav-link">
      <img src={logo} className="header-nav-link-logo"/>
      <div className="header-nav-link-text">{text}</div>
    </NavLink>
  );
};

export const HeaderButton: React.FC<HeaderButtonProps> = ({onClick, logo, text}: HeaderButtonProps) => {
  return (
    <div onClick={onClick} className="header-nav-link">
      <img src={logo} className="header-nav-link-logo"/>
      <div className="header-nav-link-text">{text}</div>
    </div>
  );
};

