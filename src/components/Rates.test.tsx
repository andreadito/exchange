import '../setupTests';
import {render, screen} from "@testing-library/react";
import Rates from "./Rates";
import React from "react";
import {Currency} from "../utils";

test('should render a loading message if isLoading', async () => {
    render(<Rates isLoading={true} base={'EUR'} symbol={'USD' as Currency} rateTo={1.3}/>);
    expect(await screen.getByRole('rate_value')).toHaveTextContent('Loading Rates...')
})

test('should render a button with the current rates', async () => {
    const props = {
        base: 'EUR',
        symbol: 'USD',
        rateTo: 1.3
    }
    render(<Rates isLoading={false} base={props.base} symbol={props.symbol as Currency} rateTo={props.rateTo}/>);
    const expected = `${props.base} - ${props.symbol}: ${props.rateTo}`;
    expect(await screen.getByRole('rate_value')).toHaveTextContent(expected)
})
