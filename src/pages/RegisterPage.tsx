import React, { useState } from "react";
import "../styles/register_page.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birth, setBirth] = useState<Date>();
  const navigator = useNavigate();
  const notifyRegister = (message: string) => {
    toast.info(message);
  };

  const createAccount = async () => {
    const data = {
      mail: mail,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      birth: birth,
    };

    await axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/register`, data)
      .then((response) => {
        notifyRegister("Register succeded!");
        navigator("/");
      })
      .catch((error) => {
        notifyRegister("Mail already in use!");
      });
    // setPhones(response.data);
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hello!");

    if (
      mail &&
      password &&
      repeatedPassword &&
      firstname &&
      lastname &&
      phone &&
      birth
    ) {
      if (password !== repeatedPassword) {
        notifyRegister(
          "You entered two different versions for you password! Check again!"
        );
      } else if (
        (!mail.includes("@yahoo") && !mail.includes("@gmail")) ||
        mail.length < 11
      ) {
        notifyRegister("Incorrect format of mail address");
      } else if (password.length < 10) {
        notifyRegister("Incorrect format of password");
      } else if (firstname.length < 3) {
        notifyRegister("Incorrect format of firstname");
      } else if (lastname.length < 3) {
        notifyRegister("Incorrect format of lastname");
      } else if (phone.length != 10 || phone.substring(0, 2) !== "07") {
        notifyRegister("Incorrect format of phone");
      } else {
        createAccount();
        setMail("");
        setPassword("");
        setRepeatedPassword("");
        setFirstname("");
        setLastname("");
        setPhone("");
      }
    } else {
      notifyRegister("All fields are mandatory!");
    }
  };
  return (
    <div>
      <h1>Register Page</h1>
      <form
        className="form"
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <div>
          <div className="edit_fields">
            <div className="field">
              <h4>Mail address</h4>
              <input
                className="new"
                type="input"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Enter your mail:"
                required
              ></input>
            </div>
            <div className="field">
              <h4>Password</h4>
              <input
                className="new"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password:"
                required
              ></input>
            </div>
            <div className="field">
              <h4>Confirm password</h4>
              <input
                className="new"
                type="password"
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)}
                placeholder="Repeat password:"
                required
              ></input>
            </div>
            <div className="field">
              <h4>Firstname</h4>
              <input
                className="new"
                type="input"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter firstname: "
                required
              ></input>
            </div>
            <div className="field">
              <h4>Lastname</h4>
              <input
                className="new"
                type="input"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter lastname: "
                required
              ></input>
            </div>
            <div className="field">
              <h4>Birth date</h4>
              <input
                className="new"
                type="date"
                onChange={(e) => setBirth(new Date(e.target.value))}
                required
              ></input>
            </div>
            <div className="field">
              <h4>Phone number</h4>
              <input
                className="new"
                type="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone: "
                required
              ></input>
            </div>
          </div>
          <button type={"submit"} className="confirm_add_button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
