import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosError } from "axios";
import { Profile } from "@/interfaces/profile.model";
import { server } from "@/config";
import cookie from "cookie";
import {
  WorkExperience,
  WorkExperienceRequest,
} from "@/interfaces/work_experiences.model";
import { Project, ProjectRequest } from "@/interfaces/project.model";
import { EducationRequest } from "@/interfaces/education.model";
import { getUserConfig } from "@/utils/getUserConfig";

interface AuthContextType {
  user: Profile | null;
  userToken: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string, passwordConfirm: string) => void;
  loading: boolean;
  setUser: (profile: Profile | null) => void;
  updateProfilePicture: (file: File) => void;
  updateUser: (data: object) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  loading: false,
  setUser: () => {},
  updateProfilePicture: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${server}/api/auth/login`, {
        email,
        password,
      });

      const user = response.data.user;
      setUser(user);
      setUserToken(response.data.token);

      localStorage.setItem("token", response.data.token);
      document.cookie = cookie.serialize("token", response.data.token, {
        maxAge: 3600,
        path: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      await axios
        .post(`${server}/api/auth/register`, {
          email,
          password,
          passwordConfirm,
        })
        .then((res) => {
          const user = res.data.user;
          setUser(user);
          setUserToken(res.data.token);

          localStorage.setItem("token", res.data.token);
          document.cookie = cookie.serialize("token", res.data.token, {
            maxAge: 3600,
            path: "/",
          });
        });
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${server}/api/auth/logout`, null, getUserConfig())
        .then((res) => {
          localStorage.removeItem("token");
          document.cookie = cookie.serialize("token", "", {
            maxAge: 0,
            path: "/",
          });
          setUser(null);
          setUserToken(null);
        })
        .catch((err) => console.log(err));
    }
  };
  

  const updateProfilePicture = async (file: File) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${userToken}`,
        },
      };

      const formData = new FormData();
      formData.append("image", file);

      await axios
        .put(`${server}/api/user/${user!.id}/`, formData, config)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err.response));
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: object) => {
    setLoading(true);
    try {

      await axios
        .put(`${server}/api/user/${user!.id}/`, data, getUserConfig())
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err.response));
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = useCallback(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${server}/api/auth/user`, getUserConfig())
        .then((res) => {
          setUser(res.data);
          setUserToken(token);
        })
        .catch((err) => {
          setUser(null);
          setUserToken(null);
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
    <AuthContext.Provider
      value={{
        loading,
        user,
        userToken,
        signIn,
        signOut,
        signUp,
        setUser,
        updateProfilePicture,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
