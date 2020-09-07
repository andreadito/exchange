import {Box, Button, Form} from "grommet";
import {PowerCycle} from "grommet-icons";
import React from "react";
import ExchangeInput from "./ExchangeInput";
import {Wallet} from "../util/util";
import {useForm} from "react-hook-form";
import Rates from "./Rates";

export interface ExchangeProps {
    wallets: Wallet[];
}

type Inputs = {
    from_wallet: object,
    from_value: string,
    to_wallet: object,
    to_value: string
};

export default function Exchange({ wallets }: ExchangeProps) {
    const { handleSubmit, control, errors, formState, setValue, getValues} = useForm<Inputs>({
        defaultValues:{
            from_value: '',
            from_wallet: wallets[0],
            to_value: '',
            to_wallet: wallets[1],
        },
        mode: "onChange"
    });


    const onSubmit = (data: any) => console.log(data);
    const onError = (errors: any) => console.log(errors);

    const swapFields = () => {
        const {from_value, from_wallet, to_value, to_wallet} = getValues();

        setValue('from_wallet', to_wallet);
        setValue('from_value', to_value);
        setValue('to_wallet', from_wallet)
        setValue('to_value', from_value);
    }

    return (
        <Box animation={"fadeIn"}>
            <Rates />
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Box gap={'large'}>
                    <ExchangeInput
                        name={'from'}
                        label={'From'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                    />
                    <ExchangeInput
                        name={'to'}
                        label={'To'}
                        wallets={wallets}
                        control={control}
                        errors={errors}
                    />
                    <Box direction={'row'} gap={'medium'} justify={"center"}>
                        <Button onClick={swapFields}>
                            <PowerCycle size={'medium'} />
                        </Button>
                        <Button disabled={!formState.isValid} size={'large'} primary label="Exchange" type={'submit'} />
                    </Box>
                </Box>
            </Form>
        </Box>
    )
}
