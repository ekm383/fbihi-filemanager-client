import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "../../components/firebase/Firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    width: "100%",
  },
  formControl: {
    width: "100%",
    marginBottom: "1rem",
  },
}));

const Register = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  // Hide access if already logged in
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email sent to ${email}. Click on provided link to complete registration`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear form
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.formControl}>
        <TextField
          type='email'
          value={email}
          variant='outlined'
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </FormControl>

      <Button
        type='submit'
        variant='contained'
        disabled={!email}
        color='primary'
      >
        Register
      </Button>
    </form>
  );

  return (
    <StyledRegister>
      <h4>Register</h4>
      {registerForm()}
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  height: 50vh;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Register;
