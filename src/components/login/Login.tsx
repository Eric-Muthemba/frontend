import React, { useContext, useRef, useState } from "react";
import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      setIsLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      try {
        const response = await fetch(`${process.env.REACT_APP_BackendURL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const data = await response.json();

        loginCtx.setToken(data.data.token);
        loginCtx.setRoles(data.data.user.roles);
        loginCtx.setName(data.data.user.name);
        loginCtx.setIsLogin(true);

        console.log(loginCtx)

        navigate("/");
      } catch (error) {
        console.log(error)
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
        emailRef.current.focus();
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div
      className={`${classes.container}`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo} alt="e-health" />
        </div>
        <h2 className={classes.title}>{t("loginPage")}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={emailRef}
            type={"email"}
            id={"email"}
            placeholder={t("email")}
          />
          <Input
            ref={passwordRef}
            type={"password"}
            id={"password"}
            placeholder={t("password")}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Button type="submit">
            {isLoading ? t("loading") : t("login")}
          </Button>
          <Link className={classes.forgat_pass} to="/">
            {t("forgetPass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Main-Logo.svg").default}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default LoginBox;
