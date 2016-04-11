//script for digging COS domains
var cosDomainsInTable = document.querySelectorAll('#domains_cos_table .domain-name');
var digString = "http://digwebinterface.com/";
var allCosDomains = [];
var substring1 = "hs-sites.com";
var substring2 = "classic-migration-sandbox";

//function to return all COS domains as an array
function grabCosDomains() {
	for(var i=0; i<cosDomainsInTable.length; i++) {
		var currentDomain = cosDomainsInTable[i].innerHTML;
		if( currentDomain.substring(currentDomain.length-12) != substring1 && currentDomain.substring(0,25) != substring2 ) {
			allCosDomains.push(currentDomain);
		}
	}
	return allCosDomains;
}

//function to add domains into URL
var cosDigFunction = function(e) {
	//in the actual URL in the Dig Web Interface, the URL encoding between domains alternates between %0A and %0D
	//seems to work fine currently
	digString = digString + "?hostnames=" + allCosDomains.join("%0A") + "&type=&colorize=on&ns=resolver&useresolver=8.8.4.4&nameservers=";
	return digString;
}
cosDigFunction(grabCosDomains());

//send the URL back to popup.js
chrome.runtime.sendMessage({ message: digString });