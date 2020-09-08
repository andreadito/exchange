import React from "react";
import {Box, Select, Text, TextInput} from "grommet";
import {Wallet} from "../util/util";
import {Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Control, FieldErrors} from "react-hook-form/dist/types/form";

export interface ExchangeInputProps {
    name: string;
    label: string;
    isExceeding?: boolean;
    wallets: Wallet[];
    control: Control;
    errors: FieldErrors;
    rate?: number;
}

export default function ExchangeInput ({name, label, wallets, control, errors, isExceeding}: ExchangeInputProps) {
    return(
        <Box>
            <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
                <Controller control={control} render={({onChange, name, value}) => {
                    return (
                        <Box width={'small'}>
                            <Select
                                placeholder={label}
                                name={name}
                                options={wallets}
                                labelKey={(wallet: Wallet) => `${wallet.data.currency}` }
                                size={'medium'}
                                value={value}
                                onChange={onChange}
                            />
                            { value && value.data && (<Text
                                color={isExceeding ? 'status-critical' :'status-ok'}
                                style={{marginTop: 10}} size={'xsmall'}>
                                { isExceeding ? 'Is exceeding your balance' : `Balance: ${value.data.balance}` }
                            </Text>)
                            }
                        </Box>
                )}} name={`${name}_wallet`}/>
                <Controller rules={{
                        min: {
                            value: 0.5,
                            message: 'Should be greater that 0.5'
                        },
                        required: true,
                    }} name={`${name}_value`} control={control} render={({onChange, name, value}) => {
                    return(
                        <TextInput
                            name={name}
                            type={'number'}
                            step={0.10}
                            inputMode={"numeric"}
                            size={'medium'}
                            value={value}
                            onChange={onChange}
                            style={{textAlign: 'right'}}
                            placeholder={"0"}
                        />
                    )
                }}/>
            </Box>
            <ErrorMessage
                errors={errors}
                name={`${name}_value`}
                render={({ message }) => (<Text color={'status-error'} alignSelf={'end'} size={'xsmall'}>{message}</Text>)}
            />
        </Box>
    )
}
