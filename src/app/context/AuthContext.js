import React, { createContext, useState } from "react";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import addNotification from 'react-push-notification';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(
    !!JSON.parse(localStorage.getItem("token"))
  );
  const [isFetchingLogin, setIsFetchingLogin] = useState(false);
  const [isFetchingCreateUser, setIsFetchingCreateUser] = useState(false);
  const [isFetchingUpdateUser, setIsFetchingUpdateUser] = useState(false);
  const [hasTextInSearchField, setHasTextInSearchField] = useState(false);
  const [filters, setFilters] = useState();
  const [userId, setUserId] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [spoilerProtection, setSpoilerProtection] = useState(false);

  const [loginError, setLoginError] = useState({ isError: false, message: "" });
  const [createError, setCreateError] = useState({
    isError: false,
    message: "",
  });

  const [updateError, setUpdateError] = useState({
    isError: false,
    message: "",
  });

  const navigate = useNavigate();

  async function handleLogin(email, password) {
    setIsFetchingLogin(true);
    setLoginError({ isError: false, message: "" });

    await Api.post("/login", { email, password })
      .then((res) => handleRequest(res.data.token))
      .catch((err) =>
        setLoginError({ isError: true, message: err.response.data })
      )
      .finally(() => setIsFetchingLogin(false));
  }

  async function handleCreateNewUser(firstName, lastName, email, password) {
    setIsFetchingCreateUser(true);
    setCreateError({ isError: false, message: "" });

    await Api.post("/users", { firstName, lastName, email, password })
      .then((res) => handleLogin(email, password))
      .catch((err) =>
        setCreateError({ isError: true, message: err.response.data })
      )
      .finally(() => setIsFetchingCreateUser(false));
  }

  const handleRequest = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("token", JSON.stringify(token));
    Api.defaults.headers.Authorization = `Bearer ${token}`;
    const { id, spoilerProtection, firstName, lastName, email } = jwt_decode(token);
    setAuthenticated(true);
    setUserId(id);
    setSpoilerProtection(spoilerProtection);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    navigate("/home", { state: id });

    const clickTONotify = () => {
      addNotification({
          title: "Welcome Back!",
          message: "You are the BingeBoss here!",
          duration: 10000,
          position: "top-right",
          theme: "light"
      })
    }
      clickTONotify();
  };

  async function handleUpdateUser({firstName, lastName, email, oldPassword, newPassword, confirmedPassword}){
    setIsFetchingUpdateUser(true);
    setUpdateError({ isError: false, message: ''});
    let body = { firstName, lastName, email}

    if(oldPassword !== ''){
        body.oldPassword = oldPassword;
    }

    if(newPassword !== ''){
      body.newPassword = newPassword;
    }

    if(confirmedPassword !== ''){
      body.confirmedPassword = confirmedPassword;
    }
    
    await Api.put(`/users/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then(res => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
    })
    .catch(err => setUpdateError({ isError: true, message:  err.response.data}))
    .finally(() => setIsFetchingUpdateUser(false));
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        handleCreateNewUser,
        isFetchingLogin,
        isFetchingCreateUser,
        hasTextInSearchField,
        setHasTextInSearchField,
        loginError,
        createError,
        setCreateError,
        filters,
        setFilters,
        userId,
        setAuthenticated,
        spoilerProtection,
        setSpoilerProtection,
        updateError,
        setUpdateError,
        firstName,
        lastName,
        email,
        isFetchingUpdateUser,
        setIsFetchingUpdateUser,
        handleUpdateUser
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
