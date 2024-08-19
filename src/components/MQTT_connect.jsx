/*
 * This component is responsible for rendering the form that allows the user to connect to the MQTT broker
 */

import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MQTTContext } from './MQTT_context';
import config from './config.json';

const MqttConnect = () => {
  const [formData, setFormData] = useState({
    hostname: config.hostname,
    port: config.port,
    clientId: config.clientId,
    username: config.username,
    password: config.password,
  });
  const navigate = useNavigate();
  const { connect, isConnected } = useContext(MQTTContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting to connect to MQTT...');
    connect(
      formData.hostname,
      formData.port,
      formData.clientId,
      formData.username,
      formData.password,
    );
  };

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh'
    >
      <VStack
        as='form'
        onSubmit={handleSubmit}
        spacing={4}
        width='full'
        maxW='md'
        p={5}
        backgroundColor='red'
        color='white'
        borderColor='black'
        borderWidth='2px'
        boxShadow='lg'
        borderRadius='lg'
      >
        <Heading size='lg'>MQTT Connect</Heading>
        {Object.keys(formData).map((key) => (
          <FormControl key={key}>
            <FormLabel htmlFor={key}>
              {key[0].toUpperCase() + key.slice(1)}
            </FormLabel>
            <Input id={key} value={formData[key]} onChange={handleChange} />
          </FormControl>
        ))}
        <Button
          type='submit'
          backgroundColor='black'
          color='white'
          width='full'
        >
          Connect
        </Button>
      </VStack>
    </Box>
  );
};

export default MqttConnect;
