import React from 'react'
import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
    <nav className='flex bg-green-700 gap-4 p-3 justify-center'>
        <NavLink to="/" end>
            Home
        </NavLink>
        <NavLink to="/sobre" end>
            Sobre
        </NavLink>
        <NavLink to="/blog" end>
            Blog
        </NavLink>

    </nav>
    </>
  )
}

export default Header