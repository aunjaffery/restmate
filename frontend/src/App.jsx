import { useEffect } from "react";
import Layout from "./comps/misc/Layout";
import TabsRoot from "./comps/TabsRoot";
import { useStore } from "./store/store";
import "tippy.js/dist/tippy.css";
import { EventsOn, WindowShow } from "../wailsjs/runtime/runtime";
import { SaveSession } from "../wailsjs/go/main/App";
import Spinner from "./comps/misc/Spinner";

function App() {
  const loading = useStore((x) => x.appLoading);
  const initFunc = async () => {
    await Promise.allSettled([
      useStore.getState().getSettings(),
      useStore.getState().restoreTabs(),
      useStore.getState().getCollections(),
      useStore.getState().getEnvs(),
    ])
    useStore.setState({ appLoading: false })
  }
  useEffect(() => {
    WindowShow()
    initFunc()
    const unsub = EventsOn("save-state-before-close", () => {
      SaveSession(useStore.getState().tabs)
    })
    return () => unsub()
  }, []);

  if (loading) {
    return (
      <div className="bg-brand h-svh w-full flex justify-center items-center">
        <Spinner size="56" />
      </div>
    );
  }
  return (
    <Layout>
      <TabsRoot />
    </Layout>
  );
}

export default App;
