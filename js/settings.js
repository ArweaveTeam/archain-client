// Saves options to chrome.storage
function save_options() {
	var pub = document.getElementById('pubkey').value;
	var priv = document.getElementById('privkey').value;
	chrome.storage.sync.set({
		"pubkey": pub,
		"privkey": priv
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'New wallet details saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		"pubkey": '',
		"privkey": ''
	}, function(settings) {
		document.getElementById('pubkey').value = settings.pubkey;
		//document.getElementById('privkey').value = settings.privkey;
	});
	document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);
