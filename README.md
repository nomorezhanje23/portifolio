## Portfolio Car Application

Portifolio project at ALX Africa, 2024 

Link for presentation: https://docs.google.com/presentation/d/10ZSmpvBqM6V3coRIFe6tDw0VgArvbe-8-7v__kcoCq0/edit?usp=sharing

## Project Name: 
Portfolio Car Application
## Introduction: 

Empowering car dealerships with an innovative portfolio platform.
The idea for this project came from my love for technology and automobiles. I wanted to create a system that would simplify car dealership management while offering users an intuitive experience.
This is a Portfolio Project for Holberton School (ALX-Africa): https://intranet.alxswe.com/projects/565

## Deployed Site Link: 
https://portifolio-o02j.onrender.com
## Installation:
*Prerequisites*
The only prerequisite software required to have installed at this point is Git for version control and a code editor - we will use VS Code (VSC).

*Package Management*
The foundation of the project development software is Node. While functional, Node depends on "packages" to add functionality to accomplish common tasks. This requires a package manager. Three common managers are NPM (Node Package Manager), YARN, and PNPM. While all do the same thing, they do it slightly differently. We will use PNPM for two reasons: 1) All packages are stored on your computer only once and then symlinks (system links) are created from the package to the project as needed, 2) performance is increased meaning that when the project builds, it does so faster. You will need to either install or activate PNPM before using it. See https://pnpm.io/

*Install the Project Dependencies*
Open the downloaded project folder (where this file is located) in VS Code (VSC).
Open the VSC terminal: Terminal > New Window.
Run the following command in the terminal:

pnpm install

The first time it may take a few minutes, depending on the speed of your computer and the speed of your Internet connection. This command will instruct PNPM to read the package.json file and download and install the dependencies (packages) needed for the project. It will build a "node_modules" folder storing each dependency and its dependencies. It should also create a pnpm-lock.yaml file. This file should NEVER be altered by you. It is an internal file (think of it as an inventory) that PNPM uses to keep track of everything in the project.

*Start the Express Server*

With the packages installed you're ready to run the initial test.
If the VSC terminal is still open use it. If it is closed, open it again using the same command as before.
Type the following command, then press Enter:

pnpm run dev

If the command works, you should see the message "app listening on localhost:5500" in the console.
Open the package.json file.
Note the "Scripts" area? There is a line with the name of "dev", which tells the nodemon package to run the server.js file.
This is the command you just ran.
Open the server.js file.
Near the bottom you'll see two variables "Port" and "Host". The values for the variables are stored in the .env file.
These variables are used when the server starts on your local machine.

*Move the demo file*

When you installed Git and cloned the remote repository in week 1, you should have created a simple web page.
Find and move that simple web page to the public folder. Be sure to note its name.

*Test in a browser*

Go to http://localhost:5500 in a browser tab. Nothing should be visible as the server has not been setup to repond to that route.
Add "/filename.html" to the end of the URL (replacing filename with the name of the file you moved to the public folder).
You should see that page in the browser.

## Usage: 
The application is used to create account, add or delete information and maintain the inventory. 
Once the app is running, users can:
- Browse the inventory of available cars.
- Register for an account to receive discounts.

## Contributing: 
My close friend Steven helped me debug when I was having issues. 
Robertson Blaine as well helped in simplifying the MVC for me.

## Related Projects: 

[https://youtu.be/2SCadynHLtQ?si=8O-NkLvBHay97BfH](https://youtu.be/2SCadynHLtQ)

## Licensing: 
This project is licensed under the MIT License

## Screenshot:

![app](https://github.com/user-attachments/assets/099a3db7-8b91-4704-b5ff-d2dd494adc0b)

