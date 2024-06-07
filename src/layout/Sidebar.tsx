import { Flex, Text } from "@chakra-ui/react";
import { FaHome, FaInfo } from "react-icons/fa";
import { MdContacts, MdOutlineWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { IoMdJournal } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import SidebarItem from "../components/SidebarItem";
import { useState } from "react";
import "../assets/styles/sidebar-style.css";
import SidebarHeader from "../components/SidebarHeader";
import SidebarBody from "../components/SidebarBody";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      width={isOpen ? "300px" : "60px"}
      transition={"0.3s ease"}
      bg={isOpen ? "inherit" : "white"}
      alignItems={"center"}
      py={1}
    >
      <SidebarHeader isOpen={isOpen}>
        <RxHamburgerMenu
          size={"25px"}
          onClick={(e) => {
            setIsOpen(!isOpen);
            console.log(e.target);
          }}
          className={isOpen ? "rotate-forward" : "rotate-backward"}
        />
        <Link to={"/"}>
          {isOpen && (
            <Flex>
              <Text color={"blue"} fontSize={"30px"} fontWeight={"bold"}>
                <span
                  style={{
                    color: "black",
                  }}
                >
                  Self
                </span>
                Admin
              </Text>
            </Flex>
          )}
        </Link>
      </SidebarHeader>

      <SidebarBody>
        <SidebarItem icon={FaHome} path="/" isOpen={isOpen} text="Home" />
        <SidebarItem
          icon={MdOutlineWork}
          path="/services"
          isOpen={isOpen}
          text="Services"
        />
        <SidebarItem icon={FaInfo} path="/about" text="About" isOpen={isOpen} />
        <SidebarItem
          icon={GiSkills}
          path="/skills"
          text="Skills"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={IoMdJournal}
          path="/portfolio"
          text="Portfolio"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={FaPeopleGroup}
          path="/clients"
          text="Clients"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={MdContacts}
          path="/contact"
          text="Contact"
          isOpen={isOpen}
        />
      </SidebarBody>
    </Flex>
  );
}
