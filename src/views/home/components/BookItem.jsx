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

export default function BookItem({ title, publisher, authors }) {
  return (
    <Card w="250px" h="350px" overflow="hidden" textAlign="center">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Tooltip label={title}>
            <Heading overflow="hidden" whiteSpace="nowrap" size="md">
              {title}
            </Heading>
          </Tooltip>
          <Tooltip label={authors?.join(',')}>
            <Text textAlign="start" overflow="hidden" whiteSpace="nowrap">
              {authors?.join(',')}
            </Text>
          </Tooltip>
        </Stack>
      </CardBody>
    </Card>
  );
}
