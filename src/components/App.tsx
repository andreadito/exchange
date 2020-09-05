import React, {useState} from 'react';
import {Select, Grommet, Main, TextInput, Box, grommet, Text, Button} from "grommet";
import {PowerCycle, Transaction} from "grommet-icons";

function App() {
    const [value, setValue] = React.useState('medium');

    return (
      <Grommet themeMode={'light'} theme={grommet} full={true}>
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
                              options={['small', 'medium', 'large']}
                              value={value}
                              onChange={({ option }: {option: string}) => null}
                              size={'large'}
                          />
                          <Box>
                              <Text size={'small'}>Your Balance</Text>
                          </Box>
                      </Box>

                      <TextInput
                          placeholder="type here"
                          value={value}
                          onChange={event => null}
                          size={'large'}
                      />

                  </Box>
                  <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
                      <Box gap={'medium'}>
                          <Select
                              options={['small', 'medium', 'large']}
                              value={value}
                              onChange={({ option }: {option: string}) => null}
                              size={'large'}
                          />
                          <Box>
                              <Text size={'small'}>Your Balance</Text>
                          </Box>
                      </Box>
                      <TextInput
                          placeholder="type here"
                          value={value}
                          onChange={event => null}
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
