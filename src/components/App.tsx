import React, {useState} from 'react';
import {Select, Grommet, Main, TextInput, Box, grommet, Text, Button, Heading} from "grommet";
import {PowerCycle} from "grommet-icons";
import {useQuery} from "react-query";

function App() {

    const [from, setFrom] = useState('0');
    const [to, setTo] = useState('0');

    const { isLoading, error, data } = useQuery('wallets', () =>
        fetch('api/wallets/Dtn53Ebo2ULFpHWUsTAp/').then(res =>
            res.json()
        )
    )

    if (isLoading) return (
        <Grommet themeMode={'dark'} theme={grommet} full={true}>
            <Main
                pad="large"
                fill={'vertical'}
                justify={'center'}
                align={'center'}
                overflow={'auto'}
                gap={'xlarge'}
            >
                <Box animation={"pulse"}>
                    <Heading>Loading your wallets...</Heading>
                </Box>
            </Main>
        </Grommet>
    )

    if (error) return (
        <Grommet themeMode={'dark'} theme={grommet} full={true}>
            <Main
                pad="large"
                fill={'vertical'}
                justify={'center'}
                align={'center'}
                overflow={'auto'}
                gap={'xlarge'}
            >
                <Box>
                    <Text>Ooops...</Text>
                </Box>
            </Main>
        </Grommet>
    )

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
              <Box><Text>{JSON.stringify(data)}</Text></Box>
              <Box animation={"fadeIn"}>
                  <Box gap={'large'}>
                      <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
                          <Box gap={'medium'}>
                              <Select
                                  options={['EUR', 'GBP', 'USD']}
                                  value={'EUR'}
                                  onChange={() => null }
                                  size={'large'}
                              />
                              <Box>
                                  <Text size={'small'}>Your Balance: 0 €</Text>
                              </Box>
                          </Box>

                          <TextInput
                              inputMode={"numeric"}
                              style={{textAlign: 'right'}}
                              value={from}
                              onChange={(event) => setFrom(event.target.value)}
                              size={'large'}
                          />

                      </Box>
                      <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
                          <Box gap={'medium'}>
                              <Select
                                  options={['EUR', 'GBP', 'USD']}
                                  value={'GBP'}
                                  onChange={() => null }
                                  size={'large'}
                              />
                              <Box>
                                  <Text size={'small'}>Your Balance: 10 £</Text>
                              </Box>
                          </Box>

                          <TextInput
                              inputMode={"numeric"}
                              style={{textAlign: 'right'}}
                              value={to}
                              onChange={(event) => setTo(event.target.value)}
                              size={'large'}
                          />

                      </Box>
                  </Box>
                  <Box direction={'row'} gap={'medium'} justify={"center"}>
                      <Button>
                          <PowerCycle size={'medium'} />
                      </Button>
                      <Button size={'large'} primary label="Exchange" />
                  </Box>
              </Box>
          </Main>
      </Grommet>
  );
}

export default App;
