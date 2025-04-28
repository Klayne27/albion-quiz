import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIgn, setRole } from "../dataSlice";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";
import RoleDropdown from "./RoleDropdown";

function IgnInput() {
  const mainBannerClipPath = "polygon(0% 0%, 99% 0%, 99% 84%, 49% 99%, 0% 84%)";
  const borderClipPath = "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)";

  const dispatch = useDispatch();
  const [inputIgn, setInputIgn] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [rememberMeClicked, setRememberMeClicked] = useState(false);
  const [autoLoginClicked, setAutoLoginClicked] = useState(false);


  const ign = useSelector(state => state.data.ign)
  const role = useSelector((state) => state.data.role);


  const handleRememberMeClick = () => {
    setRememberMeClicked((click) => !click);
  };

  const handleAutoLogInClick = () => {
    setAutoLoginClicked((click) => !click);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputIgn.trim() && selectRole.trim()) {
      dispatch(setIgn(inputIgn.trim()));
      dispatch(setRole(selectRole.trim()));
    }
  };

  const commonHoverActiveStyles = `
  hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
  active:bg-stone-950
  active:scale-95
  transition ease-in-out duration-150
  `;
  
  const focusStyles = `
  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

  if (ign && role) {
    return null;
  }
  
  return (
    <div
      className="relative w-full h-screen flex justify-center items-start bg-gray-900 overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative h-[43rem] w-64 md:w-80 lg:w-96">
        <div
          className="absolute -inset-1 bg-gradient-to-b from-yellow-500 via-yellow-900 to-yellow-500"
          style={{
            clipPath: borderClipPath,
          }}
        ></div>

        <div
          className="absolute inset-0 bg-gradient-to-b ml-1 from-[#720101] via-[#2c0000] to-[#2c0000]"
          style={{
            clipPath: mainBannerClipPath,
          }}
        >
          <div className="absolute top-[5%] left-0 right-0 text-center text-white z-10 justify-around">
            <img
              src="./albionlogo.png"
              className="mx-auto w-32 md:w-40 lg:w-60 h-auto"
              alt="Albion Logo"
            />
            <p className="text-[#f5dac5] text-lg md:text-4xl font-extrabold tracking-widest">
              Quiz
            </p>

            <div className="p-8 rounded-lg w-full max-w-sm">
              {" "}
              <h2 className="text-2xl font-bold mb-5 text-center text-[#ce9261]">
                Login
              </h2>
              <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <input
                    type="text"
                    placeholder="In-Game Name"
                    value={inputIgn}
                    onChange={(e) => setInputIgn(e.target.value)}
                    className={`px-3 border-3 border-gray-500 rounded-full text-sm bg-gradient-to-b from-[#FFD8AF] via-[#cea985] to-[#a3886b] placeholder:text-[#926e47] text-[#4e2c08] ${focusStyles}`}
                  />
                  <RoleDropdown selectRole={selectRole} setSelectRole={setSelectRole} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 items-center sm:items-start">
                  <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                    <div className="gap-1 flex items-center justify-start sm:justify-start">
                      <button
                        type="button"
                        id="rem-me"
                        className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                          rememberMeClicked
                            ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700"
                            : ""
                        } ${commonHoverActiveStyles} ${focusStyles}`}
                        onClick={handleRememberMeClick}
                      >
                        <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                      </button>
                      <label htmlFor="rem-me" className="text-sm text-[#ce9261]">
                        Remember me
                      </label>
                    </div>
                    <div className="gap-1 flex items-center justify-start sm:justify-start">
                      <button
                        type="button"
                        id="auto-login"
                        className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                          autoLoginClicked
                            ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700"
                            : ""
                        } ${commonHoverActiveStyles} ${focusStyles}`}
                        onClick={handleAutoLogInClick}
                      >
                        <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
                      </button>
                      <label htmlFor="auto-login" className="text-sm text-[#ce9261]">
                        Automatic log in
                      </label>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto text-center sm:text-right mt-4 sm:mt-0">
                    <button
                      type="button"
                      className={`text-sm px-2 border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700 text-yellow-400 cursor-pointer active:bg-[#4c5155] ${commonHoverActiveStyles} ${focusStyles}`}
                    >
                      Forgot Password
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-20">
                  <button
                    type="button"
                    className={`px-2 border-3 rounded-full text-sm border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700 text-yellow-400 cursor-pointer active:bg-[#4c5155] ${commonHoverActiveStyles} ${focusStyles}`}
                  >
                    <PiCaretDoubleLeftBold size={19} style={{ strokeWidth: "7%" }} />
                  </button>
                  <button
                    type="submit"
                    className={`px-3 border-3 rounded-full text-sm border-gray-500 cursor-pointer active:scale-95 transition ease-in-out duration-150
                      ${
                        inputIgn && selectRole
                          ? "bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202]"
                          : "bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-black hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700"
                      } ${focusStyles}`}
                  >
                    Start
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IgnInput;
