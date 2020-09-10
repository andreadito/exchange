import React, {useState} from 'react';
import {Grommet, Main, Box, grommet, Text, Heading, Button} from "grommet";
import {Info} from "grommet-icons";
import Exchange from "./Exchange";
import { useWallets } from "../hooks/useWallets";

function App() {
    const {isLoading, error, data: wallets, isError} = useWallets();

    const [themeMode, setThemeMode] = useState('dark');

    return (<Grommet themeMode={themeMode as "dark" | "light"} theme={grommet} full={true}>
        <Main
            pad="large"
            fill={'vertical'}
            justify={'center'}
            align={'center'}
            overflow={'auto'}
            gap={'xlarge'}
        >

            {isLoading && (
                <Box animation={"pulse"} role={'loading_message'}>
                    <Heading>Loading...</Heading>
                </Box>)
            }
            {(error || isError) && (
                <Box role={'error_message'}>
                    <Text>Ooops...GAME OVER!</Text>
                </Box>
            )}
            {wallets && (
                <Box role={'main_content'} gap={'xlarge'}>
                    <Box width={'xxsmall'}>
                        <Button
                            icon={themeMode === 'dark' ? <Info color={'dark-1'}/> : <Info color={'accent-4'}/>}
                            size={'small'}
                            onClick={() => {
                                setThemeMode(themeMode === 'dark' ? 'ligth' : 'dark');
                            }}
                        />
                    </Box>
                    <Exchange wallets={wallets}/>
                </Box>
            )}
        </Main>
    </Grommet>);
}

export default App;
