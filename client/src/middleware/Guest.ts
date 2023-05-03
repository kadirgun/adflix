import { useAppSelector } from "@/slices/store";
import { NextRouter } from "next/router";
import { useEffect } from "react";

export default (router: NextRouter) => {
  const auth = useAppSelector((state) => state.user.auth);
  
  useEffect(() => {
    if (auth.access_token) {
      router.push("/dashboard");
    }
  }, [auth]);
}