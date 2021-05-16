import {useQuery} from "react-query";
import axios from 'axios'


export const getPropertyPreview = useQuery("propertyPreview", async () => {
    const { data } = await axios.get('/preview?page=0')
    return data;
})