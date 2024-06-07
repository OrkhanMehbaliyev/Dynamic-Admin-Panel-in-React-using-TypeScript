import { VStack } from "@chakra-ui/react";

const SidebarBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack spacing={4} alignItems={"center"} flex={8} width={"100%"}>
      {children}
    </VStack>
  );
};

export default SidebarBody;
