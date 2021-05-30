import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../config";


export const useFetchProperties = () => {
    return useQuery("propertyPreview", async () => {
        const {data} = await axios.get(`${baseUrl}/preview?page=0`);
        return data;
    })
}


