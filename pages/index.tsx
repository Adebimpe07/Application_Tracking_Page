import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../src/store";

export default function index() {
  const { replace, query, pathname } = useRouter();
  const [course, setCourse] = useStore.course();
  const [id, setId] = useStore.id();
  useEffect(() => {
    if (query.course && query.id) {
      setId(String(query.id));
      setCourse(query.course as string);
      replace("/register");
    }
  }, [query.course]);
  return null;
}
