import useSWR from "swr";
import { fetcher } from "@/services/test";

export function newOrder(code_user) {
  
  const { data, error } = useSWR(
    `https://api.sellpang.com/api/newNoti/${code_user}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
