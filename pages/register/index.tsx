import { TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { DatePicker } from "@mantine/dates";
import { Select } from "@mantine/core";
import { useRouter } from "next/router";
import { useRegisterFormContext } from "../../src/layout/RegisterFormProvider";

import registerTabs from "../../src/layout/registerTabs.json";
import registerPersonalInfo from "../../src/layout/registerPersonalInfo.json";
import registerCountry from "../../src/layout/registerCountry.json";
import { useStore } from "../../src/store";

const IndexPage = () => {
  const router = useRouter();
  const [course, setCourse] = useStore.course();

  const { asPath } = useRouter();

  const presentRoute = asPath.replaceAll("/", "");

  const form = useRegisterFormContext();

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

  return (
    <main className="bg-[#E5E5E5] lg:flex lg:m-0 flex-col overflow-auto">
      <section className="sm:w-[80%] sm:my-0 sm:m-auto sm:pb-8 flex flex-col overflow-auto">
        <div className="md:flex md:gap-[49px] md:items-center hidden sticky top-0 overflow-auto">
          {registerTabs.map((item, idx) => (
            <div key={idx} className="md:w-[420px] md:pb-8 md:pt-14 w-32">
              <div
                className={
                  presentRoute === "register" && idx === 0
                    ? "h-1 bg-[#A01B14] rounded-2xl"
                    : "h-1 bg-[#D0D5DD] rounded-2xl"
                }
              ></div>
              <p className="m-0 text-base font-medium text-[#252735] lg:pt-5 pt-1">
                {item}
              </p>
            </div>
          ))}
        </div>
        <div
          className="pt-8 px-12 py-8"
          style={{
            background: "#FFF",
            borderRadius: "16px",
          }}
        >
          <div className="sm:flex sm:justify-between block">
            <div className="w-full">
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#252735",
                  margin: 0,
                }}
              >
                Apply For{" "}
                {course
                  .split("-")
                  .map((item) => {
                    return item.replace(item[0], item[0].toLocaleUpperCase());
                  })
                  .join(" ")}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#948E8E",
                  paddingTop: "14px",
                  margin: 0,
                }}
              >
                Remote - Ibadan Only - full Time
              </p>
              <h3
                style={{
                  color: "#A01B14",
                  fontSize: "18px",
                  borderBottom: "1px solid black",
                  paddingBottom: "16px",
                }}
                className="md:mb-10 md:mt-4"
              >
                Personal Information
              </h3>
            </div>
          </div>
          <form
            onSubmit={form.onSubmit(handleSubmit, handleError)}
            style={{ display: "flex", flexDirection: "column", gap: "48px" }}
          >
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
                ) : name === "marital_status" ? (
                  <Select
                    label={label}
                    key={name}
                    placeholder={placeholder}
                    {...form.getInputProps(name)}
                    data={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                    ]}
                  />
                ) : name === "country" ? (
                  <Select
                    label={label}
                    key={name}
                    placeholder="Choose one"
                    {...form.getInputProps(name)}
                    data={registerCountry}
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
            <button
              type="submit"
              onClick={() => {
                form.validate().hasErrors
                  ? null
                  : router.push("/register/career");
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

export default IndexPage;
