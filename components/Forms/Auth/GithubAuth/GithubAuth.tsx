import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub } from "react-icons/fa";
import styles from "./GithubAuth.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/config";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";

const GithubAuth = () => {
  const { fetchUser, setGithubToken } = useAuth();
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    const code = router.query.code;
    if (code) {
      setLoadingAuth(true);
      axios
        .post(`${server}/exchange-token/`, { code })
        .then((res) => {
          console.log(res.data);
          let accessToken = res.data.access_token;
          axios
            .post(`${server}/api/github/`, {
              code,
              access_token: accessToken,
            })
            .then((res) => {
              const { key } = res.data;
              setGithubToken(accessToken);

              fetchUser(key);
            })
            .catch((err) => console.log(err.response))
            .finally(() => setLoadingAuth(false));
        })
        .catch((err) => console.log(err.response))
        .finally(() => setLoadingAuth(false));
    }
  }, [router.query.code]);
  return (
    <>
      {loadingAuth && <LoadingOverlay />}
      <button className={styles.button}>
        <a href="https://github.com/login/oauth/authorize?scope=repo,user:email&client_id=4710f43b56ca1572e2a8">
          <FaGithub /> Continue with GitHub
        </a>
      </button>
    </>
  );
};

export default GithubAuth;
