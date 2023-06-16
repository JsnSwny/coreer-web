import { Profile } from "@/interfaces/profile.model";

export const chatHrefConstructor = (
  from_user: Profile,
  to_user: Profile
) => {
  const userIds = [from_user.id, to_user.id].sort();
  const roomName = `${userIds[0]}__${userIds[1]}`;
  return roomName;
};
