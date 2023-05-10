import React, { Suspense } from 'react';
import { ChakraProvider, theme, Spinner } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const DefaultLayout = React.lazy(() => import('./views/layout/DefaultLayout'));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="*" name="home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
