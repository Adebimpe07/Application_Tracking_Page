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

type props = {
  setOthers: React.SetStateAction<File | null>,
  setResume: React.SetStateAction<File | null>,
  resume: File | null,
  others: File | null
}

const Career = ({setOthers, setResume, resume, others}: props) => {
  const router = useRouter();
  const [err, setErr] = useState(false);

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

  const textRef = useRef();

  return (
    <main className="bg-[#E5E5E5] lg:flex lg:m-0 flex-col pt-12">
      <section className="sm:w-[80%] sm:my-0 sm:m-auto sm:pb-[64px]">
        <div className="md:flex md:gap-[49px] md:items-center hidden">
          {registerTabs.map((item, idx) => (
            <div
              key={idx}
              className="md:w-[420px] md:pb-[49px] md:pt-[64px] w-[180px]"
            >
              <div
                className={
                  presentRoute === "/career" && idx <= 1
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
                Apply As A Back-end Developer
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
                Remote - Ibadan Only - full Time
              </p>
            </div>
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
              Career Summary
            </h3>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 block w-full">
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
              }}
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
              Next
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Career;
