# smarturl-Frontend
 React App Frontend for smarturl



<h2>Working Version</h2>

When both frontend and backend are correctly deployed, it should work exactly like the live demoi have deployed<br>
<a href="https://test.learnershub.co.za/" target="_blank">Link to Live Demo</a>



<h2>Plans for production and scalability</h2>
1.	 For production, most of the components can be further broken down into several child components, and some can be implemented as functional components. Functional components are most time pure, so they are faster.
2.	In the current version some CSS styling were implemented as inline, in production, putting all CSS in the CSS file is a better alternative.



<h2>Deployment Instruction</h2>
1.	Pull the resipotory to your local machine, cd into the project directory in your terminal and run npm install. The required modules would be installed in the node_modules directory in the project directory.


2.	The Base.js file in src/Base.js file includes two constants.
Backend_base_url    ----   the full path to where the location you are hosting of the Django backend app
Frontend_base_url    ----     the full path to the location of you are hosting this frontend app
Their current default values are the default for React and Django for localhost. Please ensure that the ports are correct if you are hosting on localhost.
Ensure the paths end with a backslash(I could have just written a line of code to do this.)


3.	If you are deploying on localhost, running npm start at this point should start the development server and open up a browser tab showing the application.



4.	If you are deploying outside localhost, you need to run ‘npm run-script build’ to compile the production build version of the app. The production files will be created in a new directory named build. You then need to copy the files to the public html directory of your server. 


5.	Since this is an SPA App and routing is being done on the client. You need to modify your .htaccess file(Apache server) to redirect all incoming requests to the root domain. I included a .htaccess file in the public directory to handle this. But please confirm that this is exactly the .htaccess file on your server as sometimes this it gets file gets overwritten by the server.

Good luck

