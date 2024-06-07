import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ISidebarItem } from "../utils/types";

const SidebarItem = ({
  icon: Icon,
  path,
  isOpen = true,
  text,
}: ISidebarItem) => {
  return (
    <NavLink
      to={path}
      style={{
        width: "100%",
      }}
    >
      <Flex
        width={"100%"}
        height={"40px"}
        alignItems={"center"}
        justify={"center"}
        gap={1}
        _hover={{
          bg: "white",
          borderRadius: "15px",
          color: "#1F3BB3",
        }}
      >
        <Box w={"30px"} display={"flex"} justifyContent={"center"}>
          <Icon />
        </Box>
        {isOpen && <Text width={"70px"}>{text}</Text>}
      </Flex>
    </NavLink>
  );
};

export default SidebarItem;
