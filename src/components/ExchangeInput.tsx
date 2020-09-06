import {Box, FormField, Select, Text, TextInput} from "grommet";
import React, { Fragment } from "react";
import {Wallet} from "../util/util";
import {Controller} from "react-hook-form";

export interface ExchangeInputProps {
    name: string;
    label: string;
    wallets: Wallet[];
    control: any;
}

export default function ExchangeInput ({name, label, wallets, control}: ExchangeInputProps) {
    return(
        <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
            <Box width={'small'}>
                <Controller control={control} render={({onChange, name, value}) => {
                    return (
                        <Fragment>
                            <Select
                                placeholder={label}
                                name={name}
                                options={wallets}
                                labelKey={(wallet: Wallet) => `${wallet.data.currency}` }
                                size={'large'}
                                value={value}
                                onChange={({ value }) => {onChange(value)}}
                            />
                            { value && value.data && (<Text size={'small'}>Balance: {value.data.balance}</Text>) }
                        </Fragment>
                )}} name={`${name}_wallet`}/>
            </Box>
            <FormField name={`${name}_value`}>
                <Controller name={`${name}_value`} control={control} render={({onChange, name}) => {
                    return(
                        <TextInput
                            name={name}
                            inputMode={"numeric"}
                            style={{textAlign: 'right'}}
                            size={'large'}
                            onChange={onChange}
                            placeholder={"0"}
                        />
                    )
                }}/>

            </FormField>
        </Box>
    )
}
