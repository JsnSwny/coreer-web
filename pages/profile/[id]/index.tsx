import React from "react";
import { Profile } from "../../../interfaces/profile.model";
import { server } from "@/config";

interface ProfileProps {
  profile: Profile;
}

const profile = ({ profile }: ProfileProps) => {
  return (
    <div>
      {profile.first_name} {profile.last_name}
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${server}/api/profiles/${context?.params?.id}`);

  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/profiles`);

  const profiles = await res.json();

  const ids = profiles.map((profile: Profile) => profile.id);
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default profile;
