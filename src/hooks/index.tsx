import React from "react";

import { AuthProvider } from "./auth";
import { Toastprovider } from "./toast";

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <Toastprovider>{children}</Toastprovider>
    </AuthProvider>
  );
};

export default AppProvider;
