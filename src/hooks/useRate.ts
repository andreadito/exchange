import {useQuery} from "react-query";
import {getRate} from "../services/queries";

export function useRate(base: string, symbol: string) {
    return useQuery(["rates", base, symbol], getRate, {
        refetchInterval: 10000
    } );
}
