# README
[<img src="https://deploy.stdlib.com/static/images/deploy.svg?" width="192">](https://deploy.stdlib.com/)

---
# Slack App that Sends Automated Birthday Messages to a Channel

<img src= "./images/Heading.png" width="400">

Teammate recognition can improve productivity and promote collaboration. An easy and often overlooked way to recognize teammates is by celebrating them on their birthday and letting them know that they are invaluable team members.
In this tutorial, we'll learn to build a Slack App so that your entire team never misses out on the opportunity to celebrate teammates' birthdays.  🙌🏼

# What it does

The Slack app will kick off birthday celebrations **once a day** by posting a message to a specified channel; acknowledging those who were born on that day and month. 
The Slack app template is preprogrammed with two handy commands. Workspace members can quickly query a Google spreadsheet for a list of registered birthdays with:

`/cmd list` - returns all the stored birthdays in a private message visible to the invoking user.

<img src= "./images/1st.png" width="400"> 

Members can also add birthdays to the Spreadsheet directly from Slack using:

`/cmd add <Name> <Birth Month> <Birth Day>` - adds Name, Birth Month, and Birth Day to a Spreadsheet.

For example `/cmd add Andrea Sanchez 12 07`

<img src= "./images/2nd.png" width="400">

---
# Table of Contents

1. [Installation](#installation)
1. [Test Your Slack App](#test-your-workflow)
1. [Changing the Time Interval](#change-the-time-interval)
1. [Shipping to Production](#shipping-to-production) 
1. [Acknowledgements](#acknowledgements)

---

# Installation

Copy this [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1SKw97duf9RG7S6_3XcnQ2jKg7d-vuZfrq8_2rpDIoMQ/edit?usp=sharing) and title it **CompanyBirthdays** or something similar. Make sure it's set up with three fields for `Name` `BirthdayMonth` and `BirthdayDay`. Fill in a few rows with test data as I have done. Make sure to input the current Month and Day for at least one of the rows - we'll need to test run our application before deploying it.

<img src= "./images/3rd.png" width="400">

Great! You're ready to install your Slack app.

---
Click this deploy from Autocode button to quickly set up your project in Autocode.

[<img src="https://deploy.stdlib.com/static/images/deploy.svg?" width="192">](https://deploy.stdlib.com/)

You will be prompted to sign in or create a **free** account. If you have a Standard Library account click **Already Registered** and sign in using your Standard Library credentials.

Give your project a unique name and select **Start API Project from Github**:

<img src= "./images/4th.png" width="400">

Autocode automatically sets up a project scaffold to save your project as an API endpoint.

<img src= "./images/5th.png" width="400">

To deploy your API to the cloud navigate through the `functions/events/scheduler` folders on the left and select `daily.js` file.

<img src= "./images/6th.png" width="400">

Select the red **Account Required** button, which will prompt you to link a Slack and Google sheets account.

<img src= "./images/7th.png" width="400">

Let's start by linking a Slack Resource. 

Select Link **New Resource** to link a new Slack app.

<img src= "./images/9th.png" width="400">

Select **Install Standard Library App**.

<img src= "./images/10th.png" width="400">

You should see an **OAuth** popup. Select the workspace you'd like to install your Slack app in and click **Allow.**

<img src= "./images/11th.png" width="400">

Give your Slack app a name and image if you'd like.

<img src= "./images/12th.png" width="400">

Select **Finish**. The green checkmark confirms that you've linked your Slack account. Next select **Link Resourc** to connect to your Google account through a similar authentication flow.

<img src= "./images/13th.png" width="400">

Once you choose the Google account where you've created your spreadsheet select **Allow**. Find and Select the **CompanyBirthdays** Spreadsheet. Continue to **Finish Linking.**

<img src= "./images/14th.png" width="400">

And finally, follow the instructions to finish linking your Giphy Account to your Standard Library token.

<img src= "./images/15th.png" width="400">

Once you're done linking Slack, Google Sheets and Giphy select **Finished Linking**.

<img src= "./images/16th.png" width="400">

You're now ready to test run the code and verify that you've linked your application to the correct accounts.

---
# Test your Slack App

Select the green **Run Code** button to test your Slack project.

<img src= "./images/17th.png" width="400">

You should see the following message appear in your **#general** channel.

<img src= "./images/18th.png" width="400">

# Deploy your Slack App

To deploy your Slack App select **Deploy API** in the bottom-left of the file manager.

<img src= "./images/19th.png" width="400">

<img src= "./images/20th.png" width="400">

**Your Slack App is live!** It is set to post a message in the **#general** channel every day at **8:00 am PST.** Your Slack App is now available for use in the Slack workspace you authorized it for.
Your Slack app should respond to:

 `/cmd list` returning a list of all the names and their respective birth months and birthdays. Notice the message is only visible to you so that your request won't disturb your workspace.
 
 <img src= "./images/21.png" width="400">
 
 If you'd like to add a birthday to the spreadsheet use /cmd followed by first name, last name, birth month and birthday:

`/cmd add Andrea Sanchez 12 07`

You should receive a confirmation message once you hit enter - the confirmation message is only visible to you :

 <img src= "./images/22.png" width="400">
 
 To verify that the birthday logged you can check your spreadsheet or run /cmd list again:
 
  <img src= "./images/23.png" width="400">

Congrats! Now that your app is live you can return to Autocode and change the channel that the Slack app posts messages to, change the message, change time, etc.

---
# Changing the Time Interval

You will notice that the code is programmed to run at **8:00 am America - Los Angeles time**. To change the time your Slack app posts birthday messages double click on the `daily.js` file and select `Clone API Endpoint.`

  <img src= "./images/27.png" width="400">

Use the API Wizard to select **Scheduler** as your **event source** and then select the frequency you'd like to have your Slack app post inside a channel. Select the **time** and **timezone** and make sure to hit the **Save Endpoint** button.

  <img src= "./images/28.png" width="400">
  
Delete the extra `const result = {};` statement on line 10.

Delete the extra `return result;` statement on line 70 

Select `Save EndPoint`

Autocode automatically saves your new endpoint file as `daily0.js` inside `/scheduler` folder. Delete your first file if you don't want your app to run at both times.
  
  <img src= "./images/29.png" width="400">

Make sure to deploy your app again for the changes to take effect by selecting **Deploy API** in the bottom-left of the file manager.

  <img src= "./images/30.png" width="400">
  
---  
# Shipping to Production

Standard Library has easy dev/prod environment management. If you want to ship to production, visit [build.stdlib.com](build.stdlib.com), find your project and select manage.

  <img src= "./images/31.png" width="400">
  
From the environment management screen, simply click "Ship Release."

  <img src= "./images/32.png" width="400">

Link any necessary resources, specify the version of the release and click `Create Release` to proceed.
That's all you need to do!

---
# Support
Via Slack: [libdev.slack.com](https://libdev.slack.com/)

You can request an invitation by clicking Community > Slack in the top bar on [https://stdlib.com](https://stdlib.com/) 

Via Twitter: [@Sandard Library](https://twitter.com/StandardLibrary)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com) 

# Acknowledgments

Thanks to the Standard Library team and community for all the support and to [Akanksha Kevalramani](http://itsakanksha.com/about.html) for leading a [workshop](https://www.meetup.com/Maker-dev-SD-Chapter/events/267430141/) that inspired this guide.

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).

Happy hacking!
