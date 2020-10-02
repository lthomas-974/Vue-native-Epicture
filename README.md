# Vue-native Epicture

<p align="center">
  <img src="exemple.gif" alt="Sublime's custom image"/>
</p>

## The project
The goal of this project is to use and implement online photo sharing API platforms.
You must create a photo finder and browsing application the following platform: Imgur.
The different aspects of mobile (or universal) applications development are to be taken into account during
the creation of your project.



## The environment
This project is written in Vue-native

## Dependencies and librairies used
	- Vue router
	- Vue Ex
	- Expo / Expo Document Picker / Expo file system
	- Native Base
	- React-native


## Functionnalities
The project’s functionalities are set out as follows:
- create a photo finder and browsing application.
- Imgur API implementation
- Authenticate to the Imgur platform
- Display the photos put online by the user connected
- Search for photos on the plateform
- Upload photos to the plateform
- Manage your favorites
- Filter the displayed photos

The API Imgur will be used https://apidocs.imgur.com/

## How to run it

Clone the repository where you want  
`git clone git@github.com:YohannEpitech/Epicture.git`   
Go inside the folder  
`cd Epicture`   
Rename env.config.js.exemple to env.config.js and replace "Your CLIENT_ID" by your imgur client ID
```
module.exports = {
    CLIENT_ID : "Your CLIENT_ID"
};
```  
Install the dependecies  
`npm install`  

Run the expo server  
`expo start`  
Choose local connection  
Choose Android Device/Simulator or run an IOS simulator  

Now, you can use this wonderfull application

## The Team

Curious about who makes this project  
[YohannEpitech](https://github.com/YohannEpitech)  
[Kevin Bridonneau](https://github.com/Kevin-Bridonneau)

## License

This project is GNU3 licensed.
