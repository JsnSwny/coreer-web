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
  signUp: (email: string, password1: string, password2: string) => void;
  loading: boolean;
  setUser: (profile: Profile | null) => void;
  updateProfilePicture: (file: File) => void;
  updateUser: (data: object) => void;
  fetchUser: (accessToken: string) => void;
  githubDetails: object | null;
  setGithubDetails: (data: object | null) => void;
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
  fetchUser: () => {},
  githubDetails: () => {},
  setGithubDetails: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [githubDetails, setGithubDetails] = useState<object | null>(null);

  const fetchUser = async (accessToken: string) => {
    try {
      console.log(`Fetching user: ${accessToken}`);
      const response = await axios.get(`${server}/api/auth/user/`, {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        console.log(userData);
        localStorage.setItem("token", accessToken);
        setUser(userData);
        setUserToken(accessToken);
      } else {
        // Handle error case when fetching user information
        setUser(null);
      }
    } catch (error) {
      // Handle any network errors
      setUser(null);
    }

    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${server}/api/auth/login/`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { key } = response.data;
        localStorage.setItem("token", key);
        fetchUser(key);
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      // Handle any network errors
      setUser(null);
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password1: string,
    password2: string
  ) => {
    try {
      await axios
        .post(`${server}/api/auth/registration/`, {
          email,
          password1,
          password2,
        })
        .then((res) => {
          console.log("Registered!");
          console.log(res.data);
          signIn(email, password1);
        });
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    const token = localStorage.getItem("token");
    console.log(`Signing out: ${token}`);
    if (token) {
      axios
        .post(`${server}/api/auth/logout/`, null, getUserConfig())
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

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) fetchUser(accessToken);
  }, []);

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
        fetchUser,
        githubDetails,
        setGithubDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
