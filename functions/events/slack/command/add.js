const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Slack command event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {

  // Store API Responses
  const result = {slack: {}};

  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  result.slack.channel = await lib.slack.conversations['@0.2.5'].info({
    id: `${event.channel_id}`
  });

  console.log(`Running [Slack → Retrieve a User]...`);
  result.slack.user = await lib.slack.users['@0.3.32'].retrieve({
    user: `${event.user_id}`
  });

  await lib.googlesheets.query['@0.3.0'].insert({
    range: `A:C`,
    fieldsets: [
      {
        'Name': `${event.text.split(/\s+/)[0]} ${event.text.split(/\s+/)[1]}`,
        'BirthdayMonth': `${event.text.split(/\s+/)[2]}`,
        'BirthdayDay': `${event.text.split(/\s+/)[3]}`
      }
    ]
  })
  
  await lib.slack.messages['@0.5.11'].ephemeral.create({
    channelId: `${event.channel_id}`,
    userId: `${event.user_id}`,
    text: `Birthday for ${event.text.split(/\s+/)[0]} ${event.text.split(/\s+/)[1]} has been logged! Thank you!`,
    as_user: false
  })
  
  return result;

};