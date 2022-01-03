import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import axiosInstance from "../helper/axiosInstance";
import { loginUser } from "../features/auth.slice";
import { handleFaliureMessage } from "../features/message.slice";
import { fetchCartId } from "../service/fetchCart";
function LoginWithGoogle() {
  const dispatch = useDispatch();
  const handleSuccess = async (googleData: any) => {
    try {
      const res = await axiosInstance.post("/session/google", {
        token: googleData.tokenId,
      });
      dispatch(loginUser(res.data));
      dispatch(fetchCartId());
    } catch (error) {
      console.log(error);
      dispatch(handleFaliureMessage("Please try again later"));
    }
  };

  const handleFaliure = async (e: any) => {
    console.log(e);
    dispatch(handleFaliureMessage("Unable to Login"));
  };

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
      buttonText="Login with google"
      cookiePolicy={"single_host_origin"}
      onSuccess={handleSuccess}
      onFailure={handleFaliure}
    />
  );
}

export default LoginWithGoogle;
