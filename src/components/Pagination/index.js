// node_modules
import React, { useEffect, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

const PaginationComponent = ({
  allPagesNumber,
  pageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    pageChange(currentPage);
  }, [currentPage, pageChange]);

  useEffect(() => {
    if (currentPage > allPagesNumber) {
      setCurrentPage(allPagesNumber ? allPagesNumber : 1);
    }
  }, [allPagesNumber, setCurrentPage, currentPage]);

  const onFirstPage = () => {
      setCurrentPage(1);
  };

  const onLastPage = () => {
      setCurrentPage(allPagesNumber);
  };

  const onNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

  const onPreviousPage = () => {
      setCurrentPage(currentPage - 1);
  };

  const validateInput = (value) => {
    const regex = /^[0-9\b]+$/;
    const regexTest = regex.test(value);
    if (regexTest) {
      let newPage = parseInt(value, 10);
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > allPagesNumber) {
        newPage = allPagesNumber;
      }
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Button
        disabled={currentPage <= 1}
        onClick={onFirstPage}
        colorScheme={'blue'}
        ml={2}
      >
        {'<<'}
      </Button>
      <Button
        disabled={currentPage <= 1}
        onClick={onPreviousPage}
        colorScheme={'blue'}
        ml={2}
      >
        {'<'}
      </Button>
      <Box ml={2}>
        <Input
          onChange={(e) => validateInput(e.target.value)}
          value={currentPage}
          width={"80px"}
        />
        &nbsp; / {allPagesNumber}&nbsp;
      </Box>
      <Button
        disabled={currentPage >= allPagesNumber}
        onClick={onNextPage}
        colorScheme={'blue'}
        ml={2}
      >
        {'>'}
      </Button>
      <Button
        disabled={currentPage >= allPagesNumber}
        onClick={onLastPage}
        colorScheme={'blue'}
        ml={2}
      >
        {'>>'}
      </Button>
    </>
  );
};

export default PaginationComponent;