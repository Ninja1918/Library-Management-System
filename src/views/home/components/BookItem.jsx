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

export default function BookItem({
  title,
  publisher,
  authors,
  coverId,
  readers,
}) {
  return (
    <Card {...BOOK_ITEM_DIMENTIONS} overflow="hidden" textAlign="center">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Text>Readers: {readers}</Text>
          <Image
            src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
            alt={title}
            borderRadius="lg"
            width="50%"
          ></Image>
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
