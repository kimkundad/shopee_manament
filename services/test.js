import axios from 'axios'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export const fetcher = async (url) => {
    /* const accessToken = getCookie('access_token') */
    const { data } = await axios.get(url)
    return data
}