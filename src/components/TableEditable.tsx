import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ALLOWED_TAGS_DYNAMIC_TABLE } from "../constants/staticVariables";
import { ITableProps } from "../utils/types";

const useTableEditable = <T extends object, D extends object>({
  data,
  allData,
  reqOptions,
}: ITableProps<T, D>) => {
  const [isEdit, setIsEdited] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<T[]>([]);
  const tblRef = useRef<HTMLDivElement>(null);

  const handleEdit = (index: number, field: string, value: string | number) => {
    console.log("ediitt");
    setEditableData(
      editableData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    await axios.put(
      reqOptions.updateEndpoint,
      { ...allData, [reqOptions.DB_KEY]: editableData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleAdd = () => {
    const newRow: T = {} as T;
    Object.keys(data[0] || {}).forEach((key) => {
      newRow[key as keyof T] = "" as any;
    });
    setEditableData([...editableData, newRow]);
    setTimeout(() => {
      setIsEdited(true);
    }, 0);
  };

  const handleDelete = (idx: number | string) => {
    setEditableData(editableData.filter((_, i) => i != idx));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!ALLOWED_TAGS_DYNAMIC_TABLE.includes(target.tagName)) {
      setIsEdited(false);
    }
  };

  const handleClickInside = () => {
    setIsEdited(true);
  };

  useEffect(() => {
    if (tblRef.current)
      tblRef.current.addEventListener("click", handleClickInside);
    document.addEventListener("click", handleOutsideClick);

    setEditableData(data);
    return () => {
      if (tblRef.current)
        tblRef.current.removeEventListener("click", handleClickInside);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [data]);

  const headings = Object.keys(editableData[0] || {}) as (keyof T)[];

  return (
    <>
      {editableData && (
        <TableContainer
          ref={tblRef}
          w={"70%"}
          m={5}
          bg={"white"}
          borderRadius={"15px"}
          _hover={{
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
            transition: "0.1s",
          }}
        >
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
                    if (typeof editableData[rowIndex][heading] !== "object")
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
        </TableContainer>
      )}
    </>
  );
};

export default useTableEditable;
