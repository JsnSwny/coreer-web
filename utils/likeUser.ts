import { server } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/interfaces/profile.model";
import axios from "axios";

export const likeUser = (
  user: Profile,
  profile: Profile,
  userToken: string
) => {
  console.log("Liking user");
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  config.headers["Authorization"] = `Token ${userToken}`;
  let newLikes = user.following;

  user.following.includes(profile.id)
    ? axios
        .delete(`${server}/api/follow/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          data: { following_id: profile.id },
        })

        .catch((err) => console.log(err.response))
    : axios
        .post(
          `${server}/api/follow/`,
          {
            following_id: profile.id,
          },
          config
        )

        .catch((err) => console.log(err.response));

  if (user.following.includes(profile.id)) {
    newLikes = [...newLikes.filter((item) => item != profile.id)];
  } else {
    newLikes.push(profile.id);
  }

  user.following = newLikes;
};
