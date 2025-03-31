import Tippy from "@tippyjs/react";
import { CompositeDecorator, ContentState, Editor, EditorState } from "draft-js";
import { useRef, useState } from "react";
import { ENVIRONMENT_REGEX, extractEnv } from "../../utils/utils";

const DraftEditor = ({ value, setValue, fontsm = true, envVars }) => {
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HandleSpan,
      props: { envVars },
    },
  ]);

  const [focus, setfocus] = useState(false);
  const drafteditRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(value), compositeDecorator));
  const onHandleChanage = (e) => {
    setEditorState(e);
    const text = e.getCurrentContent().getPlainText();
    setValue(text);
  };
  function hashtagStrategy(contentBlock, callback) {
    findWithRegex(ENVIRONMENT_REGEX, contentBlock, callback);
  }

  function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

  return (
    <div className={`h-full w-full text-lit flex items-center cursor-text ${fontsm ? "text-sm" : "text-lg"}`} onClick={() => drafteditRef.current.focus()}>
      <div
        className={`${focus ? "h-fit min-h-full relative self-start z-50 text-txtlit outline-2 outline-blue-500 pt-1" : `${fontsm ? "h-5 text-txtprim" : "h-8"} overflow-hidden`} w-full bg-brand rounded-sm break-all px-2`}
      >
        <Editor
          ref={drafteditRef}
          editorState={editorState}
          onChange={(e) => onHandleChanage(e)}
          autoCapitalize="false"
          handleReturn={() => "handled"}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
        />
      </div>
    </div>
  );
};
const HandleSpan = (props) => {
  let clx = "bg-gray-600";
  let h = "Value: Variable Not found!";
  let output = extractEnv(props?.decoratedText);
  if (output) {
    let y = props?.envVars && props.envVars.find((v) => v.key === output);
    console.log("find ->", output, y, props);
    if (y) {
      clx = "bg-green-600";
      h = `Value: ${y.value}`;
    } else {
      clx = "bg-red-600";
    }
  }
  return (
    <Tippy content={h}>
      <div className="relative group inline-block" data-offset-key={props.offsetKey}>
        <span className={`text-lit italic font-bold rounded-md ${clx}`}>{props.children}</span>
      </div>
    </Tippy>
  );
};

export default DraftEditor;
