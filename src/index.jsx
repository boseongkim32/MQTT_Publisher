/*
 * The entry point of the web application.
 * Defines the Chakra UI themee and the routes of the application
 */

import React, { useContext, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  extendTheme,
  CSSReset,
} from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './header';
import MqttConnect from './components/MQTT_connect';
import Dashboard from './components/dashboard';
import SubmitMQTT from './components/submitMQTT';
import { MQTTContext, MQTTProvider } from './components/MQTT_context';
import './style.scss';

// Extending the theme of ChakraUI
const myTheme = extendTheme({
  colors: {
    darkGreen: '#0A6847',
    lightGreen: '#7ABA78',
    peach: '#F6E9B2',
    yellow: '#F3CA52',
    red: '#d6272e',
    white: '#fff',
    darkBlue: '#08173d',
    black: '#000',
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'peach',
        lineHeight: 'tall,',
        fontFamily: 'Poetsen One, Roboto, sans-serif',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={myTheme}>
      <CSSReset />
      <BrowserRouter>
        <MQTTProvider>
          <Box minH='100vh'>
            <Header />
            <Routes>
              <Route path='/' element={<MqttConnect />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/dashboard/:functionId' element={<SubmitMQTT />} />
              <Route
                path='*'
                element={
                  <Center height='30vh'>
                    <Box color='myPeach'>Page not found</Box>
                  </Center>
                }
              />
            </Routes>
          </Box>
        </MQTTProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

const root = createRoot(document.getElementById('main'));
root.render(<App />);
