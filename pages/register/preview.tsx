import { TextInput, Group, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { Select } from "@mantine/core";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Radio, FileInput, Textarea } from "@mantine/core";
import Icon from "../../src/Asset/files.png";
import { IconUpload } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import registerTabs from "../../src/layout/registerTabs.json";
import { useRegisterFormContext } from "../../src/layout/RegisterFormProvider";
import registerPersonalInfo from "../../src/layout/registerPersonalInfo.json";
import registerCareerInfo from "../../src/layout/registerCareerInfo.json";
import moment from "moment";
import ApplicationModal from "../../src/component/applicationModal";

type props = {
  resume: File;
  others: File;
};

const Preview = ({ resume, others }: props) => {
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);

  const { asPath } = useRouter();

  const presentRoute = asPath.replace("/register", "");

  const form = useRegisterFormContext();
  const [oopened, setOopened] = useState(false);

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

  const handleSubmitform = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (resume) {
      const formData = new FormData();
      const myHeaders = new Headers();

      myHeaders.append(
        "api-key",
        "qsMNjvnWL4aqOATjtjLoaoaRPw2Fec0jf43J5oB02Sv7hMELvfcwnOdzS9FQHOvW"
      );
      myHeaders.append("request-ts", "1667549939702");
      myHeaders.append(
        "hash-key",
        "ffefa32cfa2df9944ce9ad0212cc80169b1f7574fe09631a46756600d33238ba"
      );

      formData.append("resume", resume, resume?.name);
      formData.append("other_attachment", others, others?.name);
      formData.append("cover_letter", form.values.cover_letter);
      formData.append("first_name", form.values.first_name);
      formData.append("last_name", form.values.last_name);
      formData.append("email", form.values.email);
      formData.append("phone_number", form.values.phone_number);
      formData.append("gender", form.values.gender);
      formData.append(
        "date_of_birth",
        moment(form.values.date_of_birth).format("YYYY-MM-DD")
      );
      formData.append("country_of_origin", form.values.country);
      formData.append("current_location", form.values.state);
      formData.append("qualification", form.values.highest_qualification);
      formData.append("graduation_school", form.values.school_attended);
      formData.append("course_of_study", form.values.course_of_study);
      formData.append("graduation_grade", form.values.graduation_grade);
      formData.append("years_of_experience", form.values.years_of_expereince);
      formData.append("last_company_worked", form.values.last_company_worked);
      formData.append("last_position", form.values.last_position);
      formData.append(
        "is_willing_to_relocate",
        form.values.are_you_willing_to_relocate
      );
      formData.append("is_completed_NYSC", form.values.completed_nysc);

      try {
        const res = await fetch(
          `${process.env.BASE_URL}/api/applications/1/apply`,
          {
            method: "post",
            headers: myHeaders,
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.success === true) {
          setOopened(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className="bg-[#E5E5E5] md:flex md:m-0 flex-col pt-12 overflow-auto"
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
                className="m-0 text-base font-medium text-[#252735] md:pt-5 pt-1"
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
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
            <div className="md:grid md:grid-cols-2 md:w-full md:gap-x-16 md:gap-y-2 block w-full md:justify-items-start">
              {registerPersonalInfo.map(({ label, name, placeholder }) =>
                name === "date_of_birth" ? (
                  <DatePicker
                    key={name}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0 ",
                      root: "md:!flex md:flex-col !items-center md:gap-4",
                      label: "md:w-[100%]",
                    }}
                    label={label}
                    {...form.getInputProps(name)}
                    withAsterisk
                  />
                ) : name === "gender" ? (
                  <Select
                    label={label}
                    readOnly
                    defaultValue={label}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0 ",
                      root: "md:!flex md:flex-col !items-center md:gap-4",
                      label: "md:w-[100%]",
                    }}
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
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center md:gap-4",
                      label: "md:w-[100%]",
                    }}
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
            <div className="md:grid md:grid-cols-2 md:w-full md:gap-x-16 md:gap-y-2 block w-full md:justify-items-start">
              {registerCareerInfo.map(({ label, name, ...data }) =>
                name === "completed_nysc" ? (
                  <Radio.Group
                    key={name}
                    label={label}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center md:gap-2",
                      label: "md:w-[100%]",
                    }}
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
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center md:gap-2",
                      label: "md:w-[100%]",
                    }}
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
                ) : name === "cover_letter" ? (
                  <Textarea
                    label={label}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center md:gap-2",
                      label: "md:w-[100%]",
                    }}
                    placeholder={data?.placeholder ?? ""}
                    key={name}
                    {...form.getInputProps(name)}
                    withAsterisk={true}
                  />
                ) : name === "resume_or_cv" ? (
                  <FileInput
                    value={resume}
                    label={label}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center md:gap-2 ",
                      label: "md:w-[100%]",
                    }}
                    placeholder={data?.placeholder || ""}
                  />
                ) : name === "other_attachment" ? (
                  <FileInput
                    value={others}
                    label={label}
                    disabled
                    placeholder={data?.placeholder}
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center  md:gap-2",
                      label: "md:w-[100%]",
                    }}
                  />
                ) : name === "highest_qualification" ? (
                  <Select
                    label={label}
                    readOnly
                    defaultValue={label}
                    key={name}
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white] !text-[black] !opacity-100 !p-0 ",
                      root: "md:!flex md:flex-col !items-center  md:gap-2",
                      label: "md:w-[100%]",
                    }}
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
                    disabled
                    classNames={{
                      disabled:
                        "!border-0 !bg-[white]  !text-[black] !opacity-100 !p-0",
                      root: "md:!flex md:flex-col !items-center  md:gap-2",
                      label: "md:w-[100%]",
                    }}
                  />
                )
              )}
            </div>
            <ApplicationModal oopened={oopened} setOopened={setOopened} />
            <button
              type="submit"
              className="text-[#fff] text-lg font-bold bg-[#A01B14] rounded-lg w-full cursor-pointer py-1"
              onClick={(e) => handleSubmitform(e)}
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
