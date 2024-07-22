import { useAppSelector } from "../../../redux/hook";
import NotPermitted from "./not-permitted";
import Loading from "../loading";
import { useRouter } from "next/navigation";

const RoleBaseRoute = (props: any) => {
  const user = useAppSelector((state) => state?.account?.user);
  const userRole = user?.role;

  if (userRole !== "USER") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props: any) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state?.account?.isAuthenticated
  );
  const isLoading = useAppSelector((state) => state?.account?.isLoading);

  return (
    <>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated === true ? (
            <>
              <RoleBaseRoute>{props.children}</RoleBaseRoute>
            </>
          ) : (
            router.push("/login")
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
