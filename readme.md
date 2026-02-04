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

### Run Docker container

```bash
docker run -p 8080:80 snake-game
```

The game will be available at http://localhost:8080

## E2E Testing with Docker

To ensure consistent results (especially for visual regression tests), you can run E2E tests inside a Docker container.

### Run E2E tests in Docker

```bash
npm run test:e2e
```

### Update E2E snapshots in Docker

If you need to update snapshots due to intentional changes, use:

```bash
npm run test:e2e:update
```

### Run E2E tests UI in Docker

```bash
npm run test:e2e:ui
```

**Note:** Docker must be installed and running on your machine to use these scripts.
