import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
import useTableDAO from "../hooks/useTableDAO";
import { ITableProps } from "../utils/types";
import EditableTableContainer from "./EditableTableContainer";

const TableDAO = <T extends object, D extends object>({
  data,
  dependent,
  fetchData,
  reqOptions,
}: ITableProps<T, D>) => {
  const {
    tblRef,
    isEdit,
    editableData,
    headings,
    handleEdit,
    handleSubmit,
    handleAdd,
    handleDelete,
  } = useTableDAO({ data, dependent, reqOptions, fetchData });

  return (
    <>
      {editableData && (
        <EditableTableContainer passRef={tblRef}>
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
              {editableData.map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {headings.map((heading, cellIndex) => {
                    return (
                      <Td key={cellIndex}>
                        {isEdit ? (
                          <Input
                            h={"30px"}
                            m={0}
                            key={cellIndex}
                            value={String(editableData[rowIndex][heading])}
                            onChange={(e) =>
                              handleEdit(
                                rowIndex,
                                String(heading),
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          String(editableData[rowIndex][heading])
                        )}
                      </Td>
                    );
                  })}

                  <Td>
                    <DeleteIcon
                      _hover={{ color: "red.600" }}
                      onClick={() => handleDelete(rowIndex)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>
                  <Flex m={1} gap={4}>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleAdd} display={"flex"} gap={4}>
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

export default TableDAO;
