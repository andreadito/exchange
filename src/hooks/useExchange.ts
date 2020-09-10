import {useMutation} from "react-query";
import {exchange} from "../services/mutations";

export function useExchange() {
    return useMutation(exchange)
}
