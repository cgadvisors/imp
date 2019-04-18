# IMP
An easy to use node.js CLI program that allows you to convert comma delimited (CSV) data file into a JSON data file.

## How it works

### Basic use: Convert a CSV file to a JSON file
Let's say you have a data file <a href="https://raw.githubusercontent.com/cgadvisors/imp/master/office.csv">office.csv</a> containing a list of offices in CSV format and you want to convert the data in that file into JSON format.

Simply run the command

```
$ node imp.ts -s office.csv
```
IPM converts the data from CSV to JSON and stores the data in a file called **output.json** 

You can also define a target file using the -t flag. 

```
$ node imp.ts -s office.csv -t office.json
```

### Intermediate use: eliminate and/or rename some of the fields
Continuing our example, let's say you are only interested in three of the fields from the CSV: the org_id, physical_address_city, and the physical_address_state. Furthermore, you want the JSON field names to be: orgID, city, and state. 

All we have to do is create data mapping that conforms to <a href="https://www.npmjs.com/package/node-json-transform">this convention</a>, store the mapping it in a file called <a href="https://raw.githubusercontent.com/cgadvisors/imp/master/mapping.json">mapping.json</a>:

```
{
  "list": "rows",
  "item": {
    "orgID": "org_id",
    "city": "physical_address_city",
    "state": "physical_address_state"
  }
}
```

and then run the command:

```
$ node imp.ts -s office.csv -m mapping.json
```

the data is converted from CSV to JSON. The output file contains only the fields we wanted!

### Advanced use: transform the data values or anything else you can dream up
IMP is extensible. If you need to change the data values, you can create a mapping file that allows you to call your own javascript functions! Refer to <a href="https://www.npmjs.com/package/node-json-transform">node-json-transform</a> project for more info!

## Pre-requisites
You must have <a href="https://nodejs.org">node.js</a> installed

## Much Props

This project is built on top of the work of others. Many thanks to: 

* https://www.npmjs.com/package/args
* https://www.npmjs.com/package/jsonfile
* https://www.npmjs.com/package/node-json-transform
* https://www.npmjs.com/package/csvtojson
