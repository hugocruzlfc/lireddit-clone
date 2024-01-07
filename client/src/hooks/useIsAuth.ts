import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { usePathname, useRouter } from "next/navigation";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + pathname);
    }
  }, [fetching, data, router]);
};
