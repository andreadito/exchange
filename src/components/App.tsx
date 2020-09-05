import React, {useState} from 'react';
import {Select, Grommet, Main, TextInput, Box, grommet, Text, Button} from "grommet";

function App() {
    const [value, setValue] = React.useState('medium');

    return (
      <Grommet themeMode={'dark'} theme={grommet} full={true}>
          <Main
              pad="large"
              fill={'vertical'}
              justify={'center'}
              align={'center'}
              flex={'grow'}
              overflow={'auto'}
              gap={'large'}
          >
              <Box gap={'small'} fill={'horizontal'} direction={'row'} alignContent={'between'} >
                  <Box gap={'medium'}>
                      <Select
                          options={['small', 'medium', 'large']}
                          value={value}
                          onChange={({ option }: {option: string}) => null}
                          size={'large'}
                      />
                      <Text>Your Balance</Text>
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
                      <Text>Your Balance</Text>
                  </Box>
                  <TextInput
                      placeholder="type here"
                      value={value}
                      onChange={event => null}
                      size={'large'}
                  />

              </Box>

              <Button size={'large'} primary label="Exchange" />
          </Main>
      </Grommet>
  );
}

export default App;
