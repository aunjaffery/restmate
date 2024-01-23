import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Layout from "./components/misc/Layout";
import CustomTab from "./components/misc/CustomTab";
import { LuPlus } from "react-icons/lu";
import ReqTab from "./components/reqTab/ReqTab";
import { useSnapshot } from "valtio";
import { addNewTab, onCloseTab, store } from "./AppStore";
import { useEffect } from "react";
import { getCollections } from "./ColStore";

const App = () => {
  console.log("--- APP reRender ---");
  const tabs = useSnapshot(store.tabs);
  useEffect(() => {
    getCollections();
  }, []);
  return (
    <Box w="full">
      <Layout>
        <Box>
          <Tabs
            variant="enclosed"
            w="full"
            maxW="full"
            // index={tabIndex}
            // onChange={onTabchange}
          >
            <TabList
              borderWidth={0}
              borderBottomWidth="1px"
              alignItems="center"
            >
              <Flex
                overflowX="auto"
                sx={{
                  "&::-webkit-scrollbar-track": {
                    bg: "transparent",
                  },
                  "&::-webkit-scrollbar": {
                    height: "2px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bg: "fuse.400",
                    borderRadius: "20px",
                  },
                }}
              >
                {tabs.map((t) => (
                  <CustomTab
                    key={t.id}
                    t={{
                      id: t.id,
                      title: t.name,
                      crud: t.crud,
                    }}
                    onCloseTab={onCloseTab}
                  />
                ))}
              </Flex>
              <Box onClick={addNewTab} mx="2" color="gray.500">
                <Box
                  p="1"
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.600",
                    color: "white",
                  }}
                >
                  <LuPlus size="18" />
                </Box>
              </Box>
            </TabList>
            <TabPanels>
              {tabs.map((t) => (
                <TabPanel key={t.id} p="0">
                  <ReqTab tab_id={t.id} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </Box>
  );
};

export default App;
