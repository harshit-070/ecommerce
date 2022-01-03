import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import axiosInstance from "../helper/axiosInstance";
import { loginUser } from "../features/auth.slice";
import { handleFaliureMessage } from "../features/message.slice";
function SignupWithGoogle() {
  const dispatch = useDispatch();
  const handleSuccess = async (googleData: any) => {
    try {
      const res = await axiosInstance.post("/user/google", {
        token: googleData.tokenId,
      });
      dispatch(loginUser(res.data));
    } catch (error) {
      dispatch(handleFaliureMessage("Please try again later"));
    }
  };

  const handleFaliure = async (e: any) => {
    console.log(e);
    dispatch(handleFaliureMessage("Unable to Signup"));
  };

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
      buttonText="Signup with google"
      cookiePolicy={"single_host_origin"}
      onSuccess={handleSuccess}
      onFailure={handleFaliure}
    />
  );
}

export default SignupWithGoogle;
