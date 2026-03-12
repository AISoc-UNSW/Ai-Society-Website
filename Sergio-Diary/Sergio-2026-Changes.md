# Changes to the AI Soc Website
## By Sergio Insuasti - Projects Subcommittee

### Task 1: About Section Update the main photo
![Updated About Section (Photo)](updated-about-photo.webp)

### Task 2: Reinventing the Events Section
To create the admin section where each port can upload events, I used Firebase, which can easily handle authentication, image storage and metadata storage. If we are to continue with my changes, I'll organise the Firebase access such that it will no longer be me, but the AISoc projects email.

For authentication, I made sure to include an accepted regex pattern, which would accept all ports in AISoc's Gmail accounts, and no others. I have however, kept an empty list for regular email addresses to be added if any execs want exclusive access to the page (my email can be seen as an example). You can find this under the variable `allowedTestEmails` in AdminLogin.js.
But more importantly, this login page can only be accessed through the extension "/admin". Once this link is accessed, the user is taken away from the main page and will see this element.
![Screenshot of Admin Page](admin-page.webp)
Colours and aesthetics for the following sections are open to suggestion and further edits.

After the user chooses the correct email (AI Soc gmail account), they will be taken to a Create Event form, which looks like this:
![Empty Create Event Form](empty-event-form.webp)
To submit an event, all fields must be filled in correctly along with a webp image of the banner also. If none of these are filled, the user can log out and will return to the AISoc homepage. Restrictions have also been made to prevent dates in the past be created and only accepting valid urls. 

Take, for example, the upcoming AI Hackathon with Lovable, we would then complete the form as such:
![Completed Event Form](complete-event-form.webp)
Once this form is sent, a number of events take place. First, a message is sent to a chosen Discord Server to alert the Projects team that a new event has been submitted. This ensures that the team is always notified of new changes to the website, and can act quickly if there is any required troubleshooting. For the case of demonstration, I used my own discord server, but this can easily be amended to a custom channel in our port's Discord.
![Discord Ticket](discord-ticket.webp)
Then, the inputs of the form are split in two different sections, the event-banner image and the event's details. Firstly, the image is stored in Storage, a part of Firebase which allows us to use Bucket Storage. For easy recall and minimal conflict, the image is renamed to have the same unique id as the event's details. 
![Image Stored in Firebase Storage](event-banner-storage.webp)
The event's details are then stored as metadata in a JSON object. This is then stored in Firebase's NoSQL database FireStore. Using the same unique id, we can easily recall the event's details to then be placed in each event element in the Events component.
![Metadata Stored in FireStore](event-metadata-storage.webp)
With some tweaks to the Events component, we now can automatically update the website through the Admin Dashboard! A video of the events section can be found in `Uploaded Events.mp4` (in same dir).

### Task 3: Update the Execs Photos
![New Exec Photos](./updated-execs.webp)
I am more than happy to rename the roles (Vice President to VP) but let me know.
If any other staff are needing to be added (VP for HR?) this is also easy to navigate.

### Task 4: Updated Newsletter
![New Newsletter Layout](updated-newsletters.webp)
As requested, I updated the newsletter articles to show the latest posts. I made some titles for the most two recent Turing Point posts, but I am very happy to have someone more experienced to change this. Same goes for the photos too!
Images all formatted to be the same ratio for uniformity, animations kept.

### Task 5: FAQ Section


### Task 6: Sponsor Section



