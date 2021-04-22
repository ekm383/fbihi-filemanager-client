import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth } from "../../components/firebase/Firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

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

const Login = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Hide access if already logged in
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/medicare");
      }
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check for intended page path
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/upload");
      } else {
        history.push("/medicare");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.formControl}>
        <TextField
          variant='outlined'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
          autoFocus
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          variant='outlined'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </FormControl>
      <div className='submit-container'>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!email || password < 6}
          color='primary'
        >
          Login
        </Button>
        <div className='link-container'>
          <Link to='/forgot/password'>Forgot Password?</Link>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </form>
  );

  return (
    <StyledHeader>
      {loading ? <h4>Loading...</h4> : <h4>FBIHI Agent Login</h4>}
      {loginForm()}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
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
  .submit-container {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-container a {
    margin-left: 1.2rem;
  }
`;

export default Login;
