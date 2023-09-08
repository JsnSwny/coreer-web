import withAuth from "@/components/Route/withAuth";
import Settings from "@/components/Layout/Settings/SettingsWrapper/SettingsWrapper";
import Container from "@/components/Container/Container/Container";
import SettingsWrapper from "@/components/Layout/Settings/SettingsWrapper/SettingsWrapper";

const SettingsPage = () => {
	return (
		<Container>
			<SettingsWrapper>
				<div></div>
			</SettingsWrapper>
		</Container>
	);
};

export default withAuth(SettingsPage);
