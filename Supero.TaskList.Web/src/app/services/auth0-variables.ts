import { environment } from "../../environments/environment";

interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'jKv_7dasmIzgkN2Q3wHlaah75wvYGskV',
    domain: 'fbarbosa.auth0.com',
    callbackURL: environment.callbackURL,
    apiUrl: 'http://localhost:3001'
};
