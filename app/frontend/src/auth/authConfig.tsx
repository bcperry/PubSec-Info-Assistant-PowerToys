/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

interface AuthConfig {
    clientId: string;
    authority: string;
    redirectUri: string;
}

interface CacheConfig {
    cacheLocation: string;
    storeAuthStateInCookie: boolean;
}

interface LoggerOptions {
    loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => void;
}

interface SystemConfig {
    loggerOptions: LoggerOptions;
}

interface MsalConfig {
    auth: AuthConfig;
    cache: CacheConfig;
    system: SystemConfig;
}

export const msalConfig: MsalConfig = {
    auth: {
        clientId: "44c241f0-d5d2-420e-9cdd-ad37da27b89b", // Replace with your Azure AD app client ID
        authority: "https://login.microsoftonline.us/03f141f3-496d-4319-bbea-a3e9286cab10", // Replace with your tenant ID
        redirectUri: "http://localhost:5173", // Replace with your redirect URI
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["openid"],
};


/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
// export const silentRequest = {
//     scopes: ["openid", "profile"],
//     loginHint: "example@domain.net"
// };

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};