const csvtojsonV2 = require("csvtojson");
var DataTransform = require("node-json-transform").DataTransform;
const jsonfile = require("jsonfile");
const args = require("args");

args
  .option("source", "path to csv file.")
  .option("mapping", "path to mapping file.")
  .option("target", "path to where json file will be stored.")
  .example(
    "node imp.ts -s ./sourcefile.csv",
    "source file will be transformed to json and stored in ./imp-output.json"
  )
  .example(
    "node imp.ts -s ./sourcefile.csv -m ./mapping.json",
    "source file will be transformed to json according to mapping in mapping.json and stored in ./imp-output.json"
  )
  .example(
    "node imp.ts -s ./sourcefile.csv -m ./mapping.json -t ./targetfile.json",
    "source file will be transformed to json according to mapping in mapping.json and stored ./targetfile.json"
  );
const logo =
  "\n\n#### ##     ## ########\n" +
  " ##  ###   ### ##     ##\n" +
  " ##  #### #### ##     ##\n" +
  " ##  ## ### ## ########\n" +
  " ##  ##     ## ##\n" +
  " ##  ##     ## ##\n" +
  "#### ##     ## ##        Copyright CG Advisors LLC 2019";

const flags = args.parse(process.argv, { value: logo });

imp(flags);

async function imp(flags) {
  let csvSourceFile, jsonSource, mapping, jsonTarget, jsonTargetFile;

  if (!flags.source) {
    console.log("\n\nError: no source file specified.");
  } else {
    csvSourceFile = flags.source;

    // import source data from file and convert into JSON object
    try {
      jsonSource = await csvtojsonV2().fromFile(csvSourceFile);
      console.log("\n\nRead source csv data file and converted it to json format:\n", jsonSource);
    } catch (error) {
      console.error("\n\nError: Unable to parse csv file: ", csvSourceFile, ".\n", error);
      return;
    }

    // import mapping from file and convert into JSON object
    if (flags.mapping) {
      mapping = flags.mapping;
      try {
        mapping = jsonfile.readFileSync(mapping)
        // mapping = JSON.parse(mapping)
        // console.log("\n\nParsed mapping file:\n", JSON.stringify(mapping));
      } catch (error) {
        console.error("\n\nError: Unable to parse mapping file: ", mapping, "\n", error);
        return;
      }

      // transform jsonSource object to another json object that conforms to transformation defined in mapping
      try {
        jsonSource = JSON.stringify(jsonSource);
        jsonSource = '{ "rows" : ' + jsonSource + "}";
        jsonSource = JSON.parse(jsonSource);
        const transform = DataTransform(jsonSource, mapping);
        jsonTarget = transform.transform();
        console.log(
          "\n\nTransformed source data into target data format based on mapping:\n",
          jsonTarget
        );        
        jsonTarget = JSON.stringify(jsonTarget);
        jsonTarget = JSON.parse(jsonTarget);
      } catch (error) {
        console.error("\n\nError: Unable to tranform jsonSource: ", error);
        return;
      }
    } else {
      jsonTarget = jsonSource;
    }

    // serialize json to file system
    if (flags.target) {
      jsonTargetFile = flags.target;
    } else {
      jsonTargetFile = "./output.json";
    }

    try {
      await jsonfile.writeFile(jsonTargetFile, jsonTarget);
      console.log("\n\nWrote target data in json format to a file at:", jsonTargetFile, "\n\n");
    } catch (error) {
      console.error("\n\nError: Unable to write json to filesystem: ", error, "\n\n");
    }
  }
}
