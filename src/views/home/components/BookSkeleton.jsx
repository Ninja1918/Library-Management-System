import React from 'react';
import { SkeletonContainer } from './styledComponents';
import { GridItem, Skeleton } from '@chakra-ui/react';

function MimicBook() {
  return (
    <GridItem>
      <Skeleton w="250px" h="350px" borderRadius="5px" />
    </GridItem>
  );
}

export default function BookSkeleton() {
  return (
    <SkeletonContainer
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)',
        'repeat(5, 1fr)',
      ]}
      h="350px"
      padding="30px"
      gap={6}
    >
      {Array.from({ length: 5 }, () => (
        <MimicBook />
      ))}
    </SkeletonContainer>
  );
}
