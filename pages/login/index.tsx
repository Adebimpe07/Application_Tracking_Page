import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  // const

  return (
    <div className="bg-[#E5E5E5] flex flex-col items-center justify-center pb-8 h-screen">
      <header>
        <img src={Logo.src} alt="logo" />
      </header>
      <div className="bg-[#fff] flex flex-col rounded-2xl p-7 sm:p-14 sm:mt-6 mt-2 leading-5">
        <h1 className="font-semibold sm:text-3xl text-center text-base">
          Track your applicaton
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/track_application");
          }}
          className="flex flex-col"
        >
          <label htmlFor="applicant_id" className="my-6 text-sm">
            Applicant ID
          </label>

          <input
            id="applicant_id"
            type="text"
            placeholder="enter your application ID"
            className="rounded-lg border border-[#D0D5DD] focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none py-4 pl-4 mb-8"
          />
          <button
            type="submit"
            className="bg-[#A01B14] rounded-lg sm:py-4 py-2  px-[7rem] sm:px-[14.5rem] text-[#fff] text-base"
          >
            Track{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default index;
