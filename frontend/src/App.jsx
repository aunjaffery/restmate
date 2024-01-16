import { Box, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Layout from "./components/misc/Layout";
import { useState, cloneElement } from "react";
import { nanoid } from "nanoid";
import CustomTab from "./components/misc/CustomTab";
import { LuPlus } from "react-icons/lu";
import ReqTab from "./components/reqTab/ReqTab";

function App() {
  const t_list = [
    { id: nanoid(), name: "restmate", crud: "GET", load: <ReqTab /> },
  ];
  const [tablist, setTablist] = useState(t_list);

  const addNewTab = () => {
    let newTab = {
      id: nanoid(),
      crud: "GET",
      name: "Untitled Request",
      load: <ReqTab />,
    };
    setTablist([...tablist, newTab]);
  };

  const onCrudChange = (crud, id) => {
    const findTab = tablist.find((t) => t.id === id);
    findTab.crud = crud;
    setTablist([...tablist]);
  };
  const onCloseTab = (id) => {
    const delTab = tablist.filter((x) => x.id !== id);
    setTablist([...delTab]);
  };
  return (
    <Box>
      <Layout>
        <Box>
          <Tabs variant="enclosed">
            <TabList
              borderWidth={0}
              borderBottomWidth="1px"
              alignItems="center"
            >
              {tablist.map((t) => (
                <CustomTab
                  key={t.id}
                  t={{ id: t.id, title: t.name, crud: t.crud }}
                  onCloseTab={onCloseTab}
                />
              ))}
              <Box onClick={addNewTab} ml="2" color="gray.500">
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
              {tablist.map(({ load, ...rest }) => (
                <TabPanel key={rest.id} p="0">
                  {cloneElement(load, { tabdata: rest, onCrudChange })}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </Box>
  );
}

export default App;
