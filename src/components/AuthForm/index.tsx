"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const AuthForm = ({
  openAuthForm,
  setOpenAuthForm,
}: {
  openAuthForm: boolean;
  setOpenAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [input, setInput] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.ok) {
        setOpenAuthForm(false);
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });
      // @ts-ignore
      if (res?.ok) {
        setOpenAuthForm(false);
        router.push("/");
      } else {
        // @ts-ignore
        throw new Error(res?.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <div className="absolute bg-white w-[600px] h-[800px] z-20 flex flex-col p-12 justify-evenly">
      {error && (
        <p className="text-red-500 bg-black h-[40px] font-bold flex justify-center items-center">
          {error}
        </p>
      )}
      <div className="relative flex gap-4 justify-center w-full mb-1">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-0 hover:scale-125 cursor-pointer"
          onClick={() => setOpenAuthForm(!openAuthForm)}
        />
        <button
          className="font-bold p-4 border-b-2"
          onClick={() => setShowRegister(false)}
          style={{
            borderBottom: showRegister ? "1px solid grey" : "3px solid black",
          }}
        >
          Sign In
        </button>
        <button
          className="font-bold p-4 border-b-2"
          onClick={() => setShowRegister(true)}
          style={{
            borderBottom: showRegister ? "3px solid black" : "1px solid grey",
          }}
        >
          Join Hollister House Rewards
        </button>
      </div>
      <div className="flex justify-center items-center flex-col w-[375px] mx-auto gap-4">
        <Image
          src={"/assets/images/DTCC-24184-hhr_tape.svg"}
          width={400}
          height={50}
          alt="house-rewards-logo"
        />
        <Image
          src={"/assets/images/DTCC-24184-hhr_logo.svg"}
          width={400}
          height={50}
          alt="house-rewards-logo"
        />
        <h1 className="font-bold text-2xl">
          CASH REWARDS. EXTRA DEALS. EXCLUSIVE DROPS. HOUSE MEMBERS GET MORE.
        </h1>
        {showRegister && (
          <p>
            Join for free & get $10 off any $40 purchase at Hollister, Gilly
            Hicks or Social Tourist.*
          </p>
        )}
      </div>
      <div className="flex flex-col relative">
        <div className="flex flex-col ">
          {!showRegister && (
            <div className="text-sm text-center">
              <h2 className="underline"> Test Account </h2>
              <p>
                <span className="font-bold">Email:</span> guest@hollister.com
              </p>
              <p>
                <span className="font-bold">Password:</span> password
              </p>
            </div>
          )}
          {showRegister && (
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              className="border-b-2 p-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          )}

          {showRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-b-2 p-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="border-b-2 p-4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-b-2 p-4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
        />
        {!showRegister && (
          <Link href={""} className="text-sm mt-4 text-center">
            Forgot Password
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-10">
        <p className="text-sm mt-4">
          I agree to the Hollister House Rewards Terms and the Website Terms of
          Use. For more information about our privacy policy, see our Privacy
          Policy and California Notice of Financial Incentive.
        </p>
        {showRegister ? (
          <button
            className="bg-[--blue-light] p-4 text-white hover:bg-[--blue-smooth] transition-colors"
            onClick={() => handleRegister()}
          >
            Continue
          </button>
        ) : (
          <button
            className="bg-[--blue-light] p-4 text-white hover:bg-[--blue-smooth] transition-colors"
            onClick={() => handleLogin()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
