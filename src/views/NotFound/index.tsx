import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";

type NotFoundProps = {};

const NotFound: FC<NotFoundProps> = () => {
  const navigate = useNavigate();
  return (
    <Styled.Container>
      <Styled.Image
        src={
          "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
        }
      />
      <h2>Page Not Found</h2>
      <Button onClick={() => navigate("/")}>Go back to dashboard</Button>
    </Styled.Container>
  );
};

export default NotFound;
