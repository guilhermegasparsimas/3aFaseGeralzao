import React from 'react'
import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
    <nav>
        <NavLink to="/" end>
            Home
        </NavLink>
        <p></p>
        <NavLink to="/sobre" end>
            Sobre
        </NavLink>

    </nav>
    </>
  )
}

export default Header