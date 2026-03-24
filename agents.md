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
- **DOM Access**: Use `getRequiredElement` from `utils/dom.ts` with `DOM_SELECTORS` from `@snake/models`

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax


<!-- nx configuration end-->
