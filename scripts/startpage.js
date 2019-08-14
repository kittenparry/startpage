document.getElementById('search-input').addEventListener('input', e => {
	let key = e.target.value;
	let list = [];
	let result = [];

	if (Object.keys(dict_services).includes(key)) {
		result.push(get_key_by_val(dict_services, dict_services[key]));
		result.push(dict_services[key].split('|')[0], dict_services[key].split('|')[1]);

		list.push(`${result[0]}:\t${result[1]} (${result[2]})`);
	} else if (Object.keys(dict_sites).includes(key)) {
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

// if exists in services, split out url and visit
// if exists in links, visit the url
// else if starts with r or rn, check reddit dictionary
// else visit the written sub,
// else search on duckduckgo
document.getElementById('search-form').addEventListener('submit', e => {
	e.preventDefault();
	let key = document.getElementById('search-input').value;

	try {
		if (Object.keys(dict_services).includes(key)) {
			let url = dict_services[key].split('|')[1];
			window.location = `${url}`;
		} else if (Object.keys(dict_sites).includes(key)) {
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

// print sites to the view
pump_sites = () => {
	let dom_services = document.getElementById('list-services');
	let dom_sites = document.getElementById('list-sites');
	let dom_subs = document.getElementById('list-subs');

	let list_services = `<ul>`;
	for (key in dict_services) {
		let service = '';

		service = dict_services[key].split('|')[0];

		list_services += `<li><span class="key">${key}:</span>${service}</li>`;
	}
	list_services += '</ul>';
	dom_services.innerHTML += list_services;

	let list_sites = `<ul>`;
	for (key in dict_sites) {
		let site = '';
		// different split for metal-tracker and steam
		if (key == 'e' || key == 's') {
			site = dict_sites[key].split('.')[1];
		} else {
			site = dict_sites[key].split('.')[0]
		}
		list_sites += `<li><span class="key">${key}:</span>${site}</li>`;
	}
	list_sites += '</ul>';
	dom_sites.innerHTML += list_sites;

	list_subs = `<ul>`;
	for (key in dict_reddit) {
		let sub = dict_reddit[key];
		list_subs += `<li><span class="key">${key}:</span>${sub}</li>`;
	}
	list_subs += '</ul>';
	dom_subs.innerHTML += list_subs;
};

// return key of the object
get_key_by_val = (obj, val) => {
	return Object.keys(obj).find(key => obj[key] === val);
};

pump_sites();
