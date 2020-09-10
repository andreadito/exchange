import ExchangeInput from "./ExchangeInput";
import React from "react";
import {Currency, Wallet} from "../utils";
import {useForm} from "react-hook-form";
import renderer from 'react-test-renderer';
import { renderHook } from "@testing-library/react-hooks";
import 'mutationobserver-shim';

describe("Exchange Input", () => {
    const wallets: Wallet[] = [
        {
            "id": "AyMzv3EkKFzFG4H8HfEz",
            "data": {
                "currency": Currency.GBP,
                "balance": 1090
            }
        },
        {
            "id": "SPNFH5Q5pDLBbYOPrOd6",
            "data": {
                "currency": Currency.EUR,
                "balance": 0
            }
        },
        {
            "id": "amAienpx5MVa5EJkyJEc",
            "data": {
                "balance": 10,
                "currency": Currency.USD
            }
        }
    ];

    it("should render correctly", () => {
        const { result } = renderHook(() => useForm({
            defaultValues:{
                from_value: 0,
                from_wallet: wallets[0],
                to_value: 0,
                to_wallet: wallets[1],
            },
            mode: "onChange"
        }))
        const tree = renderer.create(<ExchangeInput
            name={'from'}
            label={'From'}
            wallets={wallets}
            control={result.current.control}
            errors={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("should render correctly if exceeding", () => {
        const { result } = renderHook(() => useForm({
            defaultValues:{
                from_value: 0,
                from_wallet: wallets[0],
                to_value: 0,
                to_wallet: wallets[1],
            },
            mode: "onChange"
        }))
        const tree = renderer.create(<ExchangeInput
            name={'from'}
            label={'From'}
            wallets={wallets}
            control={result.current.control}
            errors={[]}
            isExceeding={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("should render correctly if a validation error occour", () => {
        const { result } = renderHook(() => useForm({
            defaultValues:{
                from_value: 0,
                from_wallet: wallets[0],
                to_value: 0,
                to_wallet: wallets[1],
            },
            mode: "onChange"
        }))
        const tree = renderer.create(<ExchangeInput
            name={'from'}
            label={'From'}
            wallets={wallets}
            control={result.current.control}
            errors={{
                "from_value": {
                    "type": "min",
                    "message": "Should be greater that 0.5",
                    "ref": {
                        "name": "from_value"
                    }
                },
                "to_value": {
                    "type": "min",
                    "message": "Should be greater that 0.5",
                    "ref": {
                        "name": "to_value"
                    }
                }
            }}
            isExceeding={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
