import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { requestOtp, verifyOtp } from "../../api/service";
import { login } from "../../reducers/authSlice";

type Props = {
  email: string;
  otpText: string;
  name: string;
  emailError: boolean;
  otpError: boolean;
  nameError: boolean;
  step: "singIn" | "Otp";
};

type ErrorState = {
  isError: boolean;
  errorText: string;
};

const emailRegex: RegExp = /^[^@\s]+@chowgules\.ac\.in$/i;

const Login: React.FC = () => {
  const [value, setValue] = useState<Props>({
    otpText: "",
    email: "",
    emailError: false,
    otpError: false,
    nameError: false,
    name: "",
    step: "singIn",
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [otpText, setOtpText] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [errorState, setError] = useState<ErrorState>({
    errorText: "",
    isError: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          return () => {
            setOtpText(false);
            clearInterval(interval);
          };
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    setIntervalId(interval);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const sendOTP = async () => {
    if (value.name === "") {
      setValue({
        ...value,
        nameError: true,
      });
      return;
    }
    if (!emailRegex.test(value.email) || value.email === "") {
      setValue({ ...value, emailError: true });
      console.log(value);
      return;
    }
    try {
      let status = await requestOtp({ email: value.email });

      if (status === 200) {
        alert("otp sent successfully");
      }
      setOtpText(true);
      setMinutes(2);
      setSeconds(60);
      setValue({ ...value, emailError: false, nameError: false, step: "Otp" });
      console.log(emailRegex.test(value.email));
      console.log(value, otpText);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTP = () => {
    setValue({ ...value, otpText: "" });
    clearInterval(intervalId);
    setSeconds(10);
  };

  const verifyOTP = async () => {
    if (value.otpText === "") {
      setValue({ ...value, otpError: true });
      return;
    }

    try {
      let data = await verifyOtp({
        email: value.email,
        name: value.name,
        otp: value.otpText,
      });
      console.log(data);
      if (data?.response?.data?.status_code == 400) {
        setError({
          errorText: data.response.data.data,
          isError: true,
        });
        return;
      }
      clearInterval(intervalId);
      return;
    } catch (error) {
      console.error("Dispatch error:", error);
      return;
    }
  };

  return (
    <>
      <main className="bg-gray-200 font-sans text-gray-700 h-screen opacity-90 relative">
        {isLoading && <Loading />}

        <div className="container mx-auto p-8 flex">
          <div className="max-w-md w-full mx-auto">
            <h1 className="font-extrabold text-transparent text-4xl bg-clip-text text-center pb-10 bg-gradient-to-r from-blue-800 to-indigo-900">
              Placement Portal Login
            </h1>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                {value.step === "singIn" ? (
                  <>
                    <div className="mb-5">
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Name
                      </label>

                      <input
                        placeholder="Enter your name "
                        type="text"
                        name="email"
                        value={value.name}
                        onChange={(e) => {
                          setValue({ ...value, name: e.currentTarget.value });
                        }}
                        className="block w-full p-3 rounded bg-gray-200 border-2 mb-2   focus:outline-none"
                        required
                      />
                      {value.nameError && (
                        <p className="text-red-500 text-xs italic">
                          Please enter your name
                        </p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>

                      <input
                        placeholder="Use your chowgule email "
                        type="text"
                        name="email"
                        value={value.email}
                        onChange={(e) => {
                          setValue({ ...value, email: e.currentTarget.value });
                        }}
                        className="block w-full p-3 rounded bg-gray-200 border-2 mb-2   focus:outline-none"
                        required
                      />
                      {value.emailError && (
                        <p className="text-red-500 text-xs italic">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mb-5">
                    <label
                      htmlFor="textInput"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      OTP
                    </label>

                    <input
                      placeholder="Please provide your Otp"
                      type="text"
                      maxLength={4}
                      name="otp"
                      value={value.otpText}
                      className="block w-full p-3 rounded bg-gray-200 border-2 mb-2  focus:outline-none "
                      onChange={(e) => {
                        setValue({ ...value, otpText: e.currentTarget.value });
                      }}
                    />
                    {value.otpError && (
                      <p className="text-red-500 text-xs italic">
                        Please enter the otp
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  onClick={() =>
                    value.step === "Otp" ? verifyOTP() : sendOTP()
                  }
                >
                  {value.step === "Otp" ? "Verify OTP" : "Send OTP"}
                </button>
              </div>

              <div className="flex justify-between items-stretch p-5 text-sm border-t border-gray-300 bg-gray-100">
                {/* <h3>NIKESH</h3> */}
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg> */}
                {value.step === "Otp" && (
                  <>
                    <div className=" countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <>
                          <p className="font-semibold">
                            Time Remaining :{" "}
                            <span className="countdown">
                              <span
                                style={
                                  {
                                    "--value": minutes,
                                  } as React.CSSProperties
                                }
                              ></span>
                              :
                              <span
                                style={
                                  {
                                    "--value": seconds,
                                  } as React.CSSProperties
                                }
                              ></span>
                            </span>
                          </p>
                        </>
                      ) : (
                        <p>Didn't recieve code?</p>
                      )}
                    </div>
                    <button
                      // disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                      }}
                      onClick={sendOTP}
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {errorState.isError && (
          <div
            className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 justify-center items-center m-2 fixed h-min bottom-0 lg:top-0 lg:right-0"
            role="alert"
          >
            <svg
              onClick={() =>
                setError({ ...errorState, isError: !errorState.isError })
              }
              className="w-5 h-5 inline mr-3"
              fillRule="evenodd"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium"> {errorState.errorText}</span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Login;
