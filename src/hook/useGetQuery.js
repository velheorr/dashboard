import {useQuery} from "react-query";
import axios from "axios";
import {BACK} from "../utils/links";

async function fetchData(){
    /*return (await axios.get("https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetBlocSales") ).data.response.data*/
    return (await axios.get(`${BACK}/api/dashboarddata`)).data
}

export const useGetQuery = () => {
    return useQuery('data', fetchData,
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        })
}