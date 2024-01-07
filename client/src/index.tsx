import React from "react";
import { createRoot } from 'react-dom/client';
import { Root } from "./Root";
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from './components/ui/toaster';

import './global.css';
import './output.min.css';

const rootDiv: HTMLDivElement | null = document.querySelector('#root');
const App = createRoot(rootDiv as HTMLDivElement);

App.render(
    <>
        <ThemeProvider>
            <Root />
            <Toaster />
        </ThemeProvider>
    </>
)