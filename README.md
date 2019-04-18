# IMP
An easy to use node.js CLI program that allows you to transform Comma Delimitted Values (CSV) data into JSON

## How it works

### Convert CSV to JSON
Let's say you have a data file <a href="https://raw.githubusercontent.com/cgadvisors/imp/master/office.csv">office.csv</a> containing a list of offices in CSV format and you want to convert the data in that file into JSON format.

Simply run the command

```
$ node imp.ts -s office.csv
```
the data is converted from CSV to JSON and stored in a file called **output.json**

### Convert CSV to JSON and transform some of the values 
Now let's say you are only interested in capturing some of the fields. 

Create a mapping in a file called mapping.json. 

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

and then run the command

```
$ node imp.ts -s office.csv -m mapping.json -t converted.json
```

the data is converted from CSV to JSON and stored in a file called **output.json**

### Transform Data Values
You can event transform data values <a href="https://www.npmjs.com/package/node-json-transform">using your own js functions</a>!

## Pre-requisites
You must have <a href="https://nodejs.org">node.js</a> installed

## Much Props

This project is built on top of the work of others. Many thanks to: 

* https://www.npmjs.com/package/args
* https://www.npmjs.com/package/jsonfile
* https://www.npmjs.com/package/node-json-transform
* https://www.npmjs.com/package/csvtojson
