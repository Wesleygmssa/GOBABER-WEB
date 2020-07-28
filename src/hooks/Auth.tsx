import React, { createContext, useCallback, useState, useContext, } from 'react';
import api from '../services/api';

interface SingnInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: Object;
    signIn(credentials: SingnInCredentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: Object;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token'); //PEGANDO NO NAVEGADOR
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    })

    const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('sessions', { email, password }); // RETORNO DA API DO BACK-END

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token); //SALVANDO NO NAVEGADOR
        localStorage.setItem('@GoBarber:user', JSON.stringify(token));

        setData({ token, user });

    }, []);

    const signOut = useCallback(()  =>{
    localStorage.removeItem('@GoBarber:token'); //PEGANDO NO NAVEGADOR
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context;
}





