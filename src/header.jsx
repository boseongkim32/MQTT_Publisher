/*
 * Styles the header of the page and also provides disconnect functionality
 */

import React, { useContext } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MQTTContext } from './components/MQTT_context';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disconnect, isConnected } = useContext(MQTTContext);

  const handleDisconnect = () => {
    if (isConnected) {
      disconnect();
    }
    navigate('/');
  };

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      padding='1.5rem'
      bg='red'
      color='white'
    >
      <Box
        fontSize='4xl'
        fontWeight='bold'
        letterSpacing='wide'
        paddingLeft='2rem'
      >
        MQTT Dashboard
      </Box>
      {location.pathname !== '/' && (
        <Button
          onClick={handleDisconnect}
          backgroundColor='black'
          color='white'
          variant='solid'
          borderColor='black'
        >
          Disconnect
        </Button>
      )}
    </Flex>
  );
};

export default Header;
