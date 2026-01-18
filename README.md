<div align="center">
<a href="https://github.com/aunjaffery/restmate"><img src="build/appicon.png" width="120"/></a>
</div>
<h1 align="center">Restmate</h1>

<div align="center">
<strong>Restmate is a modern lightweight cross-platform Rest API Client, designed to simplify and expedite the testing process for developers. Available for Mac, Windows, and
Linux.</strong>
</div>
<br>

<div align="center">
 <img alt="screenshot" src="screenshots/restmate1.png">
 <br>
 <img alt="screenshot" src="screenshots/restmate2.png">
</div>

## Feature

- Super lightweight, built on Webview2, without embedded browsers (Thanks
  to [Wails](https://github.com/wailsapp/wails)).
- Send requests with different methods (GET, POST, PUT, DELETE).
- Send requests with different body types (Form, Raw, Binary).
- Create and manage environments to store variables and configurations for your API endpoints.
- Data is stored locally on your machine. and no data is sent to any server.
- Import collections and requests from Postman.
- Dark mode with multiple themes (ayu, nord, tokyoNight, dracula)

## Installation

Available to download for free from [here](https://github.com/aunjaffery/restmate/releases/).

## Build Guidelines

### Prerequisites

- Go (latest version)
- Node.js >= 18
- NPM >= 10

### System Dependencies

Before installing Wails, you need to install platform-specific dependencies required for building the application.

```bash
sudo apt-get update
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev pkg-config build-essential nsis
```

### Install Wails

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### Pull the Code

```bash
git clone https://github.com/aunjaffery/restmate
```

### Build Frontend

```bash
npm install --prefix ./frontend
```

or

```bash
cd frontend
npm install
```

### Compile and Run

```bash
make dev
```

## Support

You can support the development of Restmate by starring the repository, sharing it with your friends, and contributing to the project. Also you can support the project by donating to the project's wallet.
