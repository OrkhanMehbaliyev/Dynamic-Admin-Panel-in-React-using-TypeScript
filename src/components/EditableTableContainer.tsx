import { TableContainer } from "@chakra-ui/react";
import { ReactNode } from "react";

const EditableTableContainer = ({
  children,
  passRef,
}: {
  children: ReactNode;
  passRef?: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <TableContainer
      ref={passRef ?? null}
      w={"70%"}
      m={5}
      bg={"white"}
      borderRadius={"15px"}
      _hover={{
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
        transition: "0.1s",
      }}
    >
      {children}
    </TableContainer>
  );
};

export default EditableTableContainer;
