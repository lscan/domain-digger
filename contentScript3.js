//for finding number of non-default domains
var numberOfCosDomains = 0;
var numberOfCmsDomains = 0;
var cosDomainsInTable = document.querySelectorAll('#domains_cos_table .domain-name');
var cosSubstring1 = "hs-sites.com";
var cosSubstring2 = "classic-migration-sandbox";

function countCosDomains() {
	for(var i=0; i<cosDomainsInTable.length; i++) {
		var currentDomain = cosDomainsInTable[i].innerHTML;
		if( currentDomain.substring(currentDomain.length-12) != cosSubstring1 && currentDomain.substring(0,25) != cosSubstring2 ) {
			numberOfCosDomains += 1;
		}
	}
	return numberOfCosDomains;
}
countCosDomains();

chrome.runtime.sendMessage({ message: numberOfCosDomains });