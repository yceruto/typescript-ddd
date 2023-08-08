# Code Interview: E-Commerce API

## Installation

```bash
npm install
npm run prepare
```

Run tests:
```bash
npm run start:dev
npm run test
```

## Project Overview

This project is a straightforward e-commerce application, comprising solely a backend API. It's built with Node.js and TypeScript, utilizing Domain-Driven Design as the main approach.

## Structure

The project relies on the `0http` micro-framework. It is divided into modules, with each module residing in a separate directory within the `src` directory. Each module consists of four layers: application, domain, infrastructure, and presentation.

### Presentation Layer

The presentation layer is responsible for handling HTTP requests and responses. It takes care of the validation of requests and responses, as well as error handling.

Controllers and other primary adapters are implemented at this level.

This layer communicates with the application layer through command/query messages.

### Application Layer

The application layer handles business logic, including the conversion of primitive types to domain types and vice versa.

This layer contains the implementation of application services, command and query messages, and the handlers that manage them. It communicates with the domain layer through domain building blocks such as entities, value objects, etc., and interfaces with the infrastructure layer via interfaces.

### Domain Layer

The domain layer focuses on the management of business rules and validation of those rules.

Entities, Value Objects, Errors, Events, Views, Repository interfaces, and other domain building blocks are constructed here.

### Infrastructure Layer

The infrastructure layer is tasked with managing persistence and side effects. It also handles external services and module configurations.

Repositories and other secondary adapters are implemented within this layer.