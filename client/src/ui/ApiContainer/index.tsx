import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { IApi, IUser } from "../../models/IUser";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ApiContainerProps {
  fetched: (userData: IUser) => any;
  errorStatus?: FetchBaseQueryError | SerializedError | null;
  data?: IApi;
  isSuccess?: boolean;
  navigateName?: string;
  pageName: string;
  nextPageName: string;
}

const ApiContainer: FC<ApiContainerProps> = ({
  fetched,
  errorStatus,
  data,
  isSuccess,
  navigateName,
  pageName,
  nextPageName,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [buttonSelect, setButtonSelect] = useState<boolean>(false);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const email: string | undefined = emailRef?.current?.value;
    const password: string | undefined = passwordRef?.current?.value;

    if (email && password) {
      const newUser = {
        email,
        password,
      };
      try {
        const response = await fetched(newUser);
        const accessToken = response.data.accessToken;
        if (accessToken) localStorage.setItem("token", accessToken);
        console.log("Registered user:", response);
      } catch (error) {
        console.log("Login Error:");
      }
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setButtonSelect(true);
    } else {
      setButtonSelect(false);
    }
  }, [isSuccess, data, navigate]);

  const handlerSelected = () => {
    if (navigateName) {
      navigate(navigateName);
    } else {
      console.warn("Navigate path is undefined!");
    }
  };

  return (
    <div className={styles.container}>
      <p>{pageName}</p>
      <form onSubmit={addTodo}>
        <input
          ref={emailRef}
          name="email"
          placeholder="email"
          type="email"
          required
          autoComplete="email"
        />
        <input
          ref={passwordRef}
          name="password"
          placeholder="password"
          type="password"
          required
          autoComplete="current-password"
        />
        <button>Sign In</button>
      </form>
      {errorStatus ? (
        <p className={styles.titleText} style={{ color: "white" }}>
          Error: {(errorStatus as any).data?.message}
        </p>
      ) : (
        ""
      )}
      {data && (
        <p className={styles.titleText} style={{ color: "white" }}>
          {pageName} successful!
        </p>
      )}
      <button
        onClick={handlerSelected}
        className={`${styles.button}`}
        style={{ display: buttonSelect ? "flex" : "none" }}
      >
        {nextPageName}
      </button>
    </div>
  );
};

export default ApiContainer;
