# Snake Game

Just a simple snake game. Enjoy!

Feel free to give a feedback or submit a PR

## Development

### Install dependencies

```bash
npm ci
```

### Run development environment

```bash
npm run dev
```

### Run tests

```bash
npm run test
```

### Run linters

```bash
npm run lint:scripts
npm run lint:styles
```

## Docker

### Build Docker image

```bash
docker build -t snake-game .
```

### Run Docker container

```bash
docker run -p 8080:80 snake-game
```

The game will be available at http://localhost:8080
