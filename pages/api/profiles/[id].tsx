import { profiles } from "@/data";

export default function handler({ query: { id } }: any, res: any) {
  const filtered = profiles.filter((profile) => profile.id === id);

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res
      .status(404)
      .json({ message: `Profile with the id of ${id} is not found` });
  }
}
