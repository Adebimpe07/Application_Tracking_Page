import React from "react";
import Status from "../../src/Asset/status.png";
import axios from "axios";
import { useStore } from "../../src/store";
import moment from "moment";

type trackingprops = {
  activity: string;
  details: string;
  time: string;
  status: string;
};

const Tracking = ({ activity, details, time }: trackingprops) => {
  const [applicant, setApplicant] = useStore();

  return (
    <main className="w-[70%] m-auto items-center flex bg-[#fff] rounded-2xl  gap-8 mb-6 px-6 py-3 sm:mt-6 tracking-wide">
      <div>
        <img className="sm:w-max" width="65" src={Status.src} alt="" />
      </div>
      <div className="flex flex-col w-[47rem]">
        <h1 className="font-semibold ">{activity}</h1>
        <p>{details}</p>
      </div>

      <p className="flex-1 text-end min-w-[5.5rem] self-center">
        {moment(time).fromNow()}
      </p>
    </main>
  );
};

export default Tracking;
