import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import NavBar from '../../components/NavBar';
import AppContent from '../../components/AppContent';

export default function DefaultLayout() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <AppContent />
      </div>
    </>
  );
}
