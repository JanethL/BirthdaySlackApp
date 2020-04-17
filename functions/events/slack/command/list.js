const lib = require('lib')({
  token: process.env.STDLIB_SECRET_TOKEN
});
/**
 * An HTTP endpoint that acts as a webhook for Slack command event
 * @param {object} event
 * @returns {object} result Your return value
 */
module.exports = async (event) => {
  // Store API Responses
  const result = {
    googlesheets: {},
    slack: {}
  };
  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  result.slack.channel = await lib.slack.conversations['@0.2.5'].info({
    id: `${event.channel_id}`
  });
  console.log(`Running [Slack → Retrieve a User]...`);
  result.slack.user = await lib.slack.users['@0.3.32'].retrieve({
    user: `${event.user_id}`
  });
  console.log(`Running [Google Sheets → Select Rows from a Spreadsheet by querying it like a Database]...`);
  result.googlesheets.selectQueryResult = await lib.googlesheets.query['@0.3.0'].select({
    range: `A:C`,
    bounds: 'FIRST_EMPTY_ROW',
    limit: {
      'count': 0,
      'offset': 0
    }
  });

  var messageArray = [];
  for (var i = 0; i < result.googlesheets.selectQueryResult.rows.length; i++) {
    messageArray.push(`${result.googlesheets.selectQueryResult.rows[i].fields.Name}: ${result.googlesheets.selectQueryResult.rows[i].fields.BirthdayMonth}-${result.googlesheets.selectQueryResult.rows[i].fields.BirthdayDay}`)
  }
  var messageText = messageArray.join('\n');

  console.log(`Running [Slack → Create a new Ephemeral Message from your Bot]...`);
  await lib.slack.messages['@0.5.11'].ephemeral.create({
    channelId: `${event.channel_id}`,
    userId: `${event.user_id}`,
    text: messageText,
    attachments: [],
    blocks: [],
    as_user: false
  })

  return result;
};
