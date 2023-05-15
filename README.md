<!-- Please update value in the {}  -->

<h1 align="center">Image Uploader</h1>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)
  - [Set up Dev Environment](#set-up-dev-environment)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Good-to-Know Commands](#good-to-know-commands)
- [Common Issues](#common-issues)

<!-- OVERVIEW -->

## Overview

![screenshot](https://github.com/j-ngo828/image-uploader/blob/main/image-uploader-project.png?raw=true)


An application that allows user to upload image via drag and drop or manually selecting file from the filesystem.

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

- User can upload photo and preview them.
- Supports drag and drop of image as well as ability to select image from the filesystem.


## How To Use

Note: If you're using Windows, please clone this repo in WSL and run the docker commands in there.

<!-- Example: -->

To clone and run this application you'll need:
- [Git](https://git-scm.com)
- [Docker](https://docs.docker.com/get-docker/)

Then on your terminal, run the following from the root of this repository:

```bash
# Build the images and containers then run the containers
docker compose up -d --build
```

Navigate to http://localhost:3000 to access the application.

To stop the containers and to start the containers after the initial build:

```bash
# For stopping and removing the containers created above
# Use the -v flag to remove the associated volumes
docker compose down

# For creating and starting the container
# after the initial build
docker compose up -d
```

### Set up Dev Environment

#### Backend

Please follow the instructions for creating virtual environment and install dependencies in the Common Issues section below.

#### Frontend

If you're using VSCode, please download the recommended extensions and add the settings in `settings.json` for a better developer experience.

You'll need:

- [pnpm](https://pnpm.io/installation#using-npm): An alternative package manager to `npm`

Then run:

```bash
pnpm install
```

### Good-to-Know Commands

**Run command in a container**

To run shell command in any of the two containers:

```bash
docker compose exec <service-name> <command> <list-of-args>

# Example: installing new pnpm package in the frontend container
docker compose exec frontend pnpm install tailwindcss

# Example: Make backend migrations
docker compose exec backend python manage.py makemigrations
```

> We recommend creating alias(es) to shorten the above commands


## Common Issues

**Import "{framework/library-name}" could not be resolved error from Pylance**

If you're using VSCode and see this error. This mean the framework/library was not installed globally or installed in the virtual environment you're using. We highly recommend setting up a new virtual environment. So remove your existing environment in the root of this repository. Then run the following commands

```bash
# Ensure you are in the root of this repository
python3 -m venv env # Our gitignore assumes the virtual environment name is env
source env/bin/activate
pip install -r backend/requirements.txt
```

Then select the interpreter in `env/bin/`. The issue should disappears.

Note: We assumed you're using MacOS or Linux. For Windows, please find the corresponding command for setting up Python virtual environment.

## Credits

<div align="center">
   Solution for Image Uploader from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>
