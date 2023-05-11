import {
  Badge,
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
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BOOK_GRID_OPTIONS, getBooksParams } from './utils';
import BookSkeleton from './components/BookSkeleton';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(-1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState({
    search: 'harry potter',
    page: 1,
    author: '',
    subject: '',
  });
  const toast = useToast();

  async function getBooks(
    search = filters.search,
    page = filters.page,
    author = filters.author,
    subject = filters.subject
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
        subject: subject,
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
        page: 1,
        [id]: value,
      };
    });
  }, 1000);

  const handleOnRowsScrollEnd = async () => {
    if (books.length < totalBooks) {
      setHasMoreData(true);
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
    console.log(books);
  }, [books]);

  useEffect(() => {
    Setup();
  }, [filters]);

  return (
    <>
      <LibraryContainer
        templateColumns={{ base: '100%', xl: '20% 80%' }}
        textAlign="center"
        padding="30px"
        h="100%"
      >
        <FilterContainer
          padding={{ base: '', md: '30px' }}
          minH={{ base: '50%', md: '100%' }}
        >
          <Box
            id="total-books"
            position="sticky"
            top="0"
            background="rgb(0,0,0,0.5)"
            zIndex={2}
            width="fit-content"
            padding="10px"
            borderRadius="7px"
            textAlign="start"
          >
            <Heading noOfLines={1} size="sm" zIndex={3}>
              Total Books: {loading ? <Spinner /> : totalBooks}
            </Heading>
          </Box>
          <Filters
            search={filters.search}
            filters={filters}
            getBooks={_getBooks}
          />
        </FilterContainer>
        {loading ? (
          <BookSkeleton />
        ) : (
          <BooksContainer
            id="book-container"
            padding="30px"
            h="100%"
            overflowY="scroll"
          >
            {books.length !== 0 ? (
              <InfiniteScroll
                dataLength={books.length}
                next={handleOnRowsScrollEnd}
                hasMore={hasMoreData}
                scrollThreshold={1}
                loader={<BookSkeleton />}
                style={{ overflow: 'unset' }}
                scrollableTarget="book-container"
              >
                <Grid {...BOOK_GRID_OPTIONS}>
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
            ) : (
              <Box>
                <Heading>No books for the current query</Heading>
              </Box>
            )}
          </BooksContainer>
        )}
      </LibraryContainer>
    </>
  );
}
