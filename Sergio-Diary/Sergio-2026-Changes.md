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
![Updated FAQ Section](updated-faq.webp)
The plan for this section was to continue the reading momentum the rest of the website suggests. This involved moving the external link button to the bottom of the component. As requested, this links to the rubric page, but can be extended to link to a contact form if necessary.

### Task 6: Sponsor Section
![Updated Logo Section](updated-logos.webp)
To suit the dark theme of the website, some external work was performed to create contrast-friendly logos. Other than that, the
arrangement of the logos was simple, and I also included some animation to the logos when the user scrolls to this section.
The video preview for this animation can be found in `Animated-Sponsors.mp4` in this directory.

### Task 7: Custom Element
To be honest, I really enjoy the single page which contains all the information regarding the society. So I made the decision not to create anything that takes visitors away from important information such as events.
For this section, I aimed to include more subtle features that helps capitalise on the view time of each visitor, and capturing their intentions quickly. This meant including interactive elements such as a photo stack in the about section to increase visitor retention and always-accessible social media icons to capture visitor interest immediately.

**Photo Stack**
For now, the photo stack contains only one photo but I feel that you will see the vision with other images. Media from recent events would have a great home in this section, providing an active and interactive snapshot of AISoc now!


****

