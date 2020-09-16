
let attractions;

// fetch data from provided link
fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d7f28c1-b3cb-41cc-b1ab-c42f5b62beeb/attractions.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200916T170255Z&X-Amz-Expires=86400&X-Amz-Signature=511c79a0b253f89b7ae0f0ef619fa8d4377553fc39e1ea3efcc41c204fa794d7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22attractions.json%22')
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
