import {Box, Button, Form, Text} from "grommet";
import {PowerCycle} from "grommet-icons";
import React, {Fragment, useEffect, useReducer} from "react";
import ExchangeInput from "./ExchangeInput";
import {useForm} from "react-hook-form";
import { useRate } from "../hooks/useRate";
import {
    exchangeReducer,
    SET_BASE, SET_EXCHANGE, SET_IS_EXCEEDING,
    SET_RATE_FROM,
    SET_RATE_TO,
    SET_SYMBOL
} from "../reducers/exchange";
import {convertValue, MIN_ALLOWED, Wallet} from "../utils";
import Rates from "./Rates";
import {useExchange} from "../hooks/useExchange";

export interface ExchangeProps {
    wallets: Wallet[];
}

type Inputs = {
    from_wallet: Wallet,
    from_value: number,
    to_wallet: Wallet,
    to_value: number
};

export default function Exchange({ wallets }: ExchangeProps) {

    const initialState = {
        base: wallets[0].data.currency,
        symbol: wallets[1].data.currency,
        rateFrom: 1,
        rateTo: 1,
        isExceeding: false,
        exchange: {}
    }

    const [state, dispatch] = useReducer(exchangeReducer, initialState);

    const initialFromWallet = wallets[0];
    const initialToWallet = wallets[1];

    const defaultValues = {
        from_value: 0,
        from_wallet: initialFromWallet,
        to_value: 0,
        to_wallet: initialToWallet,
    };

    const { handleSubmit, control, errors, setValue, getValues, watch } = useForm<Inputs>({
        defaultValues,
        mode: "all"
    });

    const { isLoading: rateInfoLoading, data: rateInfo } = useRate(state.base, state.symbol);

    const [mutate, {isLoading: isExchageIsLoading, isSuccess: exchangeSuccess}] = useExchange();

    const { from_wallet, from_value, to_wallet, to_value } = watch();

    const onSubmitForm = async (data: Inputs) => {
        try {
            await mutate({operation: 'sub', value: from_value, walletid: from_wallet.id});
            await mutate({operation: 'add', value: parseFloat(to_value.toFixed(2)), walletid: to_wallet.id});
            dispatch({type: SET_EXCHANGE, payload: {
                    from_value, from_currency:
                    from_wallet.data.currency,
                    to_value: parseFloat(to_value.toFixed(2)),
                    to_currency: to_wallet.data.currency
            }})
        } catch (error) {
            console.log(error);
        }
    }


    const onErrorForm = (errors: any) => console.log(errors);

    useEffect(() => {
        if(from_value > MIN_ALLOWED) {
            setValue('to_value', convertValue(from_value, state.rateTo))
        } else {
            setValue('to_value', 0)
        }

        dispatch({type: SET_BASE, payload: from_wallet.data.currency})
        dispatch({type: SET_SYMBOL, payload: to_wallet.data.currency})

        if (rateInfo && rateInfo.data.rates[to_wallet.data.currency]) {
            dispatch({type: SET_RATE_TO, payload: rateInfo.data.rates[to_wallet.data.currency]})
            dispatch({type: SET_RATE_FROM, payload: rateInfo.data.rates[from_wallet.data.currency] })
        }

        dispatch({type: SET_IS_EXCEEDING, payload: from_wallet.data.balance < from_value })

    }, [from_value, from_wallet.data.balance, from_wallet.data.currency, rateInfo, setValue, state.rateTo, to_value, to_wallet.data.currency])

    const swapFields = () => {
        const {from_wallet, to_wallet} = getValues();

        setValue('from_wallet', to_wallet);
        setValue('to_wallet', from_wallet)
    }

    const disableSubmit = Object.values(errors).length > 0
        || state.isExceeding
        || (from_value && from_value < MIN_ALLOWED)
        || state.base === state.symbol
        || isExchageIsLoading

    return (
        <Box animation={"fadeIn"}>
            {!exchangeSuccess ? <Form onSubmit={handleSubmit(onSubmitForm, onErrorForm)}>
                <Box gap={'large'}>
                    <ExchangeInput
                        name={'from'}
                        label={'From'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                        rate={state.rateFrom}
                        isExceeding={state.isExceeding}
                    />
                    <ExchangeInput
                        name={'to'}
                        label={'To'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                        rate={state.rateTo}
                        readonly={true}
                    />

                    <Rates symbol={state.symbol} base={state.base} rateTo={state.rateTo} isLoading={rateInfoLoading}/>

                    <Box direction={'row'} gap={'medium'} justify={"center"}>
                        <Button onClick={swapFields}>
                            <PowerCycle size={'medium'} />
                        </Button>
                        <Button disabled={disableSubmit} size={'large'} primary label="Exchange" type={'submit'} />
                    </Box>

                </Box>
            </Form> : <Fragment>
                <Text size={'large'}>You've exchanged: {state.exchange.from_value} {state.exchange.from_currency} in {state.exchange.to_value} {state.exchange.to_currency}</Text>
            </Fragment>}
        </Box>
    )
}
