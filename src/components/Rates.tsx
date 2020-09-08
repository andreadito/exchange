import React from "react";
import {Heading} from "grommet";

export interface RatesProps {
    rates: object;
}
export default function Rates({rates}: RatesProps) {
    console.log('RATES', rates);
    return (
        <Heading>Rates</Heading>
    )
}
