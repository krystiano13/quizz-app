import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "../ui/menubar"

export function Navbar() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("Admin");
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
                       <MenubarItem className="text-xs md:text-base">Create</MenubarItem>
                       <MenubarSeparator />
                       <MenubarItem className="text-xs md:text-base">Show</MenubarItem>
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
                               <MenubarItem className="text-xs md:text-base">Profile</MenubarItem>
                               <MenubarItem className="text-xs md:text-base">Log Out</MenubarItem>
                           </>
                       }
                   </MenubarContent>
               </MenubarMenu>
           </Menubar>
       </nav>
    )
}
