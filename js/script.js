
let attractions;

// fetch data from provided link
fetch('./attractions.json')
    .then(response => response.json())
    .then(data => {
		attractions = data;
		// call filter data on all when the webpage loads, as this is the default
		filterData('all');
	})
	.catch(error => {
		console.error(error);
	});

function filterData(category) {

	// filter attractions by category
	filteredData = attractions.filter(attraction => {
		// if no category given, filter nothing
		if(category === undefined || category === 'all') {
			return attraction;
		}
		else {
			return attraction.Category === category
		}
	});

	// ensure we are not losing attraction data when filtering by category
	if(attractions.length != 60) { console.log('Erased attraction data'); }

	// sort attractions descending by visitor and grab only top 5
	filteredData = filteredData
		.sort((attraction1, attraction2) => {
			if(attraction1.Visitors < attraction2.Visitors) {
				return 1;
			}
			else if(attraction1.Visitors > attraction2.Visitors) {
				return -1;
			}
			else {
				return 0;
			}
		})
		.splice(0, 5);
	 
	// render chart
	renderBarChart(filteredData);
	
}

// grab select element
let element = document.querySelector('#attraction-category');

// append an event listener to THAT element and provide filterData callback
element.addEventListener('change', event => filterData(event.target.value));
