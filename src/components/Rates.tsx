import React from "react";
import {Box, Text} from "grommet";
import {Currency} from "../utils";

export interface RatesProps {
    isLoading: boolean;
    base: string;
    symbol: Currency;
    rateTo: number;
}

export default function Rates({isLoading, base, symbol, rateTo}: RatesProps) {
    return (
        <Box
            pad={'small'}
            style={{
                borderColor: "#6FFFB0",
                borderStyle: 'solid',
                borderRadius: '10px',
                borderWidth: 'small',
            }}
        >
            <Text
                alignSelf={'center'}
                size={'small'}
                role={'rate_value'}
                weight={"bold"}
            >
                {`${isLoading ? 'Loading Rates...' : `${base} - ${symbol}: ${rateTo}`}`}
            </Text>
        </Box>)
}
