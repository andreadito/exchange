import React from 'react';
import {Grommet, Main, Box, grommet, Text, Heading} from "grommet";
import {useQuery} from "react-query";
import Exchange from "./Exchange";

function App() {

    const { isLoading, error, data } = useQuery('wallets', () =>
        fetch('api/wallets/Dtn53Ebo2ULFpHWUsTAp/').then(res =>
            res.json()
        )
    )

    /*const { isLoading, error, data } = useQuery('rate', () => {
        fetch('api/rates?base=EUR&symbols=USD,GBP').then(res =>
            res.json()
        )
    })*/

    return (
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
                      <Heading>Loading your wallets...</Heading>
                  </Box>)
              }
              { error && (
                  <Box>
                      <Text>Ooops...GAME OVER!</Text>
                  </Box>
              )}
              { data && (
                  <Box>
                      <Exchange wallets={data}/>
                  </Box>

              )}
          </Main>
      </Grommet>
  );
}

export default App;
