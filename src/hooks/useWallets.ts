import {queryWallets} from "../services/queries";
import {useQuery} from "react-query";

export function useWallets() {
    return useQuery("wallets", queryWallets);
}
