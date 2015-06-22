

var ical = require('ical-generator'),
	personName = 'DUDE', // used as filename of the ical output file, be careful
	firstNonWorkingDay = '2015/06/20',
	daysBlock = 3, // how many contiguos days, even blocks of work / non work
	cal = ical({
		name: personName + ' Non Working Days'
	}),
	startDate = new Date(firstNonWorkingDay),
	endDate = addDays(startDate, daysBlock),
	targetYear = 2015,
	year = targetYear,
	totalEvents = 0;


// console.log('Start Date:', startDate);
// console.log('End Date:', endDate);
// return;

// create events for selected year
console.log('+ creating events...');
while(year === targetYear) {
	//if (totalEvents >= 10) break; // TODO: remove after testing

	cal.createEvent({
		start: startDate,
		end: endDate,
		summary: personName + ' is not working today.',
		description: 'Coffee & Bikes? Hack something?',
		location: 'Buenos Aires'
	});

	// set next start and end dates
	startDate = addDays(startDate, daysBlock*2);
	endDate = addDays(startDate, daysBlock);

	// get year for next start date
	year = startDate.getFullYear();
	++totalEvents;

	console.log('+ event created: from ' + startDate.toDateString() +
				' to ' + endDate.toDateString());
}

console.log('-- total events created: ' + totalEvents);

// save ical file
cal.save(personName + '.ical');
console.log('DONE.');

//-----------------------------------------------------------------

/**
 * Add passed amount of days to passed date object.
 * 
 * @param {Date} date
 * @param {int} days how many days to add to date object
 */
function addDays(date, days) {
	var resultDate = new Date(new Date(date).setDate(date.getDate() + days));
	return resultDate;
}
