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
import { WorkExperience } from "@/interfaces/work_experiences.model";

interface AuthContextType {
  user: Profile | null;
  userToken: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: () => void;
  loading: boolean;
  updateProfilePicture: (file: File) => void;
  updateUser: (data: object) => void;
  addEducation: (data: object) => void;
  addWorkExperience: (data: WorkExperience) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  loading: false,
  updateProfilePicture: () => {},
  updateUser: () => {},
  addEducation: () => {},
  addWorkExperience: () => {},
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
    } catch (error) {
      console.error(error.response);
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
        },
      };

      config.headers["Authorization"] = `Token ${userToken}`;

      const formData = new FormData();
      formData.append("image", file);

      await axios
        .put(`${server}/api/user/${user.id}/`, formData, config)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: object) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      config.headers["Authorization"] = `Token ${userToken}`;

      await axios
        .put(`${server}/api/user/${user.id}/`, data, config)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (data: object) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      config.headers["Authorization"] = `Token ${userToken}`;

      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("start_date", data.start_date);
      formData.append("user", data.user);

      await axios
        .post(`${server}/api/projects/`, formData, config)
        .then((res) => {
          console.log(res.data);
          setUser({ ...user, projects: [...user.projects, res.data] });
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const addEducation = async (data: object) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      config.headers["Authorization"] = `Token ${userToken}`;

      console.log(data);

      let schoolId = data.school;
      let degree = data.degree;
      let startDate = data.start_date;
      let userId = data.user;

      await axios
        .post(
          `${server}/api/educations/`,
          { school_id: schoolId, degree, start_date: startDate, user: userId },
          config
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setUser({ ...user, educations: [...user.educations, res.data] });
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const addWorkExperience = async (data: object) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      config.headers["Authorization"] = `Token ${userToken}`;

      console.log(data);

      await axios
        .post(`${server}/api/work-experiences/`, data, config)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setUser({ ...user, educations: [...user.work, res.data] });
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
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
        updateProfilePicture,
        updateUser,
        addProject,
        addEducation,
        addWorkExperience,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
