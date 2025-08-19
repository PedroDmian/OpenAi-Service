# Erp AI

ERP management wizard that guides the user through a workflow based on available modules and assigned permissions.
The wizard queries the API to determine which modules and permissions are available to the user, and based on that,
provides the user with the corresponding options to interact with the system.

## Project Structure

The structure of the project is as follows:

```
erp_ai
├── src
│   ├── application
│   │   └── services
│   │       └── health-check.service.ts
│   ├── domain
│   │   ├── models
│   │   │   └── health-status.ts
│   │   └── repositories
│   │       └── health.repository.ts
│   ├── infrastructure
│   │   ├── controllers
│   │   │   └── health.controller.ts
│   │   ├── routes
│   │   │   └── health.routes.ts
│   │   └── server.ts
│   └── shared
│       └── config
│           └── app.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

To install the project dependencies, run the following command:

```
npm install
```

## Execution

To start the application, use the following command:

```
npm start
```

The application will listen on the port specified in the configuration.

## Health Check

The application includes an endpoint to check your health. You can access the health check at the following path:

```
GET /api/health
```

SERVICE CHAT
```
curl --location 'http://localhost:<PORT>/api/chat' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TU_TOKEN_AQUI>' \
--data '{
    "messages": [
        {
            "content": "Quiero crear un cliente",
            "role": "user"
        }
    ]
}'
```

This endpoint will return an object indicating the status of the application.
