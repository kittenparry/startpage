document.getElementById('search-input').addEventListener('input', e => {
	let key = e.target.value;
	let list = [];

	if (Object.keys(dict_sites).includes(key)) {
		list.push(`${get_key_by_val(dict_sites, dict_sites[key])}:\t${dict_sites[key]}`);
	} else if (key.split(' ')[0] == 'r' || key.split(' ')[0] == 'rn') {
		let skey = key.split(' ');
		let sub = '';
		let pre = '';
		if (skey[0] == 'rn') {
			pre = 'reddit:new/';
		} else {
			pre = 'reddit/';
		}
		if (skey[1]) {
			if (Object.keys(dict_reddit).includes(skey[1])) {
				sub = dict_reddit[skey[1]];
			} else {
				sub = skey[1];
			}
			list.push(`${pre}${sub}`);
		} else {
			list.push(`${pre}..`);
		}
	} else if (key == '') {

	} else {
		list.push(`search:\t${key}`);
	}

	let body = '';
	list.forEach(el => {
		body += `<li>${el}</li>`;
	});
	document.getElementById('search-suggestions').innerHTML = body;
});

// if exists in the dictionary, visit the website on enter
// else if starts with r or rn, check reddit dictionary
// else visit the written sub,
// else search on duckduckgo
document.getElementById('search-form').addEventListener('submit', e => {
	e.preventDefault();
	let key = document.getElementById('search-input').value;

	try {
		if (Object.keys(dict_sites).includes(key)) {
			window.location = `https://${dict_sites[key]}`;
		} else if (key.split(' ')[0] == 'r' || key.split(' ')[0] == 'rn') {
			let skey = key.split(' ');
			let app = '';
			if (skey[0] == 'rn') {
				app = 'new';
			}
			let sub = '';
			if (skey[1]) {
				if (Object.keys(dict_reddit).includes(skey[1])) {
					sub = dict_reddit[skey[1]];
				} else {
					sub = skey[1];
				}
				window.location = `https://www.reddit.com/r/${sub}/${app}`;
			}
		} else if (key == '') {

		} else {
			window.location = `http://duckduckgo.com/?q=${key}`;
		}
	} catch (e) {
		console.log(e);
	}
});

// focus on input when clicked anywhere on body
document.body.addEventListener('click', e => {
	document.getElementById('search-input').focus();
});

// input: url
dict_sites = {
	'4': '4chan.org',
	'd': 'drive.google.com',
	'e': 'en.metal-tracker.com',
	'g': 'github.com',
	'gm': 'gmail.com',
	'i': 'instagram.com',
	'k': 'keep.google.com',
	'r': 'reddit.com',
	'ra': 'rarbg.to/torrents.php?category=2;4',
	's': 'store.steampowered.com',
	't': 'twitch.tv',
	'tr': 'trakt.tv',
	'y': 'youtube.com',
};

// input: sub
dict_reddit = {
	'2': '2meirl4meirl',
	'c': 'coolgithubprojects',
	'd': 'Dota2',
	'da': 'DataHoarder',
	'f': 'Fay_Suicide',
	'k': 'KaylaErinCosplay',
	's': 'suicidegirls',
	'u': 'unixporn',
};

// print sites to the view
pump_sites = () => {
	let dom_sites = document.getElementById('list-sites');
	let dom_subs = document.getElementById('list-subs');

	let list_sites = `<table><th colspan='2'>sites</th>`;
	for (key in dict_sites) {
		let site = '';
		// different split for metal-tracker and steam
		if (key == 'e' || key == 's') {
			site = dict_sites[key].split('.')[1];
		} else {
			site = dict_sites[key].split('.')[0]
		}
		list_sites += `<tr><td>${key}:</td><td>${site}</td></tr>`;
	}
	list_sites += '</table>';
	dom_sites.innerHTML = list_sites;

	list_subs = `<table><th colspan='2'>reddit</th>`;
	for (key in dict_reddit) {
		let sub = dict_reddit[key];
		list_subs += `<tr><td>${key}:</td><td>${sub}</td></tr>`;
	}
	list_subs += '</table>';
	dom_subs.innerHTML = list_subs;
};

// return key of the object
get_key_by_val = (obj, val) => {
	return Object.keys(obj).find(key => obj[key] === val);
};

pump_sites();
