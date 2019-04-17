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
    userID: "id",
    full_name:
      "title" + " " + "first_name" + " " + "middle_name" + " " + "last_name",
    emailAddress: "email",
    telNumber: "phoneNumber"
  };

  // import data from file and convert into JSON object
  try {
    jsonSource = await csvtojsonV2().fromFile(csvSourceFile);
    console.log("\nimp started\n\nParsed csv file into jsonSource:\n\n", jsonSource, "\n\n");
  } catch (error) {
    console.error("Unable to parse csv file: ", csvSourceFile, ". ", error);
  }

  try {
    // transform json object to another json object that conforms to transformation defined in mapping
    jsonTarget = await DataTransform(jsonSource, mapping);
    console.log("Transformed jsonSource into jsonTarget:\n\n", jsonSource, "\n\n");
  } catch (error) {
    console.error("Unable to tranform json: ", error);
  }
  // serialize json to file system
  await jsonfile
    .writeFile(jsonTargetFile, jsonTarget)
    .catch(error =>
      console.error("Unable to write json to filesystem: ", error)
    );
  console.log("Wrote jsonTarget into jsonTargetFile at:\n\n", jsonTargetFile, "\n\n");
}

// run the data transformation
imp();
