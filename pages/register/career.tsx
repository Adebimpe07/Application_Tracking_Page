import { TextInput } from "@mantine/core";
import React, { useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { Select } from "@mantine/core";
import { useRouter } from "next/router";
import { Radio, FileInput } from "@mantine/core";
import Icon from "../../src/Asset/files.png";
import { IconUpload } from "@tabler/icons";
import { useRegisterFormContext } from "../../src/layout/RegisterFormProvider";
import { Textarea } from "@mantine/core";

import registerTabs from "../../src/layout/registerTabs.json";
import registerCareerInfo from "../../src/layout/registerCareerInfo.json";
import { useStore } from "../../src/store";

type props = {
  setOthers: (payload: File) => void;
  setResume: (payload: File) => void;
  resume: File | null;
  others: File | null;
};

const Career = ({ setOthers, setResume, resume, others }: props) => {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const [course, setCourse] = useStore.course();

  const { asPath } = useRouter();

  const presentRoute = asPath.replace("/register", "");
  // console.log(presentRoute);

  const form = useRegisterFormContext();
  // console.log(form.values)

  const handleSubmit = (values: typeof form.values) => {};

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

  const textRef = useRef<HTMLInputElement>(null);

  return (
    <main className="bg-[#E5E5E5] lg:flex lg:m-0 flex-col overflow-auto h-full">
      <section className="sm:w-[80%] sm:my-0 sm:m-auto sm:pb-4 flex flex-col h-full">
        <div className="md:flex md:gap-[49px] md:items-center hidden overflow-auto h-42">
          {registerTabs.map((item, idx) => (
            <div key={idx} className="md:w-[26.3rem] md:pb-8 md:pt-14 w-32">
              <div
                className={
                  presentRoute === "/career" && idx <= 1
                    ? "h-1 bg-[#A01B14] rounded-2xl"
                    : "h-1 bg-[#D0D5DD] rounded-2xl"
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
        <div className="px-12 py-6 bg-[#fff] mt-4 rounded-2xl h-full overflow-auto flex flex-col">
          <div className="block h-48 overflow-auto">
            <div>
              <p className="text-2xl font-semibold text-[#252735] m-0">
                Apply For{" "}
                {course
                  .split("-")
                  .map((item) => {
                    return item.replace(item[0], item[0]?.toLocaleUpperCase());
                  })
                  .join(" ")}
              </p>
              <p className="text-base font-normal pt-[0.7rem] m-0 text-[#948E8E]">
                Remote - Ibadan Only - full Time
              </p>
              <h3 className="md:mb-2 md:mt-2 text-[#A01B14] text-lg border-b border-[#000] pb-2">
                Career Summary
              </h3>
            </div>
          </div>
          <form
            onSubmit={form.onSubmit(handleSubmit, handleError)}
            className="flex flex-col gap-3 h-full overflow-auto"
          >
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 block w-full h-full overflow-auto">
              {registerCareerInfo.map(({ label, name, ...data }) =>
                name === "completed_nysc" ? (
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
                    value={resume}
                    onChange={setResume}
                    placeholder={data?.placeholder || ""}
                    icon={
                      <img
                        src={Icon.src}
                        className="w-6"
                        key={name}
                        {...form.getInputProps(name)}
                      />
                    }
                    withAsterisk={true}
                  />
                ) : name === "cover_letter" ? (
                  <div>
                    <Textarea
                      ref={textRef}
                      label={label}
                      placeholder={data?.placeholder ?? ""}
                      key={name}
                      {...form.getInputProps(name)}
                      withAsterisk={true}
                    />
                    {err && (
                      <small className="text-[red]">
                        cover letter must be at least 400 characters
                      </small>
                    )}
                  </div>
                ) : name === "other_attachment" ? (
                  <FileInput
                    label={label}
                    value={others}
                    onChange={setOthers}
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
                ) : name === "graduation_grade" ? (
                  <Select
                    label={label}
                    key={name}
                    placeholder={data?.placeholder}
                    {...form.getInputProps(name)}
                    withAsterisk={true}
                    data={[
                      { value: "firstclass", label: "First Class" },
                      { value: "upper", label: "Second Class Upper" },
                      { value: "lower", label: "Second Class Lower" },
                      { value: "third", label: "Third Class" },
                      { value: "pass", label: "Pass" },
                      { value: "dis", label: "Distinction" },
                      { value: "creditup", label: "Upper Credit" },
                      { value: "creditlow", label: "Lower Credit" },
                      { value: "other", label: "Others" },
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
              type="button"
              onClick={() => {
                textRef.current.value.length < 400 && !form.validate().hasErrors
                  ? setErr(true)
                  : router.push("/register/preview");
                // console.log({...form.values, resume_or_cv:resume, other_attachment:others
                // })
              }}
              className="text-[#fff] text-lg font-bold bg-[#A01B14] rounded-lg w-full cursor-pointer py-1"
            >
              Next
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Career;
