import {exchangeReducer, SET_BASE, SET_IS_EXCEEDING, SET_RATE_FROM, SET_RATE_TO, SET_SYMBOL} from "./exchange";
import {Currency} from "../utils";

describe("exchange reducer", () => {

    const state = {
        base: Currency.GBP,
            isExceeding: false,
        rateTo: 2,
        symbol: Currency.EUR,
        rateFrom: 1,
    }

    describe("SET_BASE", () => {
        it("should update the state with the new payload", () => {
            const result = exchangeReducer(state, {type: SET_BASE, payload: 2});
            expect(result).toEqual({...state, base: 2})
        })
    })
    describe("SET_SYMBOL", () => {
        it("should update the state with the new payload", () => {
            const result = exchangeReducer(state, {type: SET_SYMBOL, payload: Currency.GBP});
            expect(result).toEqual({...state, symbol: Currency.GBP})
        })
    })
    describe("SET_RATE_FROM", () => {
        it("should update the state with the new payload", () => {
            const result = exchangeReducer(state, {type: SET_RATE_FROM, payload: 1});
            expect(result).toEqual({...state, rateFrom: 1})
        })
    })
    describe("SET_RATE_TO", () => {
        it("should update the state with the new payload", () => {
            const result = exchangeReducer(state, {type: SET_RATE_TO, payload: 2});
            expect(result).toEqual({...state, rateTo: 2})
        })
    })
    describe("SET_IS_EXCEEDING", () => {
        it("should update the state with the new payload", () => {
            const result = exchangeReducer(state, {type: SET_IS_EXCEEDING, payload: true});
            expect(result).toEqual({...state, isExceeding : true})
        })
    })
    describe("Default", () => {
        it("should throw an error", () => {
            let result;

            try {
                exchangeReducer(state, {type: undefined, payload: {}});
            } catch (e) {
                result = e;
            }

            expect(result.message).toBe('no action registered with this name: undefined')

        })
    })
});
