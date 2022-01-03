import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

function Message() {
  const { show, message, type } = useSelector(
    (state: RootState) => state.message
  );

  if (!show) return <></>;

  return (
    <Alert variant={type} style={{ marginTop: "5px" }}>
      {message}
    </Alert>
  );
}

export default Message;
