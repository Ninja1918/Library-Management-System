import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Spinner,
  useColorModeValue,
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
  const [books, setBooks] = useState();
  const [totalBooks, setTotalBooks] = useState(-1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: 'harry potter',
    author: '',
    subject: '',
  });
  const toast = useToast();

  async function getBooks(
    search = filters.search,
    page = currentPage,
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
        : setBooks(response.data?.docs || []);
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
    setCurrentPage(1);
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
      setCurrentPage(prev => prev + 1);
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
    books !== undefined && getBooks(undefined, currentPage);
  }, [currentPage]);

  useEffect(() => {
    Setup();
  }, [filters]);

  return (
    <>
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
      <LibraryContainer
        templateColumns={{ base: '100%', xl: '20% 80%' }}
        textAlign="center"
        padding="30px"
        h="100%"
        gap={6}
      >
        <FilterContainer minH={{ base: '200px', md: '100%' }}>
          <Filters
            search={filters.search}
            filters={filters}
            getBooks={_getBooks}
          />
        </FilterContainer>
        <BooksContainer
          margin="auto"
          borderRadius="7px"
          bg={useColorModeValue('gray.100', 'gray.600')}
          id="book-container"
          h="100%"
          px="9"
          overflowY="scroll"
        >
          {loading ? (
            <BookSkeleton />
          ) : books.length !== 0 ? (
            <InfiniteScroll
              dataLength={books.length}
              next={handleOnRowsScrollEnd}
              hasMore={hasMoreData}
              scrollThreshold={1}
              loader={<BookSkeleton />}
              style={{ overflowY: 'unset' }}
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
                        coverId={book.cover_i}
                        readers={book.already_read_count}
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
      </LibraryContainer>
    </>
  );
}
