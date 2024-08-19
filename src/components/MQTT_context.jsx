/*
 * useContext hook to share data across the web application
 */

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { Client, Message } from 'paho-mqtt';

export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState({
    host: '',
    port: '',
    clientId: '',
  });
  const toast = useToast();

  // Memoize the connect function
  const connect = useCallback(
    (host, port, clientId, usrname, psswd) => {
      const mqttClient = new Client(host, Number(port), clientId);

      mqttClient.onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
          toast({
            title: 'Connection Lost',
            description: responseObject.errorMessage,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          setIsConnected(false);
        }
      };

      mqttClient.onMessageArrived = (message) => {
        toast({
          title: 'New Message',
          description: message.payloadString,
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      };

      const options = {
        /* useSSL: false, 
        userName: usrname,
        password: psswd,
        */
        keepAliveInterval: 30,
        reconnect: true,
        onSuccess: () => {
          toast({
            title: 'Connected',
            description: 'You are now connected to the broker',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setIsConnected(true);
          setClient(mqttClient);
        },
        onFailure: (responseObject) => {
          toast({
            title: 'Connection Failed',
            description: responseObject.errorMessage,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          setIsConnected(false);
        },
      };

      try {
        mqttClient.connect(options);
      } catch (error) {
        toast({
          title: 'Connection Failed',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  // Memoize the disconnect function
  const disconnect = useCallback(() => {
    if (client && client.isConnected()) {
      client.disconnect();
      setIsConnected(false);
      setClient(null);
      toast({
        title: 'Disconnected',
        description: 'You are now disconnected from the broker',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [client]);

  // Memoize the publish function
  const publish = useCallback(
    (topic, message) => {
      if (client && client.isConnected()) {
        const mqttMessage = new Message(message);
        mqttMessage.destinationName = topic;
        mqttMessage.qos = 1;
        client.send(mqttMessage);
      }
    },
    [client],
  );

  // Cleanup effect to disconnect the client when the component unmounts
  useEffect(() => {
    return () => {
      if (client && client.isConnected()) client.disconnect();
    };
  }, [client]);

  // Memoize the context value to avoid unnecessary re-renders of consumers
  const contextValue = useMemo(
    () => ({
      client,
      isConnected,
      connectionDetails,
      setConnectionDetails,
      connect,
      disconnect,
      publish,
    }),
    [client, isConnected, connectionDetails, connect, disconnect, publish],
  );

  return (
    <MQTTContext.Provider value={contextValue}>{children}</MQTTContext.Provider>
  );
};
