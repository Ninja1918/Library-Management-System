import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// routes config
import { Box, Container, Spinner } from '@chakra-ui/react';
import routes from '../routes';

const AppContent = () => {
  return (
    <Box padding="1%">
      <Suspense fallback={<Spinner />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="home" replace />} />
        </Routes>
      </Suspense>
    </Box>
  );
};

export default React.memo(AppContent);
