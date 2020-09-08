import React, { Fragment } from 'react';
import {Grommet, Main, Box, grommet, Text, Heading} from "grommet";
import Exchange from "./Exchange";
import {ReactQueryDevtools} from "react-query-devtools";
import useWallets from "../hooks/useWallets";

function App() {
    const { isLoading, error, data: wallets, isError } = useWallets();

    return (
        <Fragment>
            <Grommet themeMode={'dark'} theme={grommet} full={true}>
                <Main
                    pad="large"
                    fill={'vertical'}
                    justify={'center'}
                    align={'center'}
                    overflow={'auto'}
                    gap={'xlarge'}
                >
                    {isLoading && (
                        <Box animation={"pulse"}>
                            <Heading>Loading...</Heading>
                        </Box>)
                    }
                    { (error || isError) && (
                        <Box>
                            <Text>Ooops...GAME OVER!</Text>
                        </Box>
                    )}
                    { wallets && (
                        <Box>
                            <Exchange wallets={wallets}/>
                        </Box>
                    )}
                </Main>
            </Grommet>
            <ReactQueryDevtools initialIsOpen />
        </Fragment>
  );
}

export default App;
