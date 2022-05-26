import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Alert,
  AlertIcon,
  chakra
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, SearchIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'

import TrComponent from "../Tr";
import { fetchUsers, searchUsers } from "../../store/users-slice";
import PaginationComponent from "../Pagination";


const UsersTableComponent = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const count = useSelector((state) => state.users.count);
  const users = useSelector((state) => state.users.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);

  const data = React.useMemo(
    () => users,
    [users],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Height',
        accessor: 'height',
        isNumeric: true
      },
      {
        Header: 'Mass',
        accessor: 'mass',
        isNumeric: true
      },
      {
        Header: 'Created',
        accessor: 'created',
      },
      {
        Header: 'Edited',
        accessor: 'edited',
      },
      {
        Header: 'Planet Name',
        accessor: 'planetName',
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  useEffect(() => {
    if (search)
      dispatch(searchUsers(search, currentPage));
    else
      dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage, search]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  }

  const pageChange = (currentPage) => {
    setCurrentPage(currentPage);
  }

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"right"} mt={8} mr={4}>
        <InputGroup width={200}>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
          />
          <Input type='tel' placeholder='Search' onKeyDown={onKeyDown}/>
        </InputGroup>
        <PaginationComponent
          allPagesNumber={Math.floor(count / 10) + 1}
          pageChange={pageChange}
        />
      </Box>
      <TableContainer p={4}>
        {(status === 'failure') && 
          <Alert status='error'>
            <AlertIcon />
              There was an error processing your request
          </Alert>
        }
        {(status === 'pending') && <Box position='fixed' zIndex='1' w={'100%'} h={'100%'} display={"flex"} alignItems={"center"} justifyContent={"center"} ><Spinner size='lg' color='red.500'/></Box>}

        <Table {...getTableProps()} variant='striped' colorScheme='blue'>
          <Thead bg='blue.300' color='white'>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <chakra.span pl='4'>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {
              rows.map((row, i) => {
              prepareRow(row);
              return (
                <TrComponent row={row} key={i}>
                </TrComponent>
              );
            })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default React.memo(UsersTableComponent);