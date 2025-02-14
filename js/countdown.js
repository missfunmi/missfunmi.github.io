// To use, include query params 'date' and 'event' in the URL path. Valid examples:
//  ?date=Jun 3, 2023&event=Race Day
//  ?date=Sat,%2023%20Sept%202023%2005:00:00%20-4&event=Ironman%2070.3%20New%20York (per legacy ES5 date format: https://stackoverflow.com/a/51715260)
function updateTimer() {
  // Parse input
  queryParams = location.search.split("?date=")[1].split("&event="); // Should look something like: Array [ "Jun%203,%202023", "Race%20Day" ]
  countdownTargetDate = queryParams[0].replaceAll("%20", " ");
  countdownTargetDateInMs = Date.parse(countdownTargetDate);
  countdownEventName = queryParams[1].replaceAll("%20", " ");

  // Generate countdown timer
  now = new Date();
  timeUntilInMs = countdownTargetDateInMs - now;

  weeksUntil = Math.floor(timeUntilInMs/(7 * 24 * 60 * 60 * 1000));
  
  daysUntil = Math.floor(timeUntilInMs/(24 * 60 * 60 * 1000));
  daysUntilLessWeeks = (weeksUntil > 0) ? (daysUntil % weeksUntil) : daysUntil;

  hoursUntil = Math.floor(timeUntilInMs/(60 * 60 * 1000))
  hoursUntilLessDays = hoursUntil - (daysUntil * 24)

  // Update page title and meta tags
  updatedPageTitle = "Countdown to " + countdownEventName;
  updatedPageDescription = "A countdown timer to " + countdownEventName;

  document.title = updatedPageTitle;
  document.querySelector('meta[property="og:title"]').setAttribute('content', updatedPageTitle);
  
  document.querySelector('meta[name="description"]').setAttribute('content', updatedPageDescription);
  document.querySelector('meta[property="og:description"]').setAttribute('content', updatedPageDescription);

  // Inject event name and countdown into page
  document.getElementById("event-name").innerHTML = countdownEventName;
  
  document.getElementById("timer").innerHTML =
    timeUntilInMs > 0
      ? "<div>" + weeksUntil + "<span>Weeks</span></div>" +
        "<div>:<span>&nbsp;</span></div>" +
        "<div>" + daysUntilLessWeeks + "<span>Days</span></div>" + 
        "<div>:<span>&nbsp;</span></div>" +
        "<div>" + hoursUntilLessDays + "<span>Hours</span></div>" +
        "<div class='days-only'>Or " + daysUntil + "&nbsp;days...</div>"
      : "<div class='days-only'>Your timer ran out on</div><div>" + countdownTargetDate + "</div></div>" 
        + "<div class='days-only'>Hope you crushed it! 😃</div>";
}
