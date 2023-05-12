import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { SearchContainer } from './styledComponents';
import PropTypes from 'prop-types';

Filters.propTypes = {
  search: PropTypes.string,
  setFilters: PropTypes.func,
  getBooks: PropTypes.func,
};

const LABEL_PROPS = {
  textAlign: 'initial',
};

export default function Filters({ search, filters, setFilters, getBooks }) {
  return (
    <>
      <Flex
        direction="column"
        background={'green.500'}
        borderRadius="5px"
        paddingY="20px"
        paddingX="8"
        minH="300px"
        h="100%"
        w="100%"
        gap="15px"
      >
        <Heading textAlign="start">Filters</Heading>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text {...LABEL_PROPS}>Search</Text>
          <Input
            variant="filled"
            defaultValue={filters.search}
            onChange={event => {
              getBooks('search', event.target.value);
            }}
          />
        </SearchContainer>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text {...LABEL_PROPS}>author</Text>
          <Input
            variant="filled"
            defaultValue={filters.author}
            onChange={event => {
              getBooks('author', event.target.value);
            }}
          />
        </SearchContainer>
        <SearchContainer flexDirection="row" justifyContent="flex-start">
          <Text {...LABEL_PROPS}>Subject</Text>
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
