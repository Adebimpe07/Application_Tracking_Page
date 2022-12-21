import React, { useEffect, useState } from "react";
import Logo from "../../src/Asset/afex_logo.png";
import { useStore } from "../../src/store";
import Tracking from "./Tracking";
const index = () => {
  const [applicant, setApplicant] = useState(null);
  useEffect(() => {
    setApplicant(JSON.parse(localStorage.getItem("applicant")));
  }, []);
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

              <span
                className={
                  applicant?.application_status[0].status === "accepted"
                    ? "text-[green] font-semibold"
                    : applicant?.application_status[0].status === "rejected"
                    ? "text-[red] font-semibold"
                    : applicant?.application_status[0].status === "pending"
                    ? "text-[orange] font-semibold"
                    : "text-[black] font-semibold"
                }
              >
                {applicant?.application_status[0].status}
              </span>
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
