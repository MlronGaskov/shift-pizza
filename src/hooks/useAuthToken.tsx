import { useState } from 'react';

export interface useAuthTokenInterface {
    "token": string,
    "signIn": (token: string) => void,
    "signOut": () => void,
}

const useAuthToken = (): useAuthTokenInterface => {
    const [token, setToken] = useState<string>("");
    return {
        "token": token,
        "signIn": (authToken: string) => setToken(authToken),
        "signOut": () => setToken(""),
    };								 
}

export default useAuthToken;