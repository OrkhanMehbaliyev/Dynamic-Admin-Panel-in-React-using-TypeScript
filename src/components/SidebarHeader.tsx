import { Flex } from "@chakra-ui/react";
import { ISidebarHeader } from "../utils/types";

const SidebarHeader = ({ children, isOpen }: ISidebarHeader) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      flex={2}
      minH={"100px"}
      gap={isOpen ? 3 : 0}
    >
      {children}
    </Flex>
  );
};

export default SidebarHeader;
