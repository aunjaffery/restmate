import { nanoid } from "nanoid";
import { proxy } from "valtio";
import { GetCollectionRequest } from "../wailsjs/go/main/App";

export const store = proxy({
  tabs: [
    {
      id: "qwe123",
      name: "Restmate",
      crud: "GET",
      url: "",
      body: {
        type: "",
        payload: "",
      },
      params: [
        {
          id: nanoid(),
          key: "",
          value: "",
          active: true,
        },
      ],
      headers: [
        {
          id: nanoid(),
          key: "",
          value: "",
          active: true,
        },
      ],
    },
  ],
});
export const addNewTab = () => {
  let newTab = {
    id: nanoid(),
    name: "Untitled Request",
    crud: "GET",
    url: "",
    body: {
      type: "",
      payload: "",
    },
    params: [
      {
        id: nanoid(),
        key: "",
        value: "",
        active: true,
      },
    ],
    headers: [
      {
        id: nanoid(),
        key: "",
        value: "",
        active: true,
      },
    ],
  };
  store.tabs.push({ ...newTab });
};
export const openColTab = async (col_id, req_id) => {
  if (!col_id || !req_id) return;
  let f = store.tabs.find((t) => t.id === req_id);
  if (f) return;
  try {
    let r = await GetCollectionRequest(col_id, req_id);
    store.tabs.push({ ...r });
  } catch (error) {
    console.log(error);
  }
};
export const onCloseTab = (id) => {
  const index = store.tabs.findIndex((t) => t.id === id);
  if (index >= 0) {
    store.tabs.splice(index, 1);
  }
};

export const onChangeUrl = (id, val) => {
  const t = store.tabs.find((t) => t.id === id);
  t.url = val;
};

export const onChangeCrud = (id, val) => {
  const t = store.tabs.find((t) => t.id === id);
  t.crud = val;
};
export const onAddNewParam = (id) => {
  let newParam = {
    id: nanoid(),
    key: "",
    value: "",
    active: true,
  };
  const t = store.tabs.find((t) => t.id === id);
  t.params.push(newParam);
};
export const onRemoveParam = (tab_id, prm_id) => {
  const t = store.tabs.find((t) => t.id === tab_id);
  const index = t.params.findIndex((t) => t.id === prm_id);
  if (index >= 0) {
    t.params.splice(index, 1);
  }
};
