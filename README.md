# Board Game Picker
Enter your Board Game Geek username and get a random game form your collection (marked as owned) to play! Give it a try over at [bgpicker.com](https://www.bgpicker.com/)

Built with React JS and [chakra UI](https://next.chakra-ui.com/)

## Local installation
- Clone this repo
    - `git clone https://github.com/alfremedpal/board-game-picker.git`
- Move inside the project
    - `cd board-game-picker/`
- Install dependencies
    - `yarn install`
- Run
    - `yarn start`

## Run with Docker
- Build the docker image:
    - `docker build . -t bgpicker`
- Start docker container:
    - `docker run -p 3000:3000 -d bgpicker`

# Future
- Add vertical layout option for ranking display
- Add change width option for the ranking table
- Add export option to the ranking engine
- Add import option to the ranking engine

# Contribute
Feel free to contribute to this project by creating a pull request.
