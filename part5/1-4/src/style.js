import { css } from "@emotion/core";

const message = css({
  background: "lightgrey",
  fontSize: 20,
  borderStyle: solid,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
});

const redMessage = css({
  color: "red",
  borderColor: "red",
});

const greenMessage = css({
  color: "green",
  borderColor: "red",
});

export default {
  message,
  redMessage,
  greenMessage,
};
