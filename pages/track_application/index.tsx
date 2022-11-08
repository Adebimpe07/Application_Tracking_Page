import React from "react";
import Logo from "../../src/Asset/afex_logo.png";
import Tracking from "./Tracking";
import ApplicantData from "../../src/layout/ApplicantData.json";

const index = () => {
  const { name, application_id, applicationStatus } = ApplicantData;

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
                <span className="pl-2">{name}</span>
              </p>
              <p className="font-semibold">
                Applicant ID:
                <span> {application_id}</span>
              </p>
            </div>
            <p className="self-center sm:text-end flex-1">
              <span className="font-semibold">Status: </span>

              {applicationStatus.map((item, idx, arr) =>
                idx === arr.length - 1 ? (
                  <span
                    key={idx}
                    className={
                      item.application_status === "Accepted"
                        ? "text-[green] font-semibold"
                        : item.application_status === "Rejected"
                        ? "text-[red] font-semibold"
                        : item.application_status === "Pending"
                        ? "text-[orange] font-semibold"
                        : "text-[black] font-semibold"
                    }
                  >
                    {item.application_status}
                  </span>
                ) : null
              )}
            </p>
          </div>
          <p className="pt-6 w-[70%] m-auto">Recent Activity</p>
        </main>
        <div className="flex-1 bg-[#E5E5E5]">
          {applicationStatus.map(
            ({ activity, application_status, details, timestamp }, i) => (
              <Tracking
                key={i}
                activity={activity}
                details={details}
                time={timestamp}
                status={application_status}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
