import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "../ui/menubar"

interface Props {
    isLogged: boolean,
    username: string,
    checkLogin: () => void
}

export const Navbar:React.FC<Props> = ({ isLogged, username, checkLogin }) => {
    const cookies = new Cookies();
    function logout() {
        cookies.remove("quizzapp_token");
        cookies.remove("quizzapp_username");
        checkLogin();
    }

    return (
       <nav className="w-[100vw] h-[5rem] flex justify-between items-center p-3 fixed">
           <NavLink to="/">
               <h1 id="logo" className="md:text-2xl font-bold">
                   Quizz App
               </h1>
           </NavLink>
           <Menubar>
               <MenubarMenu>
                   <MenubarTrigger className="text-xs md:text-base">Discover</MenubarTrigger>
                 <MenubarContent>
                     <NavLink to='/'>
                         <MenubarItem className="text-xs md:text-base">Latest</MenubarItem>
                     </NavLink>
                     <MenubarSeparator />
                     <NavLink to='/?highestRated=yes'>
                         <MenubarItem className="text-xs md:text-base">Highest Rate</MenubarItem>
                     </NavLink>
                     <MenubarSeparator />
                     <NavLink to='/search'>
                         <MenubarItem className="text-xs md:text-base">Search Specific</MenubarItem>
                     </NavLink>
                 </MenubarContent>
             </MenubarMenu>
               <MenubarMenu>
                   <MenubarTrigger className="text-xs md:text-base">Your Quizzes</MenubarTrigger>
                   <MenubarContent>
                       {
                           isLogged &&
                           <>
                               <NavLink to='/quizzeditor?mode=create'>
                                   <MenubarItem className="text-xs md:text-base">Create</MenubarItem>
                               </NavLink>
                               <MenubarSeparator />
                               <NavLink to='/?quizztoedit=1'>
                                   <MenubarItem className="text-xs md:text-base">Show</MenubarItem>
                               </NavLink>
                           </>
                       }
                   </MenubarContent>
               </MenubarMenu>
           </Menubar>
           <Menubar>
               <MenubarMenu>
                   <MenubarTrigger className="text-xs md:text-base">
                       {
                           isLogged ? username : "Account"
                       }
                   </MenubarTrigger>
                   <MenubarContent>
                       {
                           !isLogged &&
                           <>
                               <NavLink to='/login'>
                                   <MenubarItem className="text-xs md:text-base">Log In</MenubarItem>
                               </NavLink>
                               <NavLink to='/register'>
                                   <MenubarItem className="text-xs md:text-base">Create</MenubarItem>
                               </NavLink>
                           </>
                       }
                       {
                           isLogged &&
                           <>
                               <NavLink to={`/profile?username=${username}`}>
                                   <MenubarItem className="text-xs md:text-base">Profile</MenubarItem>
                               </NavLink>
                               <MenubarItem onClick={logout} className="text-xs md:text-base">Log Out</MenubarItem>
                           </>
                       }
                   </MenubarContent>
               </MenubarMenu>
           </Menubar>
       </nav>
    )
}
