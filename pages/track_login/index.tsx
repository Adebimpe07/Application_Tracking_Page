import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useRouter } from "next/router";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import sha256 from "crypto-js/sha256";
import axios, { AxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";
import { useStore } from "../../src/store";

const index = () => {
  const router = useRouter();
  const [applicant, setApplicant] = useStore.applicant();
  const form = useForm({
    initialValues: {
      application_id: "",
    },
  });
  var key = CryptoJS.enc.Base64.parse(
    "HmYOKQj7ZzF8cbeswYY9uLqbfMSUS2tI6Pz45zjylOM="
  );
  var iv = CryptoJS.enc.Base64.parse("PL2LON7ZBLXq4a32le+FCQ==");
  const encrypt = (element: any) => {
    return CryptoJS.AES.encrypt(element, key, {
      iv: iv,
    }).toString();
  };
  const trackApplication = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const requestTs = String(Date.now());
    var config: AxiosRequestConfig = {
      method: "post",
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      url: `api/applications/track`,
      headers: {
        "api-key": process.env.NEXT_PUBLIC_APP_API_KEY,
        "request-ts": requestTs,
        "hash-key": sha256(
          process.env.NEXT_PUBLIC_APP_API_KEY +
            process.env.NEXT_PUBLIC_SECRET_KEY +
            requestTs
        ).toString(CryptoJS.enc.Hex),
      },
      data: { data: encrypt(JSON.stringify(form.values)) },
    };
    if (form.values.application_id) {
      axios(config)
        .then(function (response) {
          let decrypted_data = JSON.parse(
            CryptoJS.AES.decrypt(response.data.data, key, {
              iv: iv,
            }).toString(CryptoJS.enc.Utf8)
          );
          setApplicant(decrypted_data);
          localStorage.setItem("applicant", JSON.stringify(decrypted_data));
          router.push("/track_application");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Please enter an applicant id");
  };

  return (
    <div className="bg-[#E5E5E5] flex flex-col items-center justify-center pb-8 h-screen">
      <header>
        <img src={Logo.src} alt="logo" />
      </header>
      <div className="bg-[#fff] flex flex-col rounded-2xl p-7 sm:p-14 sm:mt-6 mt-2 leading-5 shadow-xl shadow-[0px 51.8664px 76.6208px rgba(193, 194, 198, 0.19)]">
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
            onClick={(e) => trackApplication(e)}
          >
            Track{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
