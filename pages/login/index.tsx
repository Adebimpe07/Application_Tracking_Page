import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useRouter } from "next/router";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useStore } from "../../src/store";

const index = () => {
  const router = useRouter();
  const [applicant, setApplicant] = useStore.applicant();
  const form = useForm({
    initialValues: {
      application_id: "",
    },
  });

  const loginUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.values.application_id) {
      var config = {
        method: "post",
        url: "https://aptbk.afexats.com/api/applications/track",
        headers: {
          "api-key":
            "qsMNjvnWL4aqOATjtjLoaoaRPw2Fec0jf43J5oB02Sv7hMELvfcwnOdzS9FQHOvW",
          "request-ts": "1667549939702",
          "hash-key":
            "ffefa32cfa2df9944ce9ad0212cc80169b1f7574fe09631a46756600d33238ba",
        },
        data: form.values,
      };

      axios(config).then((response) => {
        console.log(response.data.data);
        setApplicant(response.data.data);
        router.push("/track_application");
      });
    } else alert("Please enter an applicant id");
    // .catch((error) => {
    //   console.log(error);
    // });
  };

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
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   // router.push("/track_application");
          // }}
          className="flex flex-col"
        >
          <TextInput
            {...form.getInputProps("application_id")}
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
            onClick={(e) => loginUser(e)}
          >
            Track{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
