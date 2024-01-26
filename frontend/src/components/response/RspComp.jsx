import { Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import RspHeaders from "./RspHeaders";
import RspBody from "./RspBody";

const RspComp = ({ reqLoading, rspObj }) => {
  const { bodyContent, statusCode, duration, headers } = rspObj || {};
  const [tab, setTab] = useState("JSON");
  let tabColor = useColorModeValue("black", "white");
  console.log();
  if (reqLoading) {
    return (
      <Flex justify="center" align="center" w="full" h="calc(100vh - 260px)">
        <Spinner size="lg" color="dark.300" />
      </Flex>
    );
  }
  if (!rspObj) {
    return (
      <Flex justify="center" align="center" w="full" h="calc(100vh - 260px)">
        <Text fontSize="sm" color={useColorModeValue("gray.400", "gray.600")}>
          Click Send to get a reponse
        </Text>
      </Flex>
    );
  }
  return (
    <Box w="full">
      <Box pl="4" mt="2" w="full">
        <Flex justify="space-between" align="center" pr="2">
          <Flex align="center" gridColumnGap={4}>
            <Box
              borderBottomWidth={tab === "JSON" ? "2px" : "none"}
              borderColor="dark.300"
              cursor="pointer"
              color={tab === "JSON" ? tabColor : "gray.500"}
              onClick={() => setTab("JSON")}
            >
              <Text fontWeight="bold" fontSize="sm">
                JSON
              </Text>
            </Box>
            <Box
              borderBottomWidth={tab === "Header" ? "2px" : "none"}
              borderColor="dark.300"
              cursor="pointer"
              color={tab === "Header" ? tabColor : "gray.500"}
              onClick={() => setTab("Header")}
            >
              <Text fontWeight="bold" fontSize="sm">
                Headers
              </Text>
            </Box>
          </Flex>
          <Flex align="center" gridColumnGap={6}>
            {statusCode && (
              <Flex align="center">
                <Text fontSize="sm" mr="1">
                  Status:
                </Text>
                <Text
                  fontSize="sm"
                  color={
                    statusCode >= 200 && statusCode < 300
                      ? "dark.500"
                      : "orange.300"
                  }
                >
                  {statusCode}
                </Text>
              </Flex>
            )}
            {duration && (
              <Flex align="center">
                <Text fontSize="sm" mr="1">
                  Time:
                </Text>
                <Text fontSize="sm" color="dark.500">
                  {duration}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Box>
          {tab === "JSON" ? (
            <RspBody bodyContent={bodyContent} />
          ) : (
            <RspHeaders headers={headers} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RspComp;
