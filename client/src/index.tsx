import React from "react";
import { createRoot } from 'react-dom/client';
import { Root } from "./Root";

import './global.css';
import './output.css';

const rootDiv: HTMLDivElement | null = document.querySelector('#root');
const App = createRoot(rootDiv as HTMLDivElement);

App.render(
    <>
        <Root />
    </>
)