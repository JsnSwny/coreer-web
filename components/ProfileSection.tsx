import React from "react";

interface ProfileSectionProps {
	title: string;
	children: React.ReactNode;
}

const ProfileSection = ({title, children}: ProfileSectionProps) => {
	return (
		<section>
			<h2>{title}</h2>
			{children}
		</section>
	)
}

export default ProfileSection;