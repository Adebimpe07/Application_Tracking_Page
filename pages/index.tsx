import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../src/store";

export default function index() {
  const { replace, query } = useRouter();
  const [course, setCourse] = useStore.course();
  useEffect(() => {
    if (query.course) {
      setCourse(query.course as string);
      replace("/register");
    }
  }, [query.course]);
  return null;
}
