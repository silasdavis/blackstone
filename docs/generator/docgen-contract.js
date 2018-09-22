//Usage: node docgen-contract.js <file>, e.g. `node docgen-contract.js /path/to/devDocDirectory`
// node docs/docgen-contract.js docs/docdev > ../docs.agreements.network/content/smart_contracts.md
// apidoc -i ../middle/routes/ -o ./apidoc && apidocjs-markdown -p apidoc -o ../../docs.agreements.network/content/rest_api.md -t apiDocTemplate.md
const fs = require("fs");
const path = require("path");
const json2md = require("json2md");

var args = process.argv.slice(2);

assembleDocs(args[0]);

function assembleDocs(dir) {
	var contractDocs = [];
	var parsedContracts = {};
	var sortedContracts = {};
	var parsedBundles = {};
  contractDocs.push({h2: "Agreements Network Contracts"});
  contractDocs.push({p: "The Agreements Network suite of smart contracts are solidity based and provide a near no-code solution for most of the users of the Network."});
  contractDocs.push({p: "Below you will find the specifics on how to interact with the smart contracts via solidity based CALLS. These calls can be managed in a variety of ways, from other smart contracts or from various non-blockchain clients."});
	var files = readDirR(dir);
	for (f in files) {
		var filePath = files[f];
		var baseName = path.basename(filePath, path.extname(filePath));
		var bundle = path.basename(path.dirname(filePath));
		if (baseName in parsedContracts) {
			continue;
		}
	  parsedContracts[baseName] = {"path": filePath, "bundle": bundle};
		parsedBundles[bundle] = [];
	}
	Object.keys(parsedContracts).sort().forEach(function(key) {
	  sortedContracts[key] = parsedContracts[key];
	});
	for (var c in sortedContracts) {
		parsedBundles[sortedContracts[c]["bundle"]].push({"name": c, "path": sortedContracts[c]["path"]});
	}
	for (var b in parsedBundles) {
		contractDocs.push({h2: b});
		for (var c in parsedBundles[b]) {
			if (parsedBundles[b][c] != null) {
			  contractDocs.push(createMarkdown(b, parsedBundles[b][c]["name"], parsedBundles[b][c]["path"]));
			}
		}
	}
	console.log(json2md(contractDocs));
}

function readDirR(dir) {
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
    : dir;
}

/**
 * Creates and outputs the markdown content for the given devdoc JSON object
 * @param devDoc
 */
function createMarkdown(bundle, baseName, filePath) {
	var binFile = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	var result = [];
	var devDoc = binFile.Devdoc
	if (devDoc.methods && Object.keys(devDoc.methods).length > 0) {
		var contractName = "";
		if (devDoc.title) {
			contractName=(devDoc.title);
		} else {
			contractName=(baseName + " Interface");
		}
		result.push({h3: contractName});
		result.push({p: "The " + contractName + " contract is found within the " + bundle + " bundle."})
		for (var key in devDoc.methods) {
			result.push(createDetailsPanel(key, devDoc.methods[key]));
			result.push({p: "---"});
		}
	}
	return result;
}

/**
 * Creates an object that lists the details of the specified function name and method object.
 * @param name string
 * @param method an object
 * @returns
 */
function createDetailsPanel(name, method) {
	var content = [];
	if (name) {
		content.push({h4: name});
		content.push({p: "**" + name + "**"});
	}
	if (method.details) {
		content.push({p: method.details});
	}
	if (name) {
		content.push({ code: { "language": "endpoint", "content": "CALL " + name } });
	}
	if (method.params) {
		content.push({h4: "Parameters"});
		content.push({ code: { "language": "solidity", "content": processParameters(method.params)}})
	}
	if (method.return) {
		content.push({h4: "Return"});
		content.push({ code: { "language": "json", "content": method.return.replace(/\s\s+/g, "\n") } });
	}
	return content;
}

function processParameters(params) {
	var value = "";
	for (var key in params) {
		value += key + " // " + params[key] + "\n";
	}
	return value
}
