import PocketBase from "pocketbase";
import { parse } from "csv-parse";
import fs from "fs";
import readline from "readline";

const pb = new PocketBase("http://192.168.1.151:8090");
const csvFilePath = "./data/WorkoutExport.csv";
const records = [];

const parser = parse({
  delimiter: ",",
});

parser.on("readable", function () {
  let record;
  while ((record = parser.read()) !== null) {
    records.push(record);
  }
});

parser.on("error", function (err: Error) {
  console.error(err.message);
});

async function processLines() {
  const fileStream = fs.createReadStream(csvFilePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let ctr = 0;
  for await (const line of rl) {
    ctr = ctr + 1;
    if (ctr === 1) {
      continue;
    }
    const [
      date,
      exercise,
      reps,
      weightkg,
      duration,
      distance,
      incline,
      resistance,
      isWarmUp,
      note,
      multiplier,
    ] = line.split(",");

    const toInsert = {
      type: exercise,
      weight_kg: parseFloat(weightkg),
      reps: parseInt(reps),
      distance_m: parseFloat(distance),
      duration_s: parseFloat(duration),
      user: "869yf2gi4o2sk43",
      created_imported: date.replace(" +0000", ".000Z"),
    };
    console.log(toInsert);
    try {
      const record = await pb.collection("exercises").create(toInsert);
    } catch (err: any) {
      console.log(err.data);
    }
  }
  console.log(`Inserted ${ctr - 1} records`);
}

processLines();
