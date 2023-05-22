import { Profile } from "@/interfaces/profile.model";

export const chatHrefConstructor = (
  from_user: Profile | null,
  to_user: Profile | null
) => {
  const userIds = [from_user.id, to_user.id].sort();
  const roomName = `${userIds[0]}__${userIds[1]}`;
  return roomName;
};
