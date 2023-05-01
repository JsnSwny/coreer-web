import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { Profile } from "@/interfaces/profile.model";
import { server } from "@/config";

interface AuthContextType {
  user: Profile | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${server}/api/auth/login`, {
        email,
        password,
      });

      const user = response.data.user;
      setUser(user);

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token");

    axios.post(`${server}/api/auth/logout`);
  };

  const fetchUser = useCallback(() => {
    let token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;

      axios
        .get(`${server}/api/auth/user`, config)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
