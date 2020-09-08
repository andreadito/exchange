import {queryWallets} from "../services/queries";
import {useQuery} from "react-query";

export default function useWallets() {
    return useQuery("wallets", queryWallets);
}
