<p align="center">
  <img  height="170" src="docs/logo.png">
</p>

# FoodX

The Food Expiration App is a collaborative mobile application developed by SUPSI and Penn State University. This app assists users in managing their refrigerator's contents, reducing food waste by tracking expiration dates, and locating nearby food banks.

## Features

### Food Inventory Management System

Allows users to keep track of the food items in their fridge with ease. With this feature, users can efficiently manage their food inventory, reduce waste, and save money.

### Expiration Date Tracker

This is a critical feature of the Food Inventory Management System. This feature helps users to stay on top of the expiration dates of their groceries, enabling them to use food before it goes bad and avoid unnecessary waste.

### Notification System

This is an essential component of the Food Inventory Management System. This feature sends timely notifications to the users when their food items are about to expire, ensuring that they can consume them before they go bad.

### Recipe Generator

This feature empowers users to create delicious meals using the food items they have in their fridge. This feature leverages an extensive database of recipes, enabling users to generate personalized recipe suggestions based on the food items they have on hand.

### Food Bank Locator

This feature enables users to locate the nearest food banks in their area easily. This feature leverages a robust mapping system, allowing users to visualize the location of food banks in their vicinity. The Food Bank Locator feature also provides critical information such as contact details, and the address of each location.

## Technologies Used

The following technologies are used to develop the Food Expiration App:

- `React Native` - a popular JavaScript framework for building native mobile applications
- `Expo` - a set of tools and services that make it easy to build, deploy, and share React Native applications
- `NativeBase` - a UI component library for React Native that provides a set of customizable components for building mobile applications
- `npm` - a package manager for JavaScript used to manage the app's dependencies
- `AppWrite` - to host a cloud function that generates recipes based on the user's food inventory

## Getting Started

### Dependencies required

To start the project you will need to have the following dependencies installed:

- npm
- expo
- Android Virtual Device SDK or XCode

### How to upload the cloud function

To upload the cloud function "openai-recipes" you need to go to the folder `appwrite`.

Copy the file `.env.example` and rename it to `.env` and fill the variables with the correct values.

```bash
cp .env.example .env
```

Install the dependencies by running the following command:

```bash
npm install
```

Upload the cloud function by running the following command:

```bash
npm run deploy
```

### How to run the application

To start with the Food Expiration App, follow the steps below:

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/slashdotted/C4110Z.1-2023-Team-5
```

Install the dependencies by running the following command:

```bash
npm install
```

Start the app using the following command:

```bash
npm run start
```

This will start the Expo development server, you can than choose on which device run the app. You can also use the Expo app on your mobile device to preview the app via the QR code.

## Project Kanban Board

The board with the project tasks can be found at the following link:

[Project Kanban Board](https://github.com/users/slashdotted/projects/8/views/1)

## Meeting Minutes

The meeting minutes can be found in the folder `meeting_minutes`.

[Meeting Minutes](/meeting_minutes)

## Authors

This project is developed as a collaboration between SUPSI and Penn State University.

SUPSI team members:

- Filippo Finke
- Matteo Forni

Penn State University team members:

- Alexa Dean
- Ross Zofcin
- Sydney Masry
- Stephen McGlynn
