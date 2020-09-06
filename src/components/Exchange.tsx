import {Box, Button, Form} from "grommet";
import {PowerCycle} from "grommet-icons";
import React from "react";
import ExchangeInput from "./ExchangeInput";
import {Wallet} from "../util/util";
import {useForm} from "react-hook-form";

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
    const { handleSubmit,control  } = useForm<Inputs>({
        defaultValues:{
            from_value: '',
            from_wallet: wallets[0],
            to_value: '',
            to_wallet: wallets[1],
        }
    });
    const onSubmit = (data: any) => console.log(data);

    return (
        <Box animation={"fadeIn"} gap={'large'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Box gap={'xlarge'} margin={'large'}>
                    <ExchangeInput
                        name={'from'}
                        label={'From'}
                        wallets={wallets}
                        control={control}
                    />
                    <ExchangeInput
                        name={'to'}
                        label={'To'}
                        wallets={wallets}
                        control={control}
                    />
                </Box>
                <Box direction={'row'} gap={'medium'} justify={"center"}>
                    <Button>
                        <PowerCycle size={'medium'} />
                    </Button>
                    <Button size={'large'} primary label="Exchange" type={'submit'} />
                </Box>
            </Form>
        </Box>
    )
}
