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
    <main className="bg-[#E5E5E5] lg:flex lg:m-0 flex-col overflow-auto h-full">
      <section className="sm:w-[80%] sm:my-0 sm:m-auto sm:pb-4 flex flex-col h-full">
        <div className="md:flex md:gap-[49px] md:items-center hidden overflow-auto h-32">
          {registerTabs.map((item, idx) => (
            <div key={idx} className="md:w-[26.3rem] md:pb-8 md:pt-14 w-32">
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
        <div className="px-12 py-4 bg-[#fff] mt-4 rounded-2xl h-full overflow-auto flex flex-col">
          <div className="sm:flex sm:justify-between block h-[8rem] sm:h-[11rem] overflow-auto">
            <div className="w-full text-2xl font-semibold m-0 text=[#252735] overflow-auto h-full">
              <p className="text-2xl font-semibold text-[#252735] m-0">
                Apply For{" "}
                {course
                  .split("-")
                  .map((item) => {
                    return item.replace(item[0], item[0].toLocaleUpperCase());
                  })
                  .join(" ")}
              </p>
              <p className="text-base font-normal pt-[0.7rem] m-0 text-[#948E8E]">
                Remote - Ibadan Only - full Time
              </p>
              <h3 className="md:mb-2 md:mt-2 text-[#A01B14] text-lg border-b border-[#000] pb-2">
                Personal Information
              </h3>
            </div>
          </div>
          <form
            className="flex flex-col gap-12 h-full overflow-auto"
            onSubmit={form.onSubmit(handleSubmit, handleError)}
          >
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-7 block w-full h-full overflow-auto">
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

export default IndexPage;
