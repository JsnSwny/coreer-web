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
import cookie from "cookie";

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
      document.cookie = cookie.serialize("token", response.data.token, {
        maxAge: 3600, // expires after 1 hour
        path: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
      axios
        .post(`${server}/api/auth/logout`, null, config)
        .then((res) => {
          localStorage.removeItem("token");
          document.cookie = cookie.serialize("token", "", {
            maxAge: 0,
            path: "/",
          });
          setUser(null);
        })
        .catch((err) => console.log(err));
    }
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
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
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
