import React from 'react';
import {Select, Grommet, Main, TextInput, Box, grommet, Text, Button} from "grommet";
import {PowerCycle} from "grommet-icons";

function App() {
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
                          style={{textAlign: 'right'}}
                          value={''}
                          onChange={() => null}
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
                          style={{textAlign: 'right'}}
                          value={''}
                          onChange={() => null}
                          size={'large'}
                      />

                  </Box>
              </Box>
              <Box direction={'row'} gap={'medium'} >
                  <Button>
                      <PowerCycle size={'medium'} />
                  </Button>
                  <Button size={'large'} primary label="Exchange" />
              </Box>
          </Main>
      </Grommet>
  );
}

export default App;
