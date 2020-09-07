import React, { createContext, useContext, useCallback, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { uuid } from "uuidv4";

export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

//
const ToastContext = createContext<ToastContextData>({} as ToastContextData);
//
const Toastprovider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, "id">) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      // setMessages((oldMessage) => [...oldMessage, toast]);
      setMessages([...messages, toast]);
    },
    [messages]
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  //
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {" "}
      {/* Informações que passada globalmente */}
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

//hoock
function useToast(): ToastContextData {
  const context = useContext(ToastContext); //variavel global

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { Toastprovider, useToast };
