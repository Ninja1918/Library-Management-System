import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
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
      <CardBody height="100%">
        <Stack mt="6" spacing="3">
          <Flex direction="row" justifyContent="start">
            <Badge>Readers: {readers ? readers : 'NA'}</Badge>
          </Flex>
          <Center>
            {coverId ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
                alt={title}
                borderRadius="lg"
                width="90%"
                objectFit="cover"
                height="170px"
              />
            ) : (
              <Box
                border="1px solid rgb(0,0,0, 0.2)"
                padding="30px"
                borderRadius="lg"
                width="90%"
                height="170px"
              >
                <Heading size="md">Cover Unavailable</Heading>
              </Box>
            )}
          </Center>
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
