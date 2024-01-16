import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { json } from "@codemirror/lang-json";
import { nordInit } from "@uiw/codemirror-theme-nord";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";

const RspComp = ({ reqLoading, rspObj }) => {
  const { bodyContent, statusCode, duration } = rspObj || {};
  return (
    <Box w="full">
      <Box pl="4" mt="2" w="full">
        <Flex justify="space-between" align="center" pr="2" mb="4">
          <Text fontWeight="bold" fontSize="sm" color="gray.300">
            Response
          </Text>
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
                      ? "green.300"
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
                <Text fontSize="sm" color="green.300">
                  {duration}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Box
          borderWidth="1px"
          borderColor="gray.700"
          w="full"
          h="calc(100vh - 220px)"
        >
          {reqLoading ? (
            <Flex justify="center" align="center" w="full" h="full">
              <Spinner size="lg" color="fuse.300" />
            </Flex>
          ) : bodyContent ? (
            <CodeMirror
              width="100%"
              height="100%"
              value={bodyContent}
              extensions={[json(), EditorView.lineWrapping]}
              readOnly={true}
              basicSetup={{
                foldGutter: true,
                lintKeymap: true,
              }}
              theme={nordInit({
                settings: {
                  background: "none",
                  gutterBackground: "transparent",
                },
              })}
            />
          ) : (
            <Flex justify="center" align="center" w="full" h="full">
              <Text fontSize="sm" color="gray.500">
                Click Send to get a reponse
              </Text>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RspComp;
