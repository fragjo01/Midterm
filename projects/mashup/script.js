const circuitImageData = {
    "Adelaide Street Circuit": "Adelaide_(long_route).svg",
    "Ain Diab": "Ain-Diab.svg",
    "Aintree": "Circuit_Aintree.svg",
    "Albert Park Grand Prix Circuit": "Albert_Park_Circuit_2021.svg",
    "Circuit of the Americas": "Austin_circuit.svg",
    "Scandinavian Raceway": "Scandinavian_Raceway_1978.svg",
    "AVUS": "Circuit_AVUS.svg",
    "Bahrain International Circuit": "Bahrain_International_Circuit--Grand_Prix_Layout.svg",
    "Baku City Circuit": "Baku_Formula_One_circuit_map.svg",
    "Circuito da Boavista": "Boavista_(Oporto).svg",
    "Brands Hatch": "Brands_Hatch_1976-1987.svg",
    "Circuit Bremgarten": "Dijon-Prenois_Circuit.svg",
    "Buddh International Circuit": "Buddh_Circuit_1.svg",
    "Circuit de Barcelona-Catalunya": "Circuit_de_Catalunya_moto_2021.svg",
    "Charade Circuit": "Circuit_Charade_1958_1988.png",
    "Fair Park": "Circuit_Fair_Park.svg",
    "Detroit Street Circuit": "Downtown_Detroit_Street_Circuit.svg",
    "Dijon-Prenois": "Dijon-Prenois_Circuit.svg",
    "Donington Park": "Donington_as_of_2006.svg",
    "Rouen-Les-Essarts": "Rouen_track_layout_1955-1971.gif",
    "Autódromo do Estoril": "Autódromo_de_Estoril_1994-1999.png",
    "Fuji Speedway": "Fuji.svg",
    "Autódromo Juan y Oscar Gálvez": "Autódromo_Oscar_y_Juan_Gálvez_Circuito_N°_6_por_Senna.svg",
    "Prince George Circuit": "Prince_George_Circuit.svg",
    "Hockenheimring": "Hockenheim2012.svg",
    "Hungaroring": "Hungaroring.svg",
    "Autodromo Enzo e Dino Ferrari": "Imola_2009.svg",
    "Indianapolis Motor Speedway": "Indianapolis_Oval.svg",
    "Autódromo José Carlos Pace": "Autódromo_José_Carlos_Pace_(AKA_Interlagos)_track_map.svg",
    "Istanbul Park": "Istanbul_park.svg",
    "Long Beach": "Long_Beach_1983.jpg",
    "Circuit Paul Ricard": "Le_Castellet_circuit_map_Formula_One_2019_and_2021_with_corner_names_English_19_07_2021.svg",
    "Circuit Gilles Villeneuve": "Île_Notre-Dame_(Circuit_Gilles_Villeneuve).svg",
    "Watkins Glen": "Watkins_Glen_1975-1983.png",
    "Circuit Park Zandvoort": "Zandvoort_Circuit.png",
    "Zolder": "Circuit_Zolder-1975-1985.svg",
    "Nürburgring": "Nürburgring_-_Grand-Prix-Strecke.svg",
    "Sepang International Circuit": "Sepang.svg",
    "Suzuka Circuit": "Suzuka_circuit_map--2005.svg",
    "Marina Bay Street Circuit": "Marina_Bay_Street_Circuit.svg",
    "Miami International Autodrome": "Hard_Rock_Stadium_Circuit_2022.svg",
    "Circuit de Monaco": "Monte_Carlo_Formula_1_track_map.svg",
    "Autodromo Nazionale di Monza": "Monza_track_map.svg",
    "Red Bull Ring": "Spielberg_bare_map_numbers_contextless_2021_corner_names.svg",
    "Autódromo Hermanos Rodríguez": "Rodriguez_Circuit.svg",
    "Silverstone Circuit": "Silverstone_Circuit_2020.png",
    "Circuit de Spa-Francorchamps": "Spa-Francorchamps_of_Belgium.svg",
    "Yas Marina Circuit": "Yas_Marina_Circuit.svg" ,
	"Jeddah Corniche Circuit": "Jeddah_Street_Circuit_2021.svg",
	"Losail International Circuit": "Lusail_International_Circuit_2023.svg",
	"Autódromo Hermanos Rodríguez": "Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg",
	"Las Vegas Strip Street Circuit": "Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace_%28AKA_Interlagos%29_track_map.svg",
	"Yas Marina Circuit": "Yas_Marina_Circuit.png",
	"Autódromo Internacional do Algarve": "Aut%C3%B3dromo_do_Algarve_F1_Sectors.svg",
	"Reims-Gueux": "Le_Castellet_circuit_map_Formula_One_2019_and_2021_with_corner_names_English_19_07_2021.svg",
	"Riverside International Raceway": "Austin_circuit.svg",
	"Kyalami": "Kyalami_1992_Layout.png",
	"Autodromo Enzo e Dino Ferrari": "Imola.svg",
	"Circuit de Nevers Magny-Cours": "Le_Castellet_circuit_map_Formula_One_2019_and_2021_with_corner_names_English_19_07_2021.svg",
	"Shanghai International Circuit": "Shanghai_International_Racing_Circuit_track_map.svg",
	"Marina Bay Street Circuit": "Marina_Bay_circuit_2023.svg",
	"Sochi Autodrom": "Circuit_Sochi.svg",

};

