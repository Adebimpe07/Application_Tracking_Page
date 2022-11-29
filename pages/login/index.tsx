import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useRouter } from "next/router";
import { Button, TextInput } from "@mantine/core";

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
          <TextInput
            label=" Applicant ID"
            placeholder="enter your application ID"
            // htmlFor="applicant_id"
            classNames={{
              label: "text-base",
              input: "p-1 mt-1",
              root: "my-6",
            }}
          />
          <Button
            type="submit"
            className="bg-[#A01B14] hover:bg-[#A01B14] rounded-lg  py-2  px-[7rem] sm:px-[14.5rem] text-[#fff] text-base"
          >
            Track{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
