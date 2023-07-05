import { Conversation } from "./conversation.model";
import { Profile } from "./profile.model";

export interface Message {
	id: number;
	from_user: Profile;
	to_user: Profile;
	conversation: Conversation;
	content: string;
	timestamp: Date;
	read: boolean;
}
