import React from 'react'
import { useUserContext } from '../../../context/userContext';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Search from './Search';

const Header = () => {
    const { userData, logout } = useUserContext();
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate(`/profile/${userData.firstName}`, {
          state: { id: userData._id },
        });
      };
  
  return  (
  <div>
    <nav>
  <Link to="/">home</Link>
  <br/>
  <Link to="/cart">cart </Link>
  <br/>
  <Search/>
  {!userData ? (
  <>
  
  <Link to="/register">register</Link>
  <br/>
  <Link to="/login">login</Link>
  </>
  ) : (
    <>
    <Button onClick={navigateToProfile}>profile</Button>
    <Button onClick={logout}>logout</Button>
    </>
  )}
  
 </nav>
</div>
  )
};

export default Header;