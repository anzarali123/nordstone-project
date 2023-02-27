import { createContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const UserContext = createContext({
  user: INITIAL_STATE.user,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_STATE.user);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
