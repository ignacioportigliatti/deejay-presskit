import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full flex items-center justify-center dark:bg-stone-900">{children}</div>
  );
};

export default AuthLayout;
