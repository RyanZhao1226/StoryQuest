# **StoryQuest - Interactive Storytelling Adventure**

StoryQuest is an interactive storytelling game where players make choices that shape the narrative, leading to multiple branching paths and different endings. The game allows players to track their decisions, save progress with Firestore, and replay to explore various outcomes. Built with React Hooks and following a functional programming approach, StoryQuest is fully modular and easily access.

## Setting up

In the project directory, you can run:

`npm run dev`

Runs the app in the development mode.
Open [http://localhost:5175](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`npm run upload`

You can run this order to upload your stories in uploadStories.js to firebase.

`npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

If you want to deploy it on firebase hosting, you can run

`firebase deploy`

at the terminal of root folder.

You will see a Hosting preview link and a live link (like https://your-project.web.app) in the terminal.

## Features

* **Interactive Storytelling** – Make choices that shape the storyline with multiple paths and endings.
* **Story Path Tracking** – View the decisions you've made and explore different outcomes.
* **Save & Resume Progress** – Automatically saves progress in Firestore for seamless continuation.
* **Multiple Endings & Achievements** – Unlock unique story conclusions.
* **React Hooks & Functional Programming** – Built with modern React principles for efficiency.
* **Firestore Integration** – Persistent storage for user choices and game progress.

## Project structure

```
storyquest/
├── public/
├── .firebase/
├── docs/
│   ├── Functional Programming.md
│   ├── Project2.pdf
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── GameScreen.jsx
│   │   ├── StoryCRUD.jsx
│   │   ├── StoryPath.jsx
│   │   ├── StoryList.jsx
│   │   ├── Tutorial.jsx
│   ├── services/
│   │   ├── firestore.js
│   │   ├── uploadStories.js
│   ├── App.css
│   ├── App.jsx
│   ├── firebaseConfig.js
│   ├── index.css
│   ├── main.jsx
├── .firebaserc
├── firebase.json
├── index.html
├── .gitignore                 # Manage git config
├── eslint.config.js           # Manage eslint config
├── LICENSE                    # Show the license
├── package-lock.json
├── package.json
├── vite.config.js
├── README.md
```

## Links

**Business Requirement & Design**

[https://docs.google.com/document/d/1zh3W3ZcqnZOJ_t-tE_fQkVuDakiG3bU3AqCGm9v2X3k/edit?usp=sharing]()

**Modules Diagram**

[https://lucid.app/lucidchart/0b3de2d8-1ebf-47ab-ac12-2ff5906f0b67/edit?viewport_loc=-432%2C-76%2C2217%2C1092%2C0_0&amp;invitationId=inv_74cef52b-fd53-432a-b1df-80f6ee463989]()

**Mockups**

[https://www.figma.com/design/C2wUCrvW3aC10LOcClWjoK/Project2?node-id=0-1&amp;t=6GffqFLwBUzs66Sd-1]()

**Video**

Application demonstration：

[https://youtu.be/FKMQc4VeGyg?si=qkTQcm3eHz_8L7lV]()

FP Principles:
https://youtu.be/00U9OnZSVC0

**Deployed project**

[https://storyquest-d29ee.web.app/]()

## Acknowledgment

**Usage of AI**

[https://docs.google.com/document/d/1zh3W3ZcqnZOJ_t-tE_fQkVuDakiG3bU3AqCGm9v2X3k/edit?tab=t.0#heading=h.gjdgxs]()
