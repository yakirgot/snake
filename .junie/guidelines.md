# Snake Game LLM Efficiency Guidelines

## Core Principles

- **TDD First**: Always write or update a reproduction test before adding or editing behaviors.
- **Small Steps**: Make incremental changes and verify frequently.
- **Verification**: Run tests and linters after completing any task. It is highly recommended to run `npx lefthook run pre-push --force` (or `npx lefthook run pre-push -f`) to validate all checks before submitting.

## Technical Stack

- **Monorepo Management**: Nx
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: `tsyringe` (Dependency Injection)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright
- **Styles**: CSS (using `the-new-css-reset`)

## Common Commands

- **Run Unit Tests**: `npx nx run snake-app:test` (or `npx nx affected --target=test`)
- **Run Unit Tests (Watch Mode)**: `npm run test:watch`
- **Run E2E Tests**: `npx nx run snake-app-e2e:e2e` (or `npx nx affected --target=e2e`)
- **Build Project**: `npx nx run snake-app:build` (or `npx nx affected --target=build`)
- **Type Checking**: `npx nx run snake-app:typecheck` (or `npx nx affected --target=typecheck`)
- **Linting**: `npx nx affected --target=lint` (or `npx eslint .` / `npx stylelint "**/*.css"`)
- **Run All Checks (Lefthook)**: `npx lefthook run pre-push --force`

## Project Structure

- `apps/snake-app`: Main application source code.
  - `src/app/game-engine`: Core game logic.
  - `src/app/game-engine/providers.ts`: DI registration.
- `apps/snake-app-e2e`: Playwright E2E tests.

## Development Patterns

- **Dependency Injection**: Services and state (like `GameState`, `GameSettings`) are managed via `tsyringe`. Always check `providers.ts` for registrations.
- **Game State**: Centralized in `GameState` singleton.
- **Testing**: Unit tests are located next to the source files (`*.spec.ts`). Mocking is done via `vitest`.
- **DOM Access**: Use `getRequiredElement` from `utils/dom.ts` with `DOM_SELECTORS` from `constants.ts`.
