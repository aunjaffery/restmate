import { proxy } from "valtio";
import { GetCollections } from "../wailsjs/go/main/App";

export const collection = proxy({
  cols: [],
});

export const getCollections = async () => {
  console.log("getting collections...");
  try {
    let c = await GetCollections();
    collection.cols = [...c];
  } catch (err) {
    console.log("IN Error for getting cols --->");
    console.log(err);
  }
};
export const upCollections = async () => {
  console.log("upinGG collections...");
  try {
    let c = await GetCollections();
    collection.cols = [...c];
  } catch (err) {
    console.log("IN Error for getting cols --->");
    console.log(err);
  }
};
