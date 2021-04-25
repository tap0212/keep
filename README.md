## [Keep](https://keep-lovat.vercel.app/) 💡
###### @ https://keep-lovat.vercel.app/
` An attempt to re-create Google's Keep app`.

<img src="https://github.com/tap0212/keep/blob/main/showcase.gif"  width="75%">

### Features
- Add notes with title and/or description
- Upload Image with the note
- Support for markdown
- Archive/Unarchive notes easily
- Global Search which shows categorized notes
- Dark mode
- Responsive UI
---
### Technologies Used
* Library: ReactJs
---
* Global state management with [redux](https://redux.js.org/) and [reduxSauce](https://github.com/jkeam/reduxsauce)
    * Check [src/configureStore.js](https://github.com/tap0212/keep/blob/main/src/configureStore.js)
    * Check [src/reducers.js](https://github.com/tap0212/keep/blob/main/src/reducers.js)
---
* State persistence using [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
    * LocalStorage as storage
---
* Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)
    * Check [src/containers/NotesContainer/selectors.js](https://github.com/tap0212/keep/blob/main/src/containers/NotesContainer/selectors.js)
---
* Routing using [React-router](https://github.com/ReactTraining/react-router)
    * Check [src/routeConfig.js](https://github.com/tap0212/keep/blob/main/src/routeConfig.js)
    * Check [src/routeConstants.js](https://github.com/tap0212/keep/blob/main/src/routeConstants.js)
---
* Building the application using Webpack
    Configured build using webpack according to the deployment stage
    You can check following files
    * [build-utils/webpack.config.js](https://github.com/tap0212/keep/blob/main/build-utils/webpack.config.js)
    * [build-utils/webpack.common.js](https://github.com/tap0212/keep/blob/main/build-utils/webpack.common.js)
    * [build-utils/webpack.dev.js](https://github.com/tap0212/keep/blob/main/build-utils/webpack.dev.js)
    * [build-utils/webpack.prod.js](https://github.com/tap0212/keep/blob/main/build-utils/webpack.prod.js)
---
* Media upload using AWS-SDK
---
* Styling and theming using [styled-components](https://styled-components.com/)
    * Check [src/components/AddNoteCard/index.js](https://github.com/tap0212/keep/blob/main/src/components/AddNoteCard/index.js)
* Styling & Animations done using vanilla CSS and/or JS without any external library
    Created a custom styling and theming framework to speed up development process and re-use existing code at max
    You can have a look at the following files for more
    * [src/themes/colors.js](https://github.com/tap0212/keep/blob/main/src/themes/colors.js)
    * [src/themes/fonts.js](https://github.com/tap0212/keep/blob/main/src/themes/fonts.js)
    * [src/themes/media.js](https://github.com/tap0212/keep/blob/main/src/themes/media.js)
    * [src/themes/styles.js](https://github.com/tap0212/keep/blob/main/src/themes/styles.js)
* Easing the development process using eslint and prettier
---
### Data Stuctures used
* Hashmap used for storing all the notes for efficient lookups to update and delete notes
```
{
    notes: {
        <noteId: String> : {
            title: <note_title: String>,
            note: <note_description: String>,
            isPinned: <is_note_pinned:  Boolean>.
            isArchived: <is_note_archived: Boolean>,
            image: <image_url: String>
        }
    }
}
```
* Trie Search is used to perform a global search using [trie-search](https://www.npmjs.com/package/trie-search)
--- 
### Performance
- Lighthouse Score: Whooping 99
- FCP: 600ms
- TTI: 1100ms
You can check more in below attached screenshot
 <img src="https://github.com/tap0212/keep/blob/main/report.png" width="60%" >

---
### To run the project locally follow these steps

- Clone the project and cd into the directory
- Run `yarn` or `npm i` to install the required dependencies
- Run `cp .env.example .env.development` to create your own development env file
- Run `vim .env.development` to edit (AWS key, secret, S3 bucket required for the image upload functionality to run or if you want to try it out visit the deployed version)
- And finally run `yarn start` to start the development server locally
- Visit `http://localhost:8080`
