//variables for the buttons
var digCosDomains = document.querySelector('.js-dig-cos-btn'),
	digCmsDomains = document.querySelector('.js-dig-cms-btn'),
	digCosDomainsAuth = document.querySelector('.js-dig-cos-btn.auth'),
	digCmsDomainsAuth = document.querySelector('.js-dig-cms-btn.auth');
var auth = false;

//click listeners for the buttons to execute the content scripts
digCosDomains.addEventListener('click', function(event) {
	chrome.tabs.executeScript({file:"contentScript1.js"});
});
digCmsDomains.addEventListener('click', function(event) {
	chrome.tabs.executeScript({file:"contentScript2.js"});
});
digCosDomainsAuth.addEventListener('click', function(event) {
	auth = true;
	chrome.tabs.executeScript({file:"contentScript1.js"});
});
digCmsDomainsAuth.addEventListener('click', function(event) {
	auth=true;
	chrome.tabs.executeScript({file:"contentScript2.js"});
});

//when the message is received, open the URL
chrome.runtime.onMessage.addListener(function(request, sender) {
	if(auth == true) {
		request.message = request.message + "&trace=on";
	}
	window.open(request.message);
});