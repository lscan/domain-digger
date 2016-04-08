//script for digging COS domains
var cosDomainsInTable = document.querySelectorAll('#domains_cos_table .domain-name');
var digString = "http://digwebinterface.com/";
var allCosDomains = [];

//function to return all COS domains as an array
function grabCosDomains() {
	for(var i=0; i<cosDomainsInTable.length; i++) {
		allCosDomains.push(cosDomainsInTable[i].innerHTML);
	}
	return allCosDomains;
}

//function to add domains into URL
var cosDigFunction = function(e) {
	//in the actual URL in the Dig Web Interface, the URL encoding between domains alternates between %0A and %0D
	//if this doesn't work I'll write another function to clean that up
	digString = digString + "?hostnames=" + allCosDomains.join("%0A") + "&type=&colorize=on&ns=resolver&useresolver=8.8.4.4&nameservers=";
	return digString;
}
cosDigFunction(grabCosDomains());

//send the URL back to popup.js
chrome.runtime.sendMessage({ message: digString});