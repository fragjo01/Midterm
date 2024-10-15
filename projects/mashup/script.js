document.getElementById('fetchRacesButton').addEventListener('click', async () => {
    const season = document.getElementById('seasonInput').value;
    if (!season) {
        alert('Please enter a season year');
        return;
    }

    try {
        const response = await fetch(`https://ergast.com/api/f1/${season}.json`);
        const data = await response.json();

        const races = data.MRData.RaceTable.Races;
        const raceTableBody = document.querySelector('#raceTable tbody');
        raceTableBody.innerHTML = ''; 

        if (races.length === 0) {
            raceTableBody.innerHTML = '<tr><td colspan="5">No races found for this season.</td></tr>';
            return;
        }

		races.forEach(race => {
			const row = document.createElement('tr');

			const roundCell = document.createElement('td');
			roundCell.textContent = race.round;
			row.appendChild(roundCell);

			const raceNameCell = document.createElement('td');
			raceNameCell.textContent = race.raceName;
			row.appendChild(raceNameCell);

			const circuitInfoCell = document.createElement('td');
			circuitInfoCell.textContent = `${race.Circuit.circuitName}, ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;
			row.appendChild(circuitInfoCell);

			const dateCell = document.createElement('td');
			dateCell.textContent = race.date;
			row.appendChild(dateCell);

			const detailsButtonCell = document.createElement('td');
			const detailsButton = document.createElement('button');
			detailsButton.classList.add('details-button');
			detailsButton.dataset.season = season;
			detailsButton.dataset.round = race.round;
			detailsButton.dataset.circuit = race.Circuit.circuitName;
			detailsButton.dataset.country = race.Circuit.Location.country;
			detailsButton.textContent = 'More Info'; // Set button text

			detailsButtonCell.appendChild(detailsButton);
			row.appendChild(detailsButtonCell);

			raceTableBody.appendChild(row);
		});


        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const season = event.target.getAttribute('data-season');
                const round = event.target.getAttribute('data-round');
                const circuitName = event.target.getAttribute('data-circuit');
                const country = event.target.getAttribute('data-country');

                const detailsRow = event.target.closest('tr').nextElementSibling;
                if (detailsRow && detailsRow.classList.contains('details-row')) {
                    detailsRow.remove();
                } else {
                    await fetchRaceDetails(season, round, circuitName, country, event.target.closest('tr'));
                }
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching race data. Please try again later.');
    }
});

async function getData(url) {
    return fetch(url)
        .then(response => response.text())
        .catch(error => console.error(error));
}

async function fetchRaceDetails(season, round, circuitName, country, parentRow) {
    try {
        const resultsResponse = await getData(`https://ergast.com/api/f1/${season}/${round}/results.json`);
        const resultsData = JSON.parse(resultsResponse);
        const results = resultsData.MRData.RaceTable.Races[0].Results;

        const qualifyingResponse = await getData(`https://ergast.com/api/f1/${season}/${round}/qualifying.json`);
        const qualifyingData = JSON.parse(qualifyingResponse);
        const qualifyingResults = qualifyingData.MRData.RaceTable.Races[0].QualifyingResults;

        const trackInfoResponse = await getData(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(circuitName)}&format=json&prop=text&section=0&origin=*`);
        const trackInfoData = JSON.parse(trackInfoResponse);

        const trackHTML = trackInfoData.parse.text['*'];
        const parser = new DOMParser();
        const doc = parser.parseFromString(trackHTML, 'text/html');

        const infobox = doc.querySelector('table.infobox');
        let trackLength = 'N/A';
        let trackImage = '';

        if (infobox) {
            const rows = infobox.querySelectorAll('tr');
            rows.forEach(row => {
                const header = row.querySelector('th');
                const data = row.querySelector('td');
                
                if (header && data) {
                    if (header.textContent.includes('Length') || header.textContent.includes('Track length')) {
                        trackLength = data.textContent.trim();
                    }
                }
            });

            const imageElement = infobox.querySelector('img.mw-file-element');
            trackImage = imageElement ? `https:${imageElement.src}` : '';
        }

        const countryDataResponse = await getData(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
        const countryData = JSON.parse(countryDataResponse);
        const flagUrl = countryData[0].flags.png; // Access flag URL

		const detailsRow = document.createElement('div');
		detailsRow.classList.add('details-row');

		const trackInfoContainer = document.createElement('div');

		const titleDiv = document.createElement('div');
		titleDiv.classList.add('circuit-title');

		const circuitText = document.createElement('span');
		circuitText.textContent = circuitName + ' ';

		const flagImg = document.createElement('img');
		flagImg.src = flagUrl;
		flagImg.classList.add('flag');
		flagImg.alt = 'National Flag';

		titleDiv.appendChild(circuitText);
		titleDiv.appendChild(flagImg);
		trackInfoContainer.appendChild(titleDiv);

		const circuitImgDiv = document.createElement('div');
		circuitImgDiv.classList.add('circuit-image');

		const circuitImg = document.createElement('img');
		circuitImg.src = trackImage;
		circuitImg.classList.add('circuit-img');
		circuitImg.alt = 'Circuit Image';

		circuitImgDiv.appendChild(circuitImg);
		trackInfoContainer.appendChild(circuitImgDiv);

		const trackLengthDiv = document.createElement('div');
		trackLengthDiv.textContent = `Track Length: ${trackLength}`;
		trackInfoContainer.appendChild(trackLengthDiv);

		const qualifyingHeaderDiv = document.createElement('div');
		qualifyingHeaderDiv.textContent = 'Qualifying Top 3';
		trackInfoContainer.appendChild(qualifyingHeaderDiv);

		const qualifyingListDiv = document.createElement('div');
		qualifyingListDiv.id = 'qualifyingList';
		trackInfoContainer.appendChild(qualifyingListDiv);

		const raceHeaderDiv = document.createElement('div');
		raceHeaderDiv.textContent = 'Race Top 3';
		trackInfoContainer.appendChild(raceHeaderDiv);

		const raceListDiv = document.createElement('div');
		raceListDiv.id = 'raceList';
		trackInfoContainer.appendChild(raceListDiv);

		detailsRow.appendChild(trackInfoContainer);

		parentRow.parentNode.insertBefore(detailsRow, parentRow.nextSibling);


        const qualifyingList = detailsRow.querySelector('#qualifyingList');
        qualifyingResults.slice(0, 3).forEach(result => {
            const li = document.createElement('li');
            li.textContent = `${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name}) - Position: ${result.position}`;
            qualifyingList.appendChild(li);
        });

        const raceList = detailsRow.querySelector('#raceList');
        results.slice(0, 3).forEach(result => {
            const li = document.createElement('li');
            li.textContent = `${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name}) - Position: ${result.position}`;
            raceList.appendChild(li);
        });

    } catch (error) {
        console.error('Error fetching race details:', error);
        alert('Error fetching race details. Please try again later.');
    }
}
