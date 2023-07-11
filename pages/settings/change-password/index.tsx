import Container from "@/components/Container/Container";
import ChangePasswordForm from "@/components/Layout/Settings/ChangePasswordForm/ChangePasswordForm";
import SettingsWrapper from "@/components/Layout/Settings/SettingsWrapper/SettingsWrapper";
import withAuth from "@/components/Route/withAuth";

const ChangePassword = () => {
	return (
		<Container>
			<SettingsWrapper>
				<ChangePasswordForm />
			</SettingsWrapper>
		</Container>
	);
};

export default withAuth(ChangePassword);
