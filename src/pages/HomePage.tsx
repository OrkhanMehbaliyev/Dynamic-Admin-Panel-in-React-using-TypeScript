import { Box, Button, Heading } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { IHomeData } from "../utils/types";
import TableDAO from "../components/TableDAO";
import PageContainer from "../components/PageContainer";
import EditableTableContainer from "../components/EditableTableContainer";

export default function HomePage() {
  const { data, fetchData } = useFetch<IHomeData>(
    "http://localhost:3333/home/get"
  );

  return (
    <PageContainer>
      <Box m={10}>
        <Heading>Home Page</Heading>
      </Box>

      <EditableTableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Welcome message</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{data?.welcomeMessage}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Button>Submit</Button>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </EditableTableContainer>
      {data && (
        <TableDAO
          data={data?.socialAccounts}
          dependent={data}
          fetchData={fetchData}
          reqOptions={{
            DB_KEY: "socialAccounts",
            updateEndpoint: "http://localhost:3333/home/update",
          }}
        />
      )}
    </PageContainer>
  );
}
