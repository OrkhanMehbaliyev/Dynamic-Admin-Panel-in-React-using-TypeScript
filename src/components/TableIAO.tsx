import EditableTableContainer from "./EditableTableContainer";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTableIAO from "../hooks/useTableIAO";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

export interface ITableIAO<T> {
  data: T[];
  fetchData: () => void;
  reqOptions: any;
}

const TableIAO = <T,>({ data, fetchData, reqOptions }: ITableIAO<T>) => {
  const { editableData, headings } = useTableIAO<T>({
    data,
    fetchData,
    reqOptions,
  });
  return (
    <>
      {editableData && (
        <EditableTableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {headings.map((heading, idx) => (
                  <Th key={idx}>{String(heading)}</Th>
                ))}
                <Th colSpan={1}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {editableData.map((item, index) => {
                return (
                  <Tr key={item[headings[0]] as string | number}>
                    {headings.map((heading) => {
                      return <Td>{String(item[heading])}</Td>;
                    })}
                    <Td>
                      <DeleteIcon />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>
                  <Flex m={1} gap={4}>
                    <Button display={"flex"} gap={4}>
                      Add <AddIcon />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </EditableTableContainer>
      )}
    </>
  );
};

export default TableIAO;
