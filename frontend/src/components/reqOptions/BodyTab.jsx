import { Box } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { nordInit } from "@uiw/codemirror-theme-nord";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";

const BodyTab = ({ reqBodyJson, setReqBodyJson }) => {
  const onChange = useCallback((v, _) => {
    setReqBodyJson(v);
  }, []);

  return (
    <Box h="calc(100vh - 220px)">
      <Box mt="2" mr="2" borderWidth="1px" borderColor="gray.700" h="full">
        <CodeMirror
          width="100%"
          height="100%"
          value={reqBodyJson}
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
          theme={nordInit({
            settings: {
              background: "none",
              gutterBackground: "transparent",
            },
          })}
        />
      </Box>
    </Box>
  );
};

export default BodyTab;
