import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "../ui/menubar"

export function Navbar() {
    return (
       <nav className="w-[100vw] h-[5rem] flex justify-between items-center p-3">
           <h1 id="logo" className="md:text-2xl font-bold">
               Quizz App
           </h1>
           <Menubar>
             <MenubarMenu>
                 <MenubarTrigger className="text-xs md:text-base">Discover</MenubarTrigger>
                 <MenubarContent>
                     <MenubarItem className="text-xs md:text-base">Latest</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem className="text-xs md:text-base">Highest Rate</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem className="text-xs md:text-base">Search Specific</MenubarItem>
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
                   <MenubarTrigger className="text-xs md:text-base">Account</MenubarTrigger>
                   <MenubarContent>
                       <MenubarItem className="text-xs md:text-base">Log In</MenubarItem>
                       <MenubarItem className="text-xs md:text-base">Create</MenubarItem>
                   </MenubarContent>
               </MenubarMenu>
           </Menubar>
       </nav>
    )
}
