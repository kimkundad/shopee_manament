import useSWR from "swr";
import { fetcher } from "@/services/test";

export function getMessage({userId, shopId, type}){

    const { data, error } = useSWR(`https://api.sellpang.com/api/getMessage2/${userId}/${shopId}/${type}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error,
    }
}