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

const ForgotPassword = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Hide access if already logged in
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <StyledForgotPassword>
      {loading ? (
        <h4 className='text-danger'>Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit} className={classes.root}>
        <FormControl className={classes.formControl}>
          <TextField
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            autoFocus
            variant='outlined'
          />
        </FormControl>
        <Button disabled={!email} color='primary' variant='contained'>
          Submit
        </Button>
      </form>
    </StyledForgotPassword>
  );
};

const StyledForgotPassword = styled.div`
  height: 50vh;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-bottom: 2rem;
  }
`;

export default ForgotPassword;
