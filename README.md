<!-- Please update value in the {}  -->

<h1 align="center">Image Uploader</h1>

<div align="center">
   Solution for Image Uploader from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://{your-demo-link.your-domain}">
      Demo
    </a>
    <span> | </span>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)
  - [Good-to-Know Commands](#good-to-know-commands)
- [Common Issues](#common-issues)

<!-- OVERVIEW -->

## Overview

![screenshot](https://github.com/j-ngo828/image-uploader/blob/docker-dev-environment/image-uploader-project.png?raw=true)


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
# Build the containers
docker compose up -d --build
```

Navigate to http://localhost:3000 to access the application.

To stop the containers and to start the containers after the initial build:

```bash
# For stopping all containers
docker compose stop

# For starting the container after the initial build
docker compose up -d
```

### Good-to-Know Commands

- Since our backend server in containerized in Docker. To run Django administrative command such as `makemigrations`, do the following:

```bash
docker exec -it django-backend /bin/sh -c "python manage.py {command}"
```

Alternatively, you can add an alias to your shell:

```bash
alias dmd="docker exec -it django-backend sh -c"

# Then just run management command with: dmd "{command}"

## Example
dmd "help" # list all possible management command
```

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

Note: We assumed you're using MacOS or Linux. For Windows, please find the corresponding command.
