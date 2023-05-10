import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getVolume } from '../../services/volumes/getVolumes';
import { BOOKS_API } from './api-utils';
import {
  BooksContainer,
  FilterContainer,
  LibraryContainer,
  SkeletonContainer,
} from './components/styledComponents';
import BookItem from './components/BookItem';
import Filters from './components/Filters';
import { debounce, filter } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBooksParams } from './utils';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(-1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState({
    search: 'harry potter',
    page: 1,
    author: '',
  });
  const toast = useToast();

  async function getBooks(
    search = filters.search,
    page = filters.page,
    author = filters.author
  ) {
    if (!toast.isActive('fetching-books')) {
      toast({
        id: 'fetching-books',
        title: 'Fetching Books',
        status: 'info',
        duration: 999999,
      });
    }
    const response = await getVolume(
      BOOKS_API.volume.get,
      getBooksParams({
        q: search,
        page: page,
        author: author,
      })
    );
    if (response?.status === 200) {
      page !== 1
        ? setBooks(prev => [...prev, ...response.data.docs])
        : setBooks(response.data.docs);
      setTotalBooks(response.data.numFound || -1);
    } else {
      toast({
        title: 'Something went wrong',
        description: 'Could not fetch books',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    toast.closeAll();
  }

  const _getBooks = debounce((id, value) => {
    setFilters(prev => {
      return {
        ...prev,
        [id]: value,
      };
    });
  }, 1000);

  const handleOnRowsScrollEnd = async () => {
    if (books.length < totalBooks) {
      setHasMoreData(true);
      await getBooks(filters.page, filters.page + 1);
      setFilters(prev => {
        return {
          ...prev,
          page: prev.page + 1,
        };
      });
    } else {
      setHasMoreData(false);
    }
  };

  async function Setup() {
    setLoading(true);
    await getBooks();
    setLoading(false);
  }

  useEffect(() => {
    getBooks();
  }, [filters]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  useEffect(() => {
    Setup();
  }, []);

  return (
    <>
      <LibraryContainer
        templateColumns="20% 80%"
        textAlign="center"
        padding="30px"
        h="100%"
      >
        <FilterContainer padding={['', '30px']} minH="100%">
          <Flex
            direction="column"
            background={'green.500'}
            borderRadius="5px"
            padding="1"
            h="100%"
            w="100%"
          >
            <Filters
              search={filters.search}
              filters={filters}
              getBooks={_getBooks}
            />
          </Flex>
        </FilterContainer>
        <BooksContainer padding="30px" h="100%" overflowY="scroll">
          <InfiniteScroll
            dataLength={books.length}
            next={handleOnRowsScrollEnd}
            hasMore={hasMoreData}
            scrollThreshold={1}
            loader={<Spinner />}
            style={{ overflow: 'unset' }}
          >
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)',
              ]}
              gap={6}
            >
              {books?.map((book, index) => {
                return (
                  <GridItem key={book.key + index}>
                    <BookItem
                      authors={book.author_name}
                      publisher={book.publisher}
                      thumbnail={''}
                      title={book.title}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </InfiniteScroll>
        </BooksContainer>
      </LibraryContainer>
    </>
  );
}
