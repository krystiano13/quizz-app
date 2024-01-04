import React from 'react';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "../ui/menubar"

export function Navbar() {
    return (
       <nav className="w-[100vw] h-[5rem] flex justify-between items-center p-3">
           <h1 id="logo" className="text-2xl font-bold">
               Quizz App
           </h1>
           <Menubar>
             <MenubarMenu>
                 <MenubarTrigger>Discover</MenubarTrigger>
                 <MenubarContent>
                     <MenubarItem>Latest</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem>Highest Rate</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem>Search Specific</MenubarItem>
                 </MenubarContent>
             </MenubarMenu>
               <MenubarMenu>
                   <MenubarTrigger>Your Quizzes</MenubarTrigger>
                   <MenubarContent>
                       <MenubarItem>Create</MenubarItem>
                       <MenubarSeparator />
                       <MenubarItem>Show</MenubarItem>
                   </MenubarContent>
               </MenubarMenu>
           </Menubar>
       </nav>
    )
}
