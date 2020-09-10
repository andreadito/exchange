import React from "react";
import {Box, Select, Text, TextInput} from "grommet";

import {Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Control} from "react-hook-form/dist/types/form";
import {limitDecimal, MIN_ALLOWED, Wallet} from "../utils";

export interface ExchangeInputProps {
    name: string;
    label: string;
    isExceeding?: boolean;
    wallets: Wallet[];
    control: Control;
    errors: any;
    rate?: number;
    readonly?: boolean
}

export default function ExchangeInput({name, label, wallets, control, errors, isExceeding, rate = 1, readonly}: ExchangeInputProps) {
    const onInput = (e: { currentTarget: { value: any; }; }) => {
        const value = e.currentTarget.value;
        e.currentTarget.value = limitDecimal(value);
    };
    return (
        <Box>
            <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'}>
                <Controller control={control} render={({onChange, name, value}) => {
                    return (
                        <Box width={'small'}>
                            <Select
                                plain={readonly}
                                placeholder={label}
                                name={name}
                                options={wallets}
                                labelKey={(wallet: Wallet) => `${wallet.data.currency}`}
                                size={'medium'}
                                value={value}
                                onChange={({value}) => onChange(value)}
                            />
                            {value && value.data && (<Text
                                color={isExceeding ? 'status-critical' : 'status-ok'}
                                style={{marginTop: 10}} size={'xsmall'}>
                                {isExceeding ? 'Is exceeding your balance' : `Balance: ${value.data.balance.toFixed(2)}`}
                            </Text>)
                            }
                        </Box>
                    )
                }} name={`${name}_wallet`}/>
                <Controller rules={{
                    min: {
                        value: !readonly ? MIN_ALLOWED : 0,
                        message: `Should be greater that ${MIN_ALLOWED}`
                    },
                    required: !readonly,
                }} name={`${name}_value`} control={control} render={({onChange, name, value}) => {

                    const fixedValues = readonly ? value.toFixed(2) : value;

                    return (
                        <TextInput
                            plain={readonly}
                            name={name}
                            type={'number'}
                            inputMode={"decimal"}
                            step={0.01}
                            size={'medium'}
                            value={fixedValues}
                            onChange={onChange}
                            style={{textAlign: 'right'}}
                            placeholder={"0"}
                            readOnly={readonly}
                            onInput={onInput}
                        />
                    )
                }}/>
            </Box>
            {!readonly && (
                <ErrorMessage
                    errors={errors}
                    name={`${name}_value`}
                    render={({message}) => (
                        <Text color={'status-error'} alignSelf={'end'} size={'xsmall'}>{message}</Text>)}
                />
            )}
        </Box>
    )
}
