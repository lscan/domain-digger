//script for digging CMS domains
var cmsDomainsInTable = document.querySelectorAll('#domains_cms_table .domain-name');
var digString = "http://digwebinterface.com/";
var allCmsDomains = [];
//need to double-check the default names (I tried by memory while on train)
var substring1 = "hs-sites.com";
//if there's a way to do this using 1 RegExp so help me god
var exp1 = /web\d[.]hubspot[.]com/;
var exp2 = /web\d[0-3][.]hubspot[.]com/;
var exp3 = /web\d[0-3]\d[.]hubspot[.]com/;

//function to return all CMS domains as an array
function grabCmsDomains() {
	for(var i=0; i<cmsDomainsInTable.length; i++) {
		var currentDomain = cmsDomainsInTable[i].innerHTML;
		if( currentDomain.substring(currentDomain.length-11) != substring1 && exp1.test(currentDomain) == false && exp2.test(currentDomain) == false && exp3.test(currentDomain) == false ) {
			allCmsDomains.push(currentDomain);
		}
	}
	return allCmsDomains;
}

//function to add domains into URL
var cmsDigFunction = function(e) {
	//in the actual URL in the Dig Web Interface, the URL encoding between domains alternates between %0A and %0D
	//seems to work fine currently
	digString = digString + "?hostnames=" + allCmsDomains.join("%0A") + "&type=&colorize=on&ns=resolver&useresolver=8.8.4.4&nameservers=";
	return digString;
}
cmsDigFunction(grabCmsDomains());

//send the URL back to popup.js
chrome.runtime.sendMessage({ message: digString });