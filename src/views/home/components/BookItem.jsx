import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { BOOK_ITEM_DIMENTIONS } from '../utils';

export default function BookItem({ title, publisher, authors }) {
  return (
    <Card {...BOOK_ITEM_DIMENTIONS} overflow="hidden" textAlign="center">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Tooltip label={title}>
            <Heading textAlign="start" noOfLines={1} size="md">
              {title}
            </Heading>
          </Tooltip>
          <Tooltip label={authors?.join(',')}>
            <Text textAlign="start" noOfLines={1}>
              {authors?.join(',')}
            </Text>
          </Tooltip>
        </Stack>
      </CardBody>
    </Card>
  );
}
