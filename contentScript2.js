//script for digging CMS domains
var cmsDomainsInTable = document.querySelectorAll('#domains_cms_table .domain-name');
var digString = "http://digwebinterface.com/";
var allCmsDomains = [];

//function to return all CMS domains as an array
function grabCmsDomains() {
	for(var i=0; i<cmsDomainsInTable.length; i++) {
		allCmsDomains.push(cmsDomainsInTable[i].innerHTML);
	}
	return allCmsDomains;
}

//function to add domains into URL
var cmsDigFunction = function(e) {
	//in the actual URL in the Dig Web Interface, the URL encoding between domains alternates between %0A and %0D
	//if this doesn't work I'll write another function to clean that up
	digString = digString + "?hostnames=" + allCmsDomains.join("%0A") + "&type=&colorize=on&ns=resolver&useresolver=8.8.4.4&nameservers=";
	return digString;
}
cmsDigFunction(grabCmsDomains());

//send the URL back to popup.js
chrome.runtime.sendMessage({ message: digString});