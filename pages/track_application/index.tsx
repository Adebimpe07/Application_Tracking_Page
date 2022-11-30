import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useStore } from "../../src/store";
import Tracking from "./Tracking";
// import ApplicantData from "../../src/layout/ApplicantData.json";

const index = () => {
  const [applicant, setApplicant] = useStore.applicant();

  return (
    <div className="flex flex-col bg-[#E5E5E5] h-screen">
      <div className="py-4 bg-[#fff] pl-12">
        <img src={Logo.src} alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <main className="">
          <div className="sm:flex w-[70%] m-auto  bg-[#fff] rounded-2xl  gap-8  py-6 px-6 mt-10 tracking-wide justify-between">
            <div className="flex flex-col">
              <p className="font-semibold">
                Applicant Name:
                <span className="pl-2">{applicant?.applicant_name}</span>
              </p>
              <p className="font-semibold">
                Applicant ID:
                <span> {applicant?.application_id}</span>
              </p>
            </div>
            <p className="self-center sm:text-end flex-1">
              <span className="font-semibold">Status: </span>

              {applicant?.application_status?.map((item, idx, arr) =>
                idx === arr.length - 1 ? (
                  <span
                    key={idx}
                    className={
                      item.status === "Accepted"
                        ? "text-[green] font-semibold"
                        : item.status === "Rejected"
                        ? "text-[red] font-semibold"
                        : item.status === "Pending"
                        ? "text-[orange] font-semibold"
                        : "text-[black] font-semibold"
                    }
                  >
                    {item.status}
                  </span>
                ) : null
              )}
            </p>
          </div>
          <p className="pt-6 w-[70%] m-auto">Recent Activity</p>
        </main>
        <div className="flex-1 bg-[#E5E5E5]">
          {applicant?.application_status?.map(
            ({ activity, status, details, timestamp }, i) => (
              <Tracking
                key={i}
                activity={activity}
                details={details}
                time={timestamp}
                status={status}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
