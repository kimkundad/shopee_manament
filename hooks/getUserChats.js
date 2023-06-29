import useSWR from "swr";
import { fetcher } from "@/services/test";

export function getUserChats(shopId){
    
    shopId = shopId || 0

    const { data, error } = useSWR(`https://api.sellpang.com/api/getUserChats/${shopId}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error,
    }
}