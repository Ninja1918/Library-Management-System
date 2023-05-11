import React from 'react';
import { SkeletonContainer } from './styledComponents';
import { GridItem, Skeleton } from '@chakra-ui/react';
import { BOOK_GRID_OPTIONS, BOOK_ITEM_DIMENTIONS } from '../utils';

function MimicBook() {
  return (
    <GridItem>
      <Skeleton {...BOOK_ITEM_DIMENTIONS} borderRadius="5px" />
    </GridItem>
  );
}

export default function BookSkeleton() {
  return (
    <SkeletonContainer {...BOOK_GRID_OPTIONS} paddingY={'30px'}>
      {Array.from({ length: 5 }, () => (
        <MimicBook />
      ))}
    </SkeletonContainer>
  );
}
