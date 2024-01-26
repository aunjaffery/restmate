import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { json } from "@codemirror/lang-json";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { LuCopy, LuDownload } from "react-icons/lu";

const RspBody = ({ bodyContent }) => {
  let editorTheme = useColorModeValue(
    githubLightInit({
      settings: {
        background: "none",
        gutterBackground: "transparent",
      },
    }),
    githubDarkInit({
      settings: {
        background: "none",
        gutterBackground: "transparent",
      },
    }),
  );
  const copyText = async () => {
    try {
      await navigator?.clipboard?.writeText(
        JSON.stringify(JSON.parse(bodyContent), null, 2),
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <Flex
        mt="3"
        mb="1"
        justify="space-between"
        align="center"
        color="gray.500"
      >
        <Text fontWeight="bold" fontSize="sm">
          Response Body
        </Text>
        <Flex align="center" mr="2">
          <Box
            p="1"
            cursor="pointer"
            borderRadius="md"
            _hover={{
              color: useColorModeValue("black", "white"),
            }}
          >
            <LuDownload size="16" />
          </Box>
          <Box
            p="1"
            cursor="pointer"
            borderRadius="md"
            _hover={{
              color: useColorModeValue("black", "white"),
            }}
            onClick={copyText}
          >
            <LuCopy size="16" />
          </Box>
        </Flex>
      </Flex>
      <Box
        h="calc(100vh - 260px)"
        borderWidth="1px"
        borderColor={useColorModeValue("light.50", "dark.50")}
      >
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
          theme={editorTheme}
        />
      </Box>
    </Box>
  );
};

export default RspBody;
