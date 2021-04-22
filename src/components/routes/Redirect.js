import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <StyledRedirect>
      <p>Sorry, redirecting in {count} seconds</p>
    </StyledRedirect>
  );
};

const StyledRedirect = styled.div`
  height: 50vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingToRedirect;
