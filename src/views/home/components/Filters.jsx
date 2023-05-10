import { Box, Input, Text } from '@chakra-ui/react';
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
    </>
  );
}
