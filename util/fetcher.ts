import axios from "axios";

const fetcher = (url: string) => axios.get<any>(url).then((res) => res.data);

export default fetcher;
