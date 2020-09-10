import React from "react";
import {Currency, Wallet} from "../utils";
import Exchange from "./Exchange";
import renderer from 'react-test-renderer';
import 'mutationobserver-shim';

describe("Exchange", () => {
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

    it("true", () => {
        const tree = renderer.create(<Exchange wallets={wallets}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
