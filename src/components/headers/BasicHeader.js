import React from 'react'
import {Link} from 'react-router-dom';
import logo from "../../logo.svg";
import {ROUTES} from "../../constants/routes";

export const BasicHeader = () => {

  return (
    <div className='md:mb-12'>
        <Link to={ROUTES.DASHBOARD}><img 
        className='h-6 md:h-12'
        src={logo} alt="logo"/>
        </Link>
    </div>
  )
}
