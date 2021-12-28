import { useRouter } from "next/router";

const MyProfile = () => {
  const router = useRouter();

  return <div>Profile {router.pathname}</div>;
};

export default MyProfile;
