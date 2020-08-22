import React, { useContext } from "react";
import styled from "@emotion/styled";
import { content } from "../App";

const Message = styled.div`
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  color: ${(props) => (props.error ? "red" : "green")};
  border-color: ${(props) => (props.error ? "red" : "green")};
`;

const Prompt = () => {
  let { error, prompt } = useContext(content);
  if (error) {
    return <Message error>{prompt}</Message>;
  } else {
    return <Message>{prompt}</Message>;
  }
};

export default Prompt;
