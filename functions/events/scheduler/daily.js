const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

  /**
  * An HTTP endpoint that acts as a webhook for Scheduler daily event
  * @returns {object} result Your return value
  */
  module.exports = async () => {
      
  // Store API Responses
const result = {googlesheets: {}, slack: {}};
  
      const momentTimezone = require('moment-timezone');
      let date = momentTimezone().tz('America/Los_Angeles'); //sets the timezone of the date object to 'America/Los_Angeles'
      let today_day = date.format('D'); //return the day 1, 2, 3, ... 31
      let today_month = date.format('M'); // return the month 1, 2, 3.. 12
  
      console.log(date);
      console.log(today_day);
      console.log(today_month);
      
      console.log(`Running [Google Sheets → Select Rows from a Spreadsheet by querying it like a Database]...`);
      result.googlesheets.selectQueryResult = await lib.googlesheets.query['@0.3.0'].select({
            range: `A:C`,
            bounds: 'FIRST_EMPTY_ROW',
            where: [
                {
                    'Birthday Month': today_month,
                    'Birthday Day': today_day
                }
            ],
            limit: {
                'count': 0,
                'offset': 0
            }
      });
      console.log(result.googlesheets.selectQueryResult);
      if (result.googlesheets.selectQueryResult.rows.length != 0) {
              let names;
              for (let i = 0; i < result.googlesheets.selectQueryResult.rows.length; i++) {
                  if (i == 0) {
                      names = result.googlesheets.selectQueryResult.rows[i].fields["Name"];
                      console.log(names);
                  }
                  else if (i > 0 && i < result.googlesheets.selectQueryResult.rows.length - 1) {
                      names = names + ',' + result.googlesheets.selectQueryResult.rows[i].fields["Name"];
                      console.log(names);
                  }
                  else {
                      names = names + ', and ' + result.googlesheets.selectQueryResult.rows[i].fields["Name"];
                      console.log(names);
                  }
              }
      console.log(`Running [Slack → Send a Message from your Bot to a Channel]...`);
      result.slack.response = await lib.slack.channels['@0.6.6'].messages.create({
          channel: `#general`,
          text: `Happy Birthday ${names}! 🎂 I hope you have a great day!`
      });
      }
        return result;
      };
  