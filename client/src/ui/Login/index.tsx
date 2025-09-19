import styles from "./style.module.css";
import { userAPI } from "../../services/userService";
import ApiContainer from "../ApiContainer";

const Login = () => {
  const [fetchLoginUser, { error, data, isSuccess }] =
    userAPI.useFetchLoginUserMutation();

  return (
    <div className={styles.container}>
      <ApiContainer
        fetched={fetchLoginUser}
        errorStatus={error}
        data={data}
        isSuccess={isSuccess}
        navigateName="/"
        pageName="Login"
        nextPageName="HomePage"
      />
    </div>
  );
};

export default Login;
