import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/test";

export function getUserChats(shopId){
    
    shopId = shopId || 0

    const { data, error } = useSWR(`https://api.sellpang.com/api/getUserChats/${shopId}`, fetcher)

    const mutateUserChats = () => {
      mutate(`https://api.sellpang.com/api/getUserChats/${shopId}`);
    };

    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutateUserChats,
    }
}