import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { SearchContainer } from './styledComponents';
import PropTypes from 'prop-types';

Filters.propTypes = {
  search: PropTypes.string,
  setFilters: PropTypes.func,
  getBooks: PropTypes.func,
};

export default function Filters({ search, filters, setFilters, getBooks }) {
  return (
    <>
      <Flex
        direction="column"
        background={'green.500'}
        borderRadius="5px"
        padding="1"
        paddingX="8"
        minH="300px"
        h="100%"
        w="100%"
      >
        <Heading textAlign="start">Filters</Heading>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text>Search</Text>
          <Input
            variant="filled"
            defaultValue={filters.search}
            onChange={event => {
              getBooks('search', event.target.value);
            }}
          />
        </SearchContainer>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text>author</Text>
          <Input
            variant="filled"
            defaultValue={filters.author}
            onChange={event => {
              getBooks('author', event.target.value);
            }}
          />
        </SearchContainer>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text>Subject</Text>
          <Input
            variant="filled"
            defaultValue={filters.subject}
            onChange={event => {
              getBooks('subject', event.target.value);
            }}
          />
        </SearchContainer>
      </Flex>
    </>
  );
}
