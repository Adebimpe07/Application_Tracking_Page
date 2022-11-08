import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
  const { replace } = useRouter();
  useEffect(() => { replace("/register") }, [])
  return null;
}
