/*
 * Responsible for rendering the dasbhard
 */

import React from 'react';
import { Box, Wrap, WrapItem, Text, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import config from './config.json';

const Dashboard = () => {
  return (
    <Wrap spacing='40px' justify='center' p={5}>
      {config.functions.map((data) => (
        <WrapItem key={data.id}>
          <Box
            as={NavLink}
            to={`/dashboard/${data.function}`}
            p={3}
            backgroundColor='red'
            borderWidth='2px'
            borderRadius='lg'
            borderColor='black'
            overflow='hidden'
            _hover={{
              boxShadow: 'lg',
              transform: 'scale(1.04)',
              transition: 'all 0.2s ease',
            }}
            maxW='300px'
            w='full'
          >
            <Heading as='h4' size='md' mb={2} color='white'>
              {data.function}
            </Heading>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Dashboard;
