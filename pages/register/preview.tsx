import { TextInput, Group, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { Select } from "@mantine/core";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Radio, FileInput } from "@mantine/core";
import Icon from "../../src/Asset/files.png";
import { IconUpload } from "@tabler/icons";
import Link from "next/link";

import registerTabs from "../../src/layout/registerTabs.json";
import { useRegisterFormContext } from "../../src/layout/RegisterFormProvider";
import registerPersonalInfo from "../../src/layout/registerPersonalInfo.json"
import registerCareerInfo from "../../src/layout/registerCareerInfo.json"




const Preview = () => {
  const router = useRouter();

  const { asPath } = useRouter();

  const presentRoute =  asPath.replace("/register", "");

  const form = useRegisterFormContext();

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  const handleError = (errors: typeof form.errors) => {
    if (errors.first_name) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.last_name) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.email) {
      showNotification({
        message: "Please provide a valid email",
        color: "red",
      });
    } else if (errors.date_of_birth) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.number) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.address) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.city) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.state) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.country) {
      showNotification({ message: "Please fill name field", color: "red" });
    } else if (errors.marital_status) {
      showNotification({ message: "Please fill name field", color: "red" });
    }
  };

  return (
    <form
      className="bg-[#E5E5E5] lg:flex lg:m-0 flex-col pt-12"
      onSubmit={form.onSubmit(handleSubmit, handleError)}
            
    >
      <section className="sm:w-[80%] sm:my-0 sm:m-auto sm:pb-[64px]">
        <div className="md:flex md:gap-[49px] md:items-center hidden">
          {registerTabs.map((item, idx) => (
            <div
              key={idx}
              className="md:w-[420px] md:pb-[49px] md:pt-[64px] w-[180px]"
            >
              <div
                className={
                  presentRoute === "/preview" && idx <= 2
                    ? "h-[5px] bg-[#A01B14] rounded-2xl"
                    : "h-[5px] bg-[#D0D5DD] rounded-2xl"
                }
              ></div>
              <p
                key={item}
                className="m-0 text-base font-medium text-[#252735] lg:pt-5 pt-1"
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "48px",
          }}
        >
          <div className="sm:flex sm:justify-between block">
            <div>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#252735",
                  margin: 0,
                }}
              >
                Preview Application
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#948E8E",
                  paddingTop: "16px",
                  margin: 0,
                }}
              >
                Preview the details you have entered before final submission
              </p>
            </div>
            <Link href="/register">
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#A01B14",
                  textDecorationLine: "underline",
                  margin: 0,
                }}
              >
                Edit Application
              </p>
            </Link>
          </div>
          <form
            onSubmit={form.onSubmit(handleSubmit, handleError)}
            style={{ display: "flex", flexDirection: "column", gap: "48px" }}
          >
            <h3
              style={{
                color: "#A01B14",
                fontSize: "18px",
                borderBottom: "1px solid black",
                paddingBottom: "16px",
              }}
              className="md:pt-10"
            >
              Personal Information
            </h3>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 block w-full">
              {registerPersonalInfo.map(({ label, name, placeholder }) =>
                name === "date_of_birth" ? (
                  <DatePicker
                    key={name}
                    label={label}
                    {...form.getInputProps(name)}
                    withAsterisk
                  />
                ) : name === "gender" ? (
                  <Select
                    label={label}
                    key={name}
                    placeholder={placeholder}
                    {...form.getInputProps(name)}
                    data={[
                      { value: "female", label: "Female" },
                      { value: "male", label: "Male" },
                    ]}
                  />
                ) : (
                  <TextInput
                    withAsterisk
                    key={name}
                    label={label}
                    {...form.getInputProps(name)}
                    placeholder={placeholder}
                  />
                )
              )}
            </div>
            <h3
              style={{
                color: "#A01B14",
                fontSize: "18px",
                borderBottom: "1px solid black",
                paddingBottom: "16px",
              }}
            >
              Career Summary
            </h3>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 block w-full">
              {registerCareerInfo.map(({ label, name, ...data }) =>
                name === "completed_nysc?" ? (
                  <Radio.Group
                    key={name}
                    label={label}
                    {...form.getInputProps(name)}
                    data={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    withAsterisk={true}
                  >
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                  </Radio.Group>
                ) : name === "are_you_willing_to_relocate" ? (
                  <Radio.Group
                    label={label}
                    key={name}
                    {...form.getInputProps(name)}
                    data={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    withAsterisk={true}
                  >
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                  </Radio.Group>
                ) : name === "resume_or_cv" ? (
                  <FileInput
                    label={label}
                    placeholder={data?.placeholder || ""}
                    icon={
                      <img
                        src={Icon.src}
                        className="w-6"
                        key={name}
                        {...form.getInputProps(name)}
                        withAsterisk={true}
                      />
                    }
                  />
                ) : name === "cover_letter" ? (
                  <FileInput
                    label={label}
                    placeholder={data?.placeholder ?? ""}
                    icon={
                      <img
                        src={Icon.src}
                        className="w-6"
                        key={name}
                        {...form.getInputProps(name)}
                        withAsterisk={true}
                      />
                    }
                  />
                ) : name === "other_attachment" ? (
                  <FileInput
                    label={label}
                    placeholder={data?.placeholder}
                    icon={
                      <img
                        src={Icon.src}
                        className="w-6"
                        key={name}
                        {...form.getInputProps(name)}
                        withAsterisk={true}
                      />
                    }
                  />
                ) : name === "highest_qualification" ? (
                  <Select
                    label={label}
                    key={name}
                    placeholder={data?.placeholder}
                    {...form.getInputProps(name)}
                    withAsterisk={true}
                    data={[
                      { value: "postgraduate", label: "Postgraduate" },
                      { value: "bsc", label: "B.Sc" },
                      { value: "ssce", label: "SSCE" },
                    ]}
                  />
                ) : (
                  <TextInput
                    key={name}
                    label={label}
                    {...form.getInputProps(name)}
                    id={name}
                  />
                )
              )}
            </div>
            <button
              type="submit"
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: "700",
                paddingTop: "16px",
                paddingBottom: "16px",
                background: "#A01B14",
                borderRadius: "8px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </form>
  );
};

export default Preview;
