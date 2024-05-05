import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";

type NotFoundProps = {};

const NotFound: FC<NotFoundProps> = () => {
  const navigate = useNavigate();
  return (
    <Styled.Container>
      <div>
        <h2>404 - Not Found</h2>
        <p>The page you're looking for does not exist.</p>
        <button onClick={() => navigate("/")}>Go back to dashboard</button>
      </div>
    </Styled.Container>
  );
};

export default NotFound;