document.getElementById('fetchRacesButton').addEventListener('click', async () => {
    const season = document.getElementById('seasonInput').value;
	

    if (!season || isNaN(season) || season < 1950 || season > 2024) {
		let feedback = document.getElementById("feedbackMessage");
		feedback.textContent = "Please enter a valid season year, between 1950 and 2024.";
        document.getElementById('seasonInput').value = '';
        return;
    }else {
		let feedback = document.getElementById("feedbackMessage");
		feedback.textContent = "";
	}

    sessionStorage.setItem('season', season);

    try {
        const response = await fetch(`https://ergast.com/api/f1/${season}.json`);
        const data = await response.json();

        const races = data.MRData.RaceTable.Races;
        const raceTableBody = document.querySelector('#raceTable tbody');
        raceTableBody.textContent = ''; 

        if (races.length === 0) {
            const noRaceRow = document.createElement('tr');
            const noRaceCell = document.createElement('td');
            noRaceCell.setAttribute('colspan', '5');
            noRaceCell.textContent = 'No races found for this season.';
            noRaceCell.classList.add('has-text-centered', 'notification');

            Row.appendChild(emptyCell);
            raceTableBody.appendChild(emptyRow);
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
            detailsButton.dataset.race = race.raceName;
            detailsButton.dataset.circuit = race.Circuit.circuitName;
            detailsButton.dataset.country = race.Circuit.Location.country;
            detailsButton.textContent = 'More Info';

            detailsButtonCell.appendChild(detailsButton);
            row.appendChild(detailsButtonCell);

            raceTableBody.appendChild(row);
        });

        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const season = event.target.getAttribute('data-season');
                const round = event.target.getAttribute('data-round');
                const raceName = event.target.getAttribute('data-race');
                const circuitName = event.target.getAttribute('data-circuit');
                const country = event.target.getAttribute('data-country');

                const detailsRow = event.target.closest('tr').nextElementSibling;
                if (detailsRow && detailsRow.classList.contains('details-row')) {
                    detailsRow.remove();
                } else {
                    await fetchRaceDetails(season, round, circuitName, raceName, country, event.target.closest('tr'));
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

async function fetchRaceDetails(season, round, circuitName, raceName, country, parentRow) {
    try {
		//Fetch 
        const resultsResponse = await getData(`https://ergast.com/api/f1/${season}/${round}/results.json`);
        const resultsData = JSON.parse(resultsResponse);
        const results = resultsData.MRData.RaceTable.Races[0]?.Results || [];

        const qualifyingResponse = await getData(`https://ergast.com/api/f1/${season}/${round}/qualifying.json`);
        const qualifyingData = JSON.parse(qualifyingResponse);
        const qualifyingResults = qualifyingData.MRData.RaceTable.Races[0]?.QualifyingResults || [];

        const trackInfoResponse = await getData(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(raceName)}&format=json&origin=*`);
        const trackInfoData = JSON.parse(trackInfoResponse);
		console.log(trackInfoData);
		
        const htmlText = trackInfoData.parse.text['*'];
        const lookfor = /Circuit length<\/th><td class="infobox-data">([\d.]+)<span class="nowrap">&#160;<\/span>km/i;
        const match = htmlText.match(lookfor);
        let circuitLength = '';
        if (match) {
            circuitLength = match[1];
        }

        let trackImage = '';
        const images = trackInfoData.parse.images;
		console.log(images);
        const circuitImageName = circuitImageData[circuitName];
		console.log(circuitName);
        for (const image of images) {
            if (image.includes(circuitImageName)) {
                trackImage = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(circuitImageName)}`;
				
            }
        }

		if (country == 'UK'){
			country = 'GB';
		}
        const countryDataResponse = await getData(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
        const countryData = JSON.parse(countryDataResponse);
        const flagUrl = countryData[0].flags.png;

        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('details-row');

        const detailsCell = document.createElement('td');
        detailsCell.setAttribute('colspan', '5');

        const container = document.createElement('div');
        container.classList.add('columns', 'is-desktop');

        // Track Info Column
        const trackInfoContainer = document.createElement('div');
        trackInfoContainer.classList.add('column', 'is-one-third');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('circuit-title');
        const circuitText = document.createElement('span');
        circuitText.textContent = circuitName + ' ';
        const flagImg = document.createElement('img');
        flagImg.src = flagUrl;
        flagImg.classList.add('image', 'is-24x24');
        flagImg.alt = 'National Flag';
        titleDiv.appendChild(circuitText);
        titleDiv.appendChild(flagImg);
        trackInfoContainer.appendChild(titleDiv);

        const circuitImgDiv = document.createElement('div');
        circuitImgDiv.classList.add('circuit-image');
        const circuitImg = document.createElement('img');
        circuitImg.src = trackImage;
        circuitImg.classList.add('image', 'is-128x128');
        circuitImg.alt = 'Circuit Image';
        circuitImgDiv.appendChild(circuitImg);
        trackInfoContainer.appendChild(circuitImgDiv);

        const trackLengthDiv = document.createElement('div');
        trackLengthDiv.textContent = `Track Length: ${circuitLength} km`;
        trackInfoContainer.appendChild(trackLengthDiv);

        container.appendChild(trackInfoContainer);

        // Qualifying Column
        const qualifyingContainer = document.createElement('div');
        qualifyingContainer.classList.add('column', 'is-one-third');
        const qualifyingHeaderDiv = document.createElement('div');
        qualifyingHeaderDiv.textContent = 'Qualifying Top 3';
        qualifyingContainer.appendChild(qualifyingHeaderDiv);
        const qualifyingListDiv = document.createElement('div');
        qualifyingListDiv.id = 'qualifyingList';
        qualifyingContainer.appendChild(qualifyingListDiv);

        if (qualifyingResults.length > 0) {
            qualifyingResults.slice(0, 3).forEach(result => {
                const li = document.createElement('li');
                li.textContent = `${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name}) - Position: ${result.position}`;
                qualifyingListDiv.appendChild(li);
            });
        } else {
            const noQualifyingData = document.createElement('div');
            noQualifyingData.textContent = 'No qualifying results documented for this race.';
            qualifyingListDiv.appendChild(noQualifyingData);
        }

        container.appendChild(qualifyingContainer);

        // Race Column
        const raceContainer = document.createElement('div');
        raceContainer.classList.add('column', 'is-one-third');
        const raceHeaderDiv = document.createElement('div');
        raceHeaderDiv.textContent = 'Race Top 3';
        raceContainer.appendChild(raceHeaderDiv);
        const raceListDiv = document.createElement('div');
        raceListDiv.id = 'raceList';
        raceContainer.appendChild(raceListDiv);

        if (results.length > 0) {
            results.slice(0, 3).forEach(result => {
                const li = document.createElement('li');
                li.textContent = `${result.Driver.givenName} ${result.Driver.familyName} (${result.Constructor.name}) - Position: ${result.position}`;
                raceListDiv.appendChild(li);
            });
        } else {
            const noRaceData = document.createElement('div');
            noRaceData.textContent = 'No race results documented for this event.';
            raceListDiv.appendChild(noRaceData);
        }

        container.appendChild(raceContainer);

        detailsCell.appendChild(container);
        detailsRow.appendChild(detailsCell);

        parentRow.parentNode.insertBefore(detailsRow, parentRow.nextSibling);

    } catch (error) {
        console.error('Error fetching race details:', error);
        alert('Error fetching race details. Please try again later.');
    }
}

window.onload = function () {
    const storedSeason = sessionStorage.getItem('season');
    if (storedSeason) {
        document.getElementById('seasonInput').value = storedSeason;
    }
};