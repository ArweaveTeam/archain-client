function queuePage() {
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
		var tab = arrayOfTabs[0];

		var xhr = new XMLHttpRequest();
		chrome.storage.sync.get({
			"pubkey": '',
			"privkey": ''
		}, function(settings) {
			if((settings.pubkey == "")) {
				alert("Please set your public key on the options page first!");
				return false;
			}
			var urlComp = "url=" + encodeURIComponent(tab.url) + "&pubkey="
				+ encodeURIComponent(settings.pubkey);
			xhr.open("GET", "https://www.archain.org/api/queue?" + urlComp, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					setResult(xhr);
				}
			}
			xhr.send();
		});
	});
}

function setResult(xhr) {
	var res = document.getElementById('result');
	if(xhr.status != 200) {
		res.innerHTML = "<div style='width: 150px;'><center><b>Error "
			+ "submitting page!</center></div>";
		return;
	}
	res.innerHTML = "<div style='width: 150px;'><center><b>Done.</b><br>"
		+ xhr.responseText + " pages in your queue.</center></div>";	
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("queue-btn").addEventListener("click", queuePage);
});
