import { useAppSelector } from "@/slices/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const auth = useAppSelector((state) => state.user.auth);
  const router = useRouter();
  
  useEffect(() => {
    if (auth.access_token) {
      router.push("/dashboard");
    }
  }, [auth]);
}