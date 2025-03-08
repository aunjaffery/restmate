import React from "react";
import ReqHead from "./ReqHead";
import ReqOptionTabs from "./reqOptions/ReqOptionTabs";
import Response from "./response/Response";
import NullResponse from "./response/NullResponse";

const TabPanelRoot = ({ tab }) => {
  // console.log(JSON.stringify(tab.bodyRaw))
  console.log("panel render", "var(--color-brand)");
  return (
    <div className="h-full grid pt-4" id="tabPanelRoot" style={{ gridTemplateRows: "min-content minmax(0,100%)", gridTemplateColumns: "minmax(0,100%)" }}>
      <ReqHead tabId={tab.id} method={tab.method} url={tab.url} name={tab.name} coll_id={tab.coll_id} />
      <div
        className="h-full w-full grid py-4"
        style={{
          gridTemplateColumns: "minmax(0px, 100%) minmax(0px, 100%)",
          gridTemplateRows: "minmax(0, 100%)",
        }}
      >
        <div className="border-r border-lines px-6 h-full w-full">
          <ReqOptionTabs tabId={tab.id} params={tab.params} headers={tab.headers} bodyType={tab.bodyType} bodyRaw={tab.bodyRaw} formData={tab.formData} />
        </div>
        {/*no rsp and error handler here*/}
        {tab.response && tab.response.statusCode ? <Response response={tab.response} /> : <NullResponse />}
      </div>
    </div>
  );
};

export default React.memo(TabPanelRoot);
