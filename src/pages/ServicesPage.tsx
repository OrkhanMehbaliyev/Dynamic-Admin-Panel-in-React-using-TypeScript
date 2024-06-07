import { Box, Heading } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { IServicesData } from "../utils/types";
import PageContainer from "../components/PageContainer";
import TableIAO from "../components/TableIAO";
import { defaultFetchOption } from "../constants/staticVariables";

export default function ServicesPage() {
  const { data, fetchData } = useFetch<IServicesData>(
    "http://localhost:3333/services/get"
  );

  return (
    <PageContainer>
      <Box m={10}>
        <Heading>Services Page</Heading>
      </Box>

      {data && (
        <TableIAO
          data={data}
          fetchData={fetchData}
          reqOptions={defaultFetchOption}
        />
      )}
    </PageContainer>
  );
}
