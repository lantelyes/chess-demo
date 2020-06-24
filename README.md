# Chess Demo

live site: https://aestudio-chess.herokuapp.com/

## Frameworks/Libraries
**Server:** NodeJS
**Database:** MongoDB (Mongoose node driver)
**Routing:** Express
**UI Framework:** React / Create React App / Bootstrap
**Testing:** Jest / Cypress


## Organization 

### File Structure
The file structure of this project is split into two seperate node projects, one for the. server, and one for the client. Due to the small size of the application, they are both in the same repository. the root directory is a small node project as well. It serves to manage deployment to heroku, as well as scripts to aid in development

#### Server
The server is broken down into two folders:
1)  **Source**
The `src` folder contains the constants file, the entry point, and the libary folder. The library folder contains the following:
	- **Database:** This folder contains the database connection code, as well as the schemas used
	- **Router:** This contains all of the servers routing logic 
	- **Utilities:** This contails various helpers, and cooordinate conversion functions used througout the server code base
2) **Tests**
 The `test` folder contains unit tests for the server - right now there are only a few written for the knight movement algorithm, and validation of the coordinate formats. Ideally, there would be. much more complete code coverage.

#### Client
The client folder contains the main app entry point: `App.js` as well as various scripts used to set up the runtime environment. In addition it contains `utils.js` with various helpers and other functions used throught the client code base. The sub directories are broken down into three folders:
1) **Source**
The `src` folder contains all of the client code: It it broken down into the folowing three folders:
	-  **Components**: 
This folder contains all of the react components and is broken down into three sub folders:
		- **Board:** All compoments used to build the chessboard
		- **Panels:** All the panels in the UI for displaying information, or for user actions
		- **Modals:** The modals used to perform the user actions.
	- **Contexts:**
This folder contains the context used to manage the application state
	- **Theme:**
This folder contains the bootstrap theme css as well as some custom overrides
2) **Cypress**:
The `cypress` folder contains all of the code pertaining to integration browser tests, It it broken down into the folowing:
	- **Fixtures:** These are where mocks and test fixtures would go to support integration tests - it is not used in this project
	- **Integration:** These are where the integration tests are - there is only a very basic one in here, I mainly wanted to show how I know how to set up the system
	- 	**Plugins:** These are where cypress plugins would go if they are used
	-	**Support:** These are where cypress helpers would go, such as custom commands

3) **Public**
The `public` folder contains static assets, such as `index.html`, favicons and the mannifest json


## The Knight Algorithm
The algorithm used for calculating all of the knights first, and second possible moves is fariy simple:

1) Generate possible moves from a given coordinate on the board using the rules of the chess peice
3) Filter the results of any that would land off of the board - this results in all possible first moves
2) For each of the resulting positions, repeat step 1 and 2, then and flatten all of the results into one list of possible coordinates - these are your possible second moves


## Postmortem
I really liked this challenge. It was a good balence of frontend and backend work. Feeling inspired, I decided to implement some more advanced features:

1) Fully responsive design
2) Session saving and loading to record move history
3) A responsive interactive tutorial, rather than a responsive wizard page

There are however some things I would add/improve if I had more time:

1) Complete unit test coverage
2) Error handing middleware for express routing
3) Algoritm optimization (eg. avoiding duplicate resulting coordinates)
4) Various smaller optimizations and cleaner ways to write things
5) More verbose, complete comments throughout the code
6) CI integration with Heroku deployment
7) Review apps for pull requests


On a final note, I fully understand in a collaberate project, GitHub would be used by creating feature/fix branches, that would then be reviewed as pull requests.

I opted just to commit to master for the sake of the smallness of the project, and the fact that I am the only contributer.