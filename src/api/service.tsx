import axios from "../utils/axios.config";
import { login } from "../reducers/authSlice";
import { store } from "../utils/store";

type userData = {
  name: string;
  email: string;
  _id: string;
};

type loginData = {
  email: string;
};

type verifyOtpProps = {
  otp: string;
  name: string;
  email: string;
};

type otpReturn = {
  status_code: Number;
  data: string;
};

export const requestOtp = async (props: loginData): Promise<Number> => {
  let { status } = await axios.post("request-otp", props);
  return status;
};

export const verifyOtp = async (props: verifyOtpProps): Promise<any> => {
  try {
    let { status, data } = await axios.post("verify-otp", props);
    console.log(data);
    
    let user: userData = await {
      _id: data.data._id,
      name: data.data.name,
      email: data.data.email,
    };
    if (status === 200) {
      console.log("True", status);
      store.dispatch(
        login({
          user: user,
          role: data.data.role,
          token: data.data.token,
        })
      );
    }
  } catch (error) {
    return error;
  }
};
