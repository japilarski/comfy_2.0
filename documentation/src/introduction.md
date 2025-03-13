---
sidebar_position: 1
slug: /
---

# Introduction

This is a mono-repo containing code for the Comfy application.

To make managing a mono-repo easier this repository uses [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces).

The application source code is contained under the packages directory. Main categories of packages are:

- Application infrastructure: `packages/terraform`,
- Application fronted: `packages/frontend`
- Application business logic: `packages/backend`
- Lambda Handlers: `packages/handlers`
- Local development: `packages/express-dev-app`
- Database: `packages/database`
- Supporting functionalities that can be reused and shared: `packages/logger`, `packages/http-resources`,

The source code for this documentation site is contained under the `documentation` directory

Various GitHub actions are set up on this repository, see the `.github/workflows` directory.
