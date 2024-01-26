import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useCallback } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { store } from "../../AppStore";
import { useSnapshot } from "valtio";

const BodyTab = ({ tab_id }) => {
  console.log("__Body TAB__");
  let t = store.tabs.find((t) => t.id === tab_id);
  const tab = useSnapshot(t);
  const body = tab?.body;
  const onChange = useCallback((v, _) => {
    t.body.payload = v;
    t.body.type = "json";
  }, []);

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
  return (
    <Box mr="2" mt="2">
      <Flex
        mt="3"
        mb="1"
        justify="space-between"
        align="center"
        color="gray.500"
      >
        <Text fontWeight="bold" fontSize="sm">
          Requset Body
        </Text>
      </Flex>
      <Box
        h="calc(100vh - 260px)"
        borderWidth="1px"
        borderColor={useColorModeValue("light.50", "dark.50")}
      >
        <CodeMirror
          width="100%"
          height="100%"
          value={body?.payload}
          onChange={onChange}
          placeholder="start typing..."
          autoFocus={true}
          basicSetup={{ lintKeymap: false }}
          extensions={[
            json(),
            linter(jsonParseLinter()),
            lintGutter(jsonParseLinter()),
            EditorView.lineWrapping,
          ]}
          theme={editorTheme}
        />
      </Box>
    </Box>
  );
};

export default BodyTab;
