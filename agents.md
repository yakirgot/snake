# Snake Game LLM Efficiency Guidelines

## Core Principles

- **TDD First**: Always write or update a reproduction test before adding or editing behaviors.
- **Consider E2E Tests**: Testing the DOM should be done via E2E tests. Try to avoid duplicate tests.
- **Small Steps**: Make incremental changes and verify frequently.
- **Verification**: Run typechecks, linters, and tests after completing a task (whichever is relevant). It is recommended to run `npx lefthook run pre-push --force` (or `npx lefthook run pre-push -f`) to validate all checks before submitting.

## Coding Standards

- **Private Fields**: Use JavaScript private class fields (`#field`) for internal state within classes.

## Common Commands

- **Run Unit Tests**: `npx nx run snake-app:test` (or `npx nx affected --target=test`)
- **Run E2E Tests**: `npx nx run snake-app-e2e:e2e` (or `npx nx affected --target=e2e`)
- **Build Project**: `npx nx run snake-app:build` (or `npx nx affected --target=build`)
- **Type Checking**: `npx nx run snake-app:typecheck` (or `npx nx affected --target=typecheck`)
- **Linting**: `npx nx affected --target=lint` (or `npx stylelint "**/*.css"` for style linting)
- **Run All Checks (Lefthook)**: `npx lefthook run pre-push --force`

## Development Patterns

- **Dependency Injection**: Services and state (like `GameState`, `GameSettings`) are managed via `tsyringe`. Always check `providers.ts` for registrations.
- **Game State**: Centralized in `GameState` singleton.
- **Testing**: Unit tests are located next to the source files (`*.spec.ts`). Mocking is done via `vitest`.
- **DOM Access**: Use `getRequiredElement` from `utils/dom.ts` with `DOM_SELECTORS` from `@yakirgot/models`.
