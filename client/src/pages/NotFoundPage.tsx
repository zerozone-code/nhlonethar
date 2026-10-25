import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = ({
  message = "ရှာနေတဲ့ စာမျက်နှာ မတွေ့ပါဘူး",
}: {
  message?: string;
}) => {
  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <p className=" text-6xl text-rose-brand/40">♡</p>
      <h1 className="mt-6 text-2xl font-bold">{message}</h1>
      <Link
        to={"/"}
        className="mt-8 inline-block rounded-full bg-rose-brand px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        ပင်မစာမျက်နှာသို့ ပြန်သွားမယ်
      </Link>
    </div>
  );
};

export default NotFoundPage;
