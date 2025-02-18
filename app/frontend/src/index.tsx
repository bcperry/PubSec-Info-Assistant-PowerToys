// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from "react";
import { useEffect} from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";
import { MsalProvider } from '@azure/msal-react';

import { PublicClientApplication } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType, InteractionRequiredAuthError } from '@azure/msal-browser';import { loginRequest, msalConfig } from "./auth/authConfig";

import "./index.css";

import { Layout } from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import Chat from "./pages/chat/Chat";
import Content from "./pages/content/Content";
import Tutor from "./pages/tutor/Tutor";
import { Tda } from "./pages/tda/Tda";

initializeIcons();

const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize();
// // Get token using popup experience
// try {
//     const graphToken = await msalInstance.acquireTokenPopup({
//         scopes: ["User.Read"]
//     });
//     console.log("graphToken", graphToken);
// } catch(error) {
//     console.log(error)
// }

// // Call the Graph API
// const headers = new Headers();
// const bearer = `Bearer ${graphToken}`;

// headers.append("Authorization", bearer);

// fetch("https://graph.microsoft.us/v1.0/me", {
//     method: "GET",
//     headers: headers
// })

// console.log("graphToken", graphToken);
// console.log("msalInstance", msalInstance);



export default function App() {

    useEffect(() => {
        msalInstance.handleRedirectPromise().then(() => {
          if (!msalInstance.getAllAccounts().length) {
            msalInstance.loginRedirect();
          }
        });
      }, []);

    const accounts = msalInstance.getAllAccounts();
    const account = accounts.length > 0 ? accounts[0] : null;
    
    console.log("account", account?.idTokenClaims?.roles);

    return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Chat />} />
                      <Route path="content" element={
                        account?.idTokenClaims?.roles?.includes("data_manager") ? <Content /> : <Navigate to="/" />
                      } />
                      <Route path="*" element={<NoPage />} />
                      <Route path="tutor" element={<Tutor />} />
                      <Route path="tda" element={<Tda folderPath={""} tags={[]} />} />
                    </Route>
                </Routes>
            </HashRouter>
    );
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
    </React.StrictMode>
);