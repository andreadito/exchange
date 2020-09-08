import {Box, Button, Form, Heading} from "grommet";
import {PowerCycle} from "grommet-icons";
import React, {useEffect, useState} from "react";
import ExchangeInput from "./ExchangeInput";
import {Rate, Wallet} from "../util/util";
import {useForm} from "react-hook-form";
import useRate from "../hooks/useRate";

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

    const { handleSubmit, control, errors, formState, setValue, getValues, watch} = useForm<Inputs>({
        defaultValues:{
            from_value: 0,
            from_wallet: wallets[0],
            to_value: 0,
            to_wallet: wallets[1],
        },
        mode: "onChange"
    });

    const [base, setBase] = useState(wallets[0].data.currency);
    const [symbol, setSymbol] = useState(wallets[1].data.currency);
    const [rate, setRate] = useState(1);

    const { data: rateInfo } = useRate(base, symbol);

    const { from_wallet, from_value, to_wallet } = watch();

    const onSubmitForm = (data: Inputs) => console.log(data);
    const onErrorForm = (errors: any) => console.log(errors);

    useEffect(()=> {
        if(from_value > 0.5) {
            setValue('to_value', from_value)
        } else {
            setValue('to_value', 0)
        }

        setBase(from_wallet.data.currency);
        setSymbol(to_wallet.data.currency);

        if (rateInfo && rateInfo.data.rates[to_wallet.data.currency]) {
            setRate(rateInfo.data.rates[to_wallet.data.currency]);
        }
    }, [from_value, from_wallet.data.currency, rateInfo, setValue, to_wallet.data.currency])

    const swapFields = () => {
        const {from_value, from_wallet, to_value, to_wallet} = getValues();

        setValue('from_wallet', to_wallet);
        setValue('from_value', to_value);
        setValue('to_wallet', from_wallet)
        setValue('to_value', from_value);
    }

    const isExceeding = from_wallet.data.balance < from_value;

    return (
        <Box animation={"fadeIn"}>
            <Heading>Rate: {rate}</Heading>
            <Form onSubmit={handleSubmit(onSubmitForm, onErrorForm)}>
                <Box gap={'large'}>
                    <ExchangeInput
                        name={'from'}
                        label={'From'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                        isExceeding={isExceeding}
                    />
                    <ExchangeInput
                        name={'to'}
                        label={'To'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                        rate={rate}
                    />
                    <Box direction={'row'} gap={'medium'} justify={"center"}>
                        <Button onClick={swapFields}>
                            <PowerCycle size={'medium'} />
                        </Button>
                        <Button disabled={!formState.isValid || isExceeding} size={'large'} primary label="Exchange" type={'submit'} />
                    </Box>
                </Box>
            </Form>
        </Box>
    )
}
