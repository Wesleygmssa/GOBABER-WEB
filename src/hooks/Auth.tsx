import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  //
  const [data, setData] = useState<AuthState>(() => {
    ////pegando token
    const token = localStorage.getItem("@GoBarber:token");
    const user = localStorage.getItem("@GoBarber:user");

    if (token && user) {
      // tranformando de volta em objeto
      // se encontrar o token e user no localstorage
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState; //hack , se não achar retorna um objto vazio
  });

  const signIn = useCallback(async ({ email, password }) => {
    //
    const response = await api.post("sessions", { email, password }); //fazendo login
    //   console.log(response.data)// saber o que esta sendo retornado
    const { token, user } = response.data;

    localStorage.setItem("@GoBarber:token", token); //salvando no navegador
    localStorage.setItem("@GoBarber:user", JSON.stringify(user));

    setData({ token, user }); //preenchendo o estado
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token"); //pegando no navegador
    localStorage.removeItem("@GoBarber:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext); // passando o contexto global.

  if (!context) {
    // verificando se contexto foi criado
    //
    throw new Error("useAuth must be used within an AuthProvider");
    //
  }

  return context; // se econtrar retorn contexto
}
