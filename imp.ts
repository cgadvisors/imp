const csvtojsonV2 = require("csvtojson");
var DataTransform = require("node-json-transform").DataTransform;
const jsonfile = require("jsonfile");

/** 
    file: user.csv column headers:
    id, display_name,	first_name,	last_name,	middle_name,	
    email,	org_id,	phoneNumber,	photoURL,	record_created_date,	
    record_last_modified_by,	record_last_modified_date, status,	title
*/

async function imp() {
  let jsonSource, jsonTarget;

  // todo - import these three constants from command line arguments
  const csvSourceFile = "/Users/glopez/Documents/denta/data/user.csv";
  const jsonTargetFile = "/Users/glopez/Documents/denta/data/user.json";
  const mapping = {
    list: "rows",
    item: {
      userID: "id",
      full_name:
        "title" + " " + "first_name" + " " + "middle_name" + " " + "last_name",
      emailAddress: "email",
      telNumber: "phoneNumber"
    }
  };

  // import data from file and convert into JSON object
  try {
    jsonSource = await csvtojsonV2().fromFile(csvSourceFile);
    console.log(
      "\nimp started\n\nParsed csv file into jsonSource:\n\n",
      jsonSource,
      "\n\n"
    );
  } catch (error) {
    console.error("Unable to parse csv file: ", csvSourceFile, ".\n", error);
  }

  try {
    // convert json into an object that the data transform can act upon
    jsonSource = JSON.stringify(jsonSource);
    jsonSource = '{ "rows" : ' + jsonSource + "}";
    console.log(
      "Wrapped jsonSource into a JSON object :\n\n",
      jsonSource,
      "\n\n"
    );
    jsonSource = JSON.parse(jsonSource);

    // transform json object to another json object that conforms to transformation defined in mapping
    const transform = DataTransform(jsonSource, mapping);
    jsonTarget = transform.transform();
    jsonTarget = JSON.stringify(jsonTarget);

    console.log(
      "Transformed jsonSource into jsonTarget:\n\n",
      jsonTarget,
      "\n\n"
    );
  } catch (error) {
    console.error("Unable to tranform jsonSource: ", error);
  }
  // serialize json to file system
  try {
    jsonTarget = JSON.parse(jsonTarget);
    await jsonfile.writeFile(jsonTargetFile, jsonTarget);
    console.log("Wrote jsonTarget to:\n\n", jsonTargetFile, "\n\n");
  } catch (error) {
    console.error("Unable to write json to filesystem: ", error);
  }
}

// run the data transformation
imp();
