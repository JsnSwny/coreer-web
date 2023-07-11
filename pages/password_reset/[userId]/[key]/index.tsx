import Container from "@/components/Container/Container";
import ChangePasswordForm from "@/components/Layout/Settings/ChangePasswordForm/ChangePasswordForm";
import { useRouter } from "next/router";

const PasswordResetConfirm = () => {
	const router = useRouter();
	const { userId, key } = router.query;
	return (
		<Container>
			<ChangePasswordForm userId={userId as string} token={key as string} />
		</Container>
	);
};

export default PasswordResetConfirm;
