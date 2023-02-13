// To use, include query params 'date' and 'event' in the URL path. Valid examples:
//  ?date=Jun 3, 2023&event=Race Day
//  ?date=Sat,%2023%20Sept%202023%2005:00:00%20-4&event=Ironman%2070.3%20New%20York (per legacy ES5 date format: https://stackoverflow.com/a/51715260)
function updateTimer() {
  // Parse input
  queryParams = (location.search.split("?date=")[1]).split("&event="); // Should look something like: Array [ "Jun%203,%202023", "Race%20Day" ]
  countdownTargetDateInMs = Date.parse(queryParams[0].replaceAll("%20"," "));
  countdownEventName = queryParams[1].replaceAll("%20"," ");

  // Generate countdown timer
  now = new Date();
  timeUntilInMs = countdownTargetDateInMs - now;

  weeksUntil = Math.floor(timeUntilInMs/(7 * 24 * 60 * 60 * 1000));
  
  daysUntil = Math.floor(timeUntilInMs/(24 * 60 * 60 * 1000));
  daysUntilLessWeeks = (weeksUntil > 0) ? (daysUntil % weeksUntil) : daysUntil;

  hoursUntil = Math.floor(timeUntilInMs/(60 * 60 * 1000))
  hoursUntilLessDays = hoursUntil - (daysUntil * 24)

  // Inject event name and countdown into page
  document.getElementById("event-name").innerHTML = countdownEventName;

  document.getElementById("timer").innerHTML =
    '<div>' + weeksUntil + '<span>Weeks</span></div>' +
    '<div>:<span>&nbsp;</span></div>' +
    '<div>' + daysUntilLessWeeks + '<span>Days</span></div>' +
    '<div>:<span>&nbsp;</span></div>' +
    '<div>' + hoursUntilLessDays + '<span>Hours</span></div>';
}
