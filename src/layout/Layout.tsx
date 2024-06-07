import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <Flex width={"100%"} bg={"#F4F5F7"}>
      <Sidebar />
      <Box flex={1} height={"100vh"} overflowY={"auto"}>
        <Outlet />
      </Box>
    </Flex>
  );
}
