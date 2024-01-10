import PocketBase from "pocketbase";
import { parse } from "csv-parse";
import fs from "fs";
import readline from "readline";

const pb = new PocketBase(""); // add server url

(async () => {
  const records = await pb.collection("exercises").getFullList({
    sort: "-created",
  });
  records.forEach(async (record) => {
    console.log(`Deleting ${record.id}`);
    await pb.collection("exercises").delete(record.id);
  });
})();
