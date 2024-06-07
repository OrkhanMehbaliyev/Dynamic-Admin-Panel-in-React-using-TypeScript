import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";

import useFetch from "../hooks/useFetch";
import { IPortfolioData } from "../utils/types";
import TableDAO from "../components/TableDAO";

export default function PortfolioPage() {
  const { data, loading, fetchData } = useFetch<IPortfolioData>(
    "http://localhost:3333/portfolio/get"
  );

  return (
    <Flex width={"100%"} alignItems={"center"} direction={"column"} gap={7}>
      <Box m={10}>
        <Heading>Portfolio Page</Heading>
      </Box>

      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue"
          size="xl"
        />
      ) : null}

      {data ? (
        <>
          <TableDAO
            data={data?.works}
            fetchData={fetchData}
            dependent={data}
            reqOptions={{
              DB_KEY: "works",
              updateEndpoint: "http://localhost:3333/portfolio/update",
            }}
          />
          <TableDAO
            data={data.statistics}
            fetchData={fetchData}
            dependent={data}
            reqOptions={{
              DB_KEY: "statistics",
              updateEndpoint: "http://localhost:3333/portfolio/update",
            }}
          />
        </>
      ) : null}
    </Flex>
  );
}
