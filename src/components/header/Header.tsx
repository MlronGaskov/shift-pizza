import { NavLink } from "react-router-dom";
import logoPizza from "../../assets/images/header/logo.svg"
import logoProfile from "../../assets/images/header/profile-logo.svg"
import logoOrders from "../../assets/images/header/orders-logo.svg"
import logoCart from "../../assets/images/header/cart-logo.svg"
import logoSingIn from "../../assets/images/header/sing-in-logo.svg"
import logoSingOut from "../../assets/images/header/sing-out-logo.svg"
import { HeaderLink, HeaderButton } from "./HeaderLink";
import { useAuthTokenInterface } from "../../hooks/useAuthToken";

import "../../styles/header/Header.css"

export const Header: React.FC<{authorization: useAuthTokenInterface}> = ({authorization}) => {
  const linkToProfile = <HeaderLink link={authorization.token !== "" ? "/profile" : "/auth/login"} text="Профиль" logo={logoProfile}></HeaderLink>
  const linkToOrders = <HeaderLink link={authorization.token !== "" ? "/orders" : "/auth/login"} text="Заказы" logo={logoOrders}></HeaderLink>
  const linkToCart = <HeaderLink link="/cart" text="Корзина" logo={logoCart}></HeaderLink>
  const linkToSingIn = <HeaderLink link="/auth/login" text="Войти" logo={logoSingIn}></HeaderLink>
  const ToSingOut = <HeaderButton onClick={authorization.signOut} text="Выйти" logo={logoSingOut}></HeaderButton>

  return (
    <>
      <header className="header">
        <div className="header-content">
          <NavLink to="/">
            <img src={logoPizza} className="header-content-logo"/>
          </NavLink>
          <nav className="header-nav-links">
            <div>
              {linkToProfile}
              {linkToOrders}
            </div>
            <div>
              {linkToCart}
              {authorization.token !== "" ? ToSingOut : linkToSingIn}
            </div>
          </nav>
        </div>
      </header>
			<div className="divider"/>
		</>
  );
};
