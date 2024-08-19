/*
 * The submit form data page
 */

import React, { useState, useContext } from 'react';
import {
  Box,
  Heading,
  FormControl,
  Container,
  FormLabel,
  Input,
  VStack,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { MQTTContext } from './MQTT_context';
import config from './config.json';

const SubmitMQTT = () => {
  const { functionId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { publish } = useContext(MQTTContext);

  const functionData = config.functions.find(
    (item) => item.function === functionId,
  );

  // Find the default topic for the entire power supply json
  const defaultTopic = config.topic;

  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState(defaultTopic);

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handlePublish = async () => {
    console.log('Attempting to publish message...');
    const formattedMessage = `${functionData.function}=${message}`;

    try {
      publish(topic, formattedMessage);
      console.log('Published');
      toast({
        title: 'Message published',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error publishing message', error);
      toast({
        title: 'Error publishing message',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxW='container.md' centerContent>
      <Box
        padding={6}
        backgroundColor='red'
        borderWidth='2px'
        borderColor='black'
        borderRadius='lg'
        boxShadow='lg'
        width='100%'
        maxWidth='700px'
        mt={8}
      >
        {functionData && (
          <>
            <Heading size='lg' color='white'>
              {functionData.function}
            </Heading>
            <Text mt={2} mb={4} color='white'>
              {functionData.description}
            </Text>
          </>
        )}
        <VStack spacing={4} mt={4}>
          <FormControl id='message'>
            <FormLabel color='white' padding={1}>
              Data
            </FormLabel>
            <Input
              type='text'
              value={message}
              color='black'
              onChange={(e) => setMessage(e.target.value)}
            />
            <FormLabel color='white' padding={2}>
              Topic
            </FormLabel>
            <Input
              type='text'
              value={topic}
              color='black'
              onChange={(e) => setTopic(e.target.value)}
              placeholder={defaultTopic}
            />
          </FormControl>
          <Button
            backgroundColor='white'
            color='black'
            onClick={handlePublish}
            width='100%'
          >
            Publish
          </Button>
          <Button
            backgroundColor='black'
            color='white'
            onClick={handleCancel}
            width='100%'
          >
            Cancel
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default SubmitMQTT;
