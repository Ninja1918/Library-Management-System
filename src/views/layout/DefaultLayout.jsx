import { Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import NavBar from '../../components/NavBar';
import AppContent from '../../components/AppContent';

export default function DefaultLayout() {
  return (
    <Box h="100vh">
      <Flex as="header" w="100%" position="sticky" top="0" zIndex="999">
        <NavBar />
      </Flex>
      <Box h="inherit">
        <AppContent />
      </Box>
    </Box>
  );
}
