import styles from "./style.module.css";
import { userAPI } from "../../services/userService";
import ApiContainer from "../ApiContainer";

const Registration = () => {
  const [fetchRegistrationUser, { error, data, isSuccess }] =
    userAPI.useFetchRegistrationUserMutation();

  return (
    <div className={styles.container}>
      <ApiContainer
        fetched={fetchRegistrationUser}
        errorStatus={error}
        data={data}
        isSuccess={isSuccess}
        navigateName="/api/login"
        pageName="registration"
        nextPageName="LoginPage"
      />
    </div>
  );
};

export default Registration;
