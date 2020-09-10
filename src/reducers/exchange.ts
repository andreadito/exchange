import {Currency} from "../utils";


export interface ExchangeState {
    base: Currency;
    symbol: Currency;
    rateFrom: number;
    rateTo: number;
    isExceeding: boolean;
    exchange: {
        from_value: number,
        from_currency: string,
        to_value: number,
        to_currency: string
    };
}

function createActionName(name: string) {
    return `exchange/${name.toUpperCase()}`
}

export const SET_BASE = createActionName('SET_BASE');
export const SET_SYMBOL = createActionName('SET_SYMBOL');
export const SET_RATE_FROM = createActionName('SET_RATE_FROM');
export const SET_RATE_TO = createActionName('SET_RATE_TO');
export const SET_IS_EXCEEDING = createActionName('SET_IS_EXCEEDING');
export const SET_EXCHANGE = createActionName('SET_EXCHANGE');

export function exchangeReducer(state: ExchangeState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case SET_BASE:
            return {
                ...state,
                base: action.payload
            }
        case SET_SYMBOL:
            return {
                ...state,
                symbol: action.payload
            }
        case SET_RATE_FROM:
            return {
                ...state,
                rateFrom: action.payload
            }
        case SET_RATE_TO:
            return {
                ...state,
                rateTo: action.payload
            }
        case SET_IS_EXCEEDING:
            return {
                ...state,
                isExceeding: action.payload
            }
        case SET_EXCHANGE:
            return {
                ...state,
                exchange: action.payload
            }
        default:
            throw new Error(`no action registered with this name: ${action.type}`)
    }
}
