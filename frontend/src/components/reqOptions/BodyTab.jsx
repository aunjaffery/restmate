import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { nordInit } from "@uiw/codemirror-theme-nord";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { store } from "../../AppStore";
import { useSnapshot } from "valtio";

const BodyTab = ({ tab_id }) => {
  console.log("__Body TAB__");
  let t = store.tabs.find((t) => t.id === tab_id);
  const tab = useSnapshot(t);
	const body = tab?.body
  const onChange = useCallback((v, _) => {
    t.body.payload = v;
    t.body.type = "json";
  }, []);

  return (
    <Box h="calc(100vh - 260px)">
      <Box mt="2" mr="2" borderWidth="1px" borderColor="gray.700" h="full">
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
