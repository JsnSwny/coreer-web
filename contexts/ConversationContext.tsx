// ConversationContext.tsx

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Conversation, Like } from "@/interfaces/conversation.model";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";

interface ConversationContextProps {
	conversations: Conversation[];
	currentConversation: Conversation | null;
	setConversations: (conversations: Conversation[]) => void;
	setCurrentConversation: (conversation: Conversation | null) => void;
	likes: Profile[];
	addLike: (like: Profile) => void;
	removeLike: (id: number) => void;
}

export const ConversationContext = createContext<ConversationContextProps>({
	conversations: [],
	likes: [],
	currentConversation: null,
	setConversations: () => {},
	setCurrentConversation: () => {},
	addLike: () => {},
	removeLike: () => {},
});

interface ConversationProviderProps {
	children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
	children,
}) => {
	const { userToken } = useAuth();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [likes, setLikes] = useState<Profile[]>([]);
	const [currentConversation, setCurrentConversation] =
		useState<Conversation | null>(null);

	const getConversations = async () => {
		try {
			const response = await axios.get(`${server}/api/conversations/`, {
				headers: {
					Authorization: `Token ${userToken}`,
				},
			});

			if (response.status === 200) {
				setConversations(response.data);
			} else {
				setConversations([]);
			}
		} catch (error) {
			setConversations([]);
		}
	};

	const addLike = (profile: Profile) => {
		setLikes([profile, ...likes]);
	};

	const removeLike = (id: number) => {
		setLikes(likes.filter((item) => item.id != id));
	};

	const getLikes = async () => {
		try {
			const response = await axios.get(
				`${server}/api/follow?ordering=-followed_on`,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);

			if (response.status === 200) {
				setLikes(response.data.map((like: Like) => like.following));
			} else {
				setLikes([]);
			}
		} catch (error) {
			setLikes([]);
		}
	};

	// useEffect(() => {
	// 	if (userToken) {
	// 		getConversations();
	// 		getLikes();
	// 	}
	// }, [userToken]);

	return (
		<ConversationContext.Provider
			value={{
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				likes,
				addLike,
				removeLike,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
};
