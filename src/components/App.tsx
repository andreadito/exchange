import React from 'react';
import {Grommet, Main, Box, grommet, Text, Heading} from "grommet";
import {useQuery} from "react-query";
import Exchange from "./Exchange";
import {queryWallets} from "../services/queries";


function App() {
    const { isLoading, error, data } = useQuery('wallets', queryWallets)
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
