import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex width={"100%"} alignItems={"center"} direction={"column"} gap={7}>
      {children}
    </Flex>
  );
};

export default PageContainer;
