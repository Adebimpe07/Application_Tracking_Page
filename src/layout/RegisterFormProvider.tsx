import { createFormContext } from "@mantine/form";
import { yupResolver } from "@mantine/form";
import * as Yup from "yup";

interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  city: string;
  address: string;
  country: string;
  state: string;
  marital_status: string;
  highest_qualification: string;
  years_of_expereince: string;
  last_company_worked: string;
  last_position: string;
  school_attended: string;
  course_of_study: string;
  graduation_grade: string;
  cover_letter: string;
  completed_nysc: string;
  are_you_willing_to_relocate: string;
}

const [FormProvider, useFormContext, useForm] =
  createFormContext<RegisterForm>();

export { useFormContext as useRegisterFormContext };

interface IRegisterFormProvider {
  children: React.ReactNode;
}

export function RegisterFormProvider({ children }: IRegisterFormProvider) {
  const registerForm = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: new Date().toISOString(),
      gender: "",
      city: "",
      address: "",
      country: "",
      state: "",
      marital_status: "",
      highest_qualification: "",
      years_of_expereince: "",
      last_company_worked: "",
      last_position: "",
      school_attended: "",
      course_of_study: "",
      graduation_grade: "",
      cover_letter: "",
      completed_nysc: "",
      are_you_willing_to_relocate: "",
    },
    validate: yupResolver(Yup.object().shape({
      first_name: Yup.string().min(2, "Name must have at least 2 letters").required(),
      last_name: Yup.string().min(2, "Name must have at least 2 letters").required(),
      email: Yup.string().email().required("Invalid email").required(),
      phone_number: Yup.string().matches(/^[0-9]*$/, "Invalid Phone Number").min(11).required(),
      // cover_letter: Yup.string().min(400, "Cover letter must have at least 400 characters").required()
      
    }))
    
    
    // {
    //   first_name: (value) =>
    //     value.length < 2 ? "Name must have at least 2 letters" : null,
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : ""),
    //   last_name: (value) =>
    //     value.length < 2 ? "Name must have at least 2 letters" : null,
    //   phone_number: (value) =>
    //     .test(value) && String(value).length === 11
    //       ? null
    //       : "",
    // },
  });

  return <FormProvider form={registerForm}>{children}</FormProvider>;
}
