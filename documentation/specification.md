# API Specification for SUPER Assessor

## Overview

The SUPER Assessor API is designed to digitalize the SUPER Assessor card game, transforming it into a globally accessible, digital platform. This API enables educators and administrators to manage, customize, and innovate within the realm of educational assessment strategies. Key features include CRUD operations for managing users, missions, and assessments; the ability to upload custom icons for cards; and advanced search functionalities to inspire educators with random selections of assessment and mission cards.

## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1. Business Objectives](#11-business-objectives)
  - [1.2. Problem Statement](#12-problem-statement)
  - [1.3. Impact Definition](#13-impact-definition)
- [2. User Stories](#2-user-stories)
- [3. API Specification](#3-api-specification)
  - [3.1. Title](#31-title)
  - [3.2. Authors](#32-authors)
  - [3.3. Problem](#33-problem)
  - [3.4. Impact](#34-impact)
  - [3.5. Implementation](#35-implementation)
  - [3.6. Authentication](#36-authentication)
  - [3.7. Considerations](#37-considerations)
  - [3.8. Technology Architecture](#38-technology-architecture)
  - [3.9. Errors](#39-errors)
  - [3.10. Endpoints](#310-endpoints)
    - [3.10.1. Users Collection](#3101-users-collection)
    - [3.10.2. Assessments Collection](#3102-assessments-collection)
    - [3.10.3. Missions Collection](#3103-missions-collection)
  - [3.11. Events and Payloads (for Future Consideration)](#311-events-and-payloads-for-future-consideration)

## 1. Introduction

### 1.1. Business Objectives

The primary goal is to digitalize the SUPER Assessor card game to:

- Make the game globally and digitally accessible.
- Enhance utility by enabling digital interaction with mission and assessment cards.
- Foster a creative environment for educators to develop innovative assessment strategies.
- Increase the visibility and reputation of the Department of Design in Trondheim.

### 1.2. Problem Statement

The current limitation of the SUPER Assessor card game to physical interaction hinders its adoption and global/digital reach, making it difficult for educators to create, refine, and share assessment strategies effectively.

### 1.3. Impact Definition

Success means providing a platform where educators worldwide can seamlessly generate and manage assessment methods, promoting innovative teaching and creating a name for the Department of Design in Trondheim in the educational technology space.

## 2. User Stories

- As an educator, I want to **browse, create, update, and delete Mission and Assessment Cards**, so I can **design assessment methods**.
- As an educator, I want to **customize card icons** with an **SVG upload feature** for **personalization**.
- As an administrator, I want to **manage user accounts** to **monitor usage and gather feedback**.
- As a user, I want to **search for random cards** within **specific types and categories** to get **inspiration for my assessments**.

## 3. API Specification

### 3.1. Title

SUPER Assessor API

### 3.2. Authors

- Hannah Sofie Eriksen

### 3.3. Problem

Current physical limitations of the SUPER Assessor card game restrict its accessibility and utility, hindering the adoption of innovative educational assessment strategies on a global scale.

### 3.4. Impact

By developing the SUPER Assessor API, I aim to digitize the card game, thus making it widely accessible and enhancing its features. This will empower educators to manage assessment strategies online with greater ease and flexibility.

### 3.5. Implementation

My choice of technology for implementing the RESTful API includes Node.js, Express.js, and MongoDB due to the following advantages:

- **Node.js and Express.js**: These technologies allow for quick development cycles and straightforward integration with MongoDB, enhancing developer productivity and reducing time to market.
- **MongoDB**: Its flexible schema design is particularly suited for handling the diverse and evolving data model of the SUPER Assessor card game.

This API implementation will replace the current manual processes with a streamlined, digital approach, facilitating seamless integration into educators' existing workflows. As a result, educators will engage more frequently with the game, leveraging its potential to innovate assessment practices effectively.

### 3.6. Authentication

Currently, the SUPER Assessor API does not enforce authentication for access to its endpoints. This means that all operations can be performed without the need for user login or token validation.

However, as the API evolves and user data becomes more sensitive—especially with potential additions such as user-created content or personalization features—implementing a robust authentication mechanism will become crucial. In anticipation of these future requirements, I would plan to implement JWT (JSON Web Tokens) for authentication.

JWT provides a secure and efficient way to transmit information between parties as a JSON object in a compact and self-contained manner. Once implemented, developers will authenticate by obtaining a JWT after providing valid user credentials. This token must then be included in the `Authorization` header as a Bearer token for subsequent API requests that require authentication.

This planned authentication approach ensures that:

- Each request to the API can be securely and uniquely attributed to an authenticated user.
- Sensitive actions or data access can be restricted to authenticated and authorized users only.
- The API's integrity and privacy of user data are maintained, aligning with best practices for web security.

### 3.7. Considerations

In the initial design phase, various technologies were evaluated to ensure that the selected architecture best met the API's requirements. While REST with Node.js and Express.js was chosen as the primary architecture, other technologies like GraphQL and Server-Sent Events (SSE) were also considered.

**GraphQL:** Offers a powerful query language and runtime for fulfilling queries with existing data. Its flexibility allows clients to request exactly what they need and nothing more, which could be beneficial for an API serving diverse educational resources. However, the complexity of implementing GraphQL, the learning curve for the team, and the scope of the current project led to the decision to defer its adoption.

**SSE:** Known for enabling efficient real-time data streaming from server to clients, SSE could provide immediate updates to users, enhancing the interactivity of the game. Despite these advantages, SSE would introduce additional complexity in both client and server implementations. Given that the current scope of the project does not require real-time features, the added complexity did not justify its implementation. The API's current operations—CRUD actions on game resources—are well-served by REST's request-response model.

By choosing a RESTful API, we benefit from its simplicity, wide adoption, and ease of use. The REST architecture's maturity and extensive support in the developer community also ensure that we can provide comprehensive documentation and support for API consumers.

### 3.8. Technology Architecture

| Pattern | Pros                   | Cons                                 | Selected |
| ------- | ---------------------- | ------------------------------------ | :------: |
| REST    | Widely adopted, simple | Can be verbose, less flexible        |    ✔️    |
| GraphQL | Highly flexible        | Complexity, overkill                 |    ❌    |
| gRPC    | Efficient, type-safe   | Less familiar to our target audience |    ❌    |

### 3.9. Errors

| HTTP Status Code | Error Code   | Verbose Error         | Description                            |
| ---------------- | ------------ | --------------------- | -------------------------------------- |
| 400              | BadRequest   | Bad Request           | The server cannot process the request. |
| 401              | Unauthorized | Unauthorized          | Missing or invalid credentials.        |
| 404              | NotFound     | Not Found             | The requested resource was not found.  |
| 500              | ServerError  | Internal Server Error | An unexpected error occurred.          |

### 3.10. Endpoints

The SUPER Assessor API provides a range of endpoints that enable users to perform CRUD operations on users, missions, and assessments, as well as search functionality. Below is a description of each endpoint group.

#### Users

- **List Users**: `GET /users`
  Lists all users.
- **Get User by ID**: `GET /users/{userId}`
  Retrieves details of a specific user.
- **Create User**: `POST /users`
  Creates a new user.
- **Update User**: `PUT /users/{userId}`
  Updates an existing user's information.
- **Delete User**: `DELETE /users/{userId}`
  Deletes a specific user.

#### Assessments

- **Search Assessments**: `GET /assessments/search`
  - Searches for assessments based on specified criteria.
- **List Assessments**: `GET /assessments`
  - Retrieves all assessments.
- **Get Assessment by ID**: `GET /assessments/{assessmentId}`
  - Retrieves details of a specific assessment.
- **Create Assessment**: `POST /assessments`
  - Creates a new assessment.
- **Update Assessment**: `PUT /assessments/{assessmentId}`
  - Updates an existing assessment.
- **Delete Assessment**: `DELETE /assessments/{assessmentId}`
  - Deletes a specific assessment.
- **Upload Custom Icon for Assessment**: `PUT /assessments/{assessmentId}/icon`
  - Updates a specific assessment with a custom icon. The request must be `multipart/form-data` with a file field named `customIcon`.

#### Missions

- **Search Missions**: `GET /missions/search`
  - Searches for missions based on specified criteria.
- **List Missions**: `GET /missions`
  - Retrieves all missions.
- **Get Mission by ID**: `GET /missions/{missionId}`
  - Retrieves details of a specific mission.
- **Create Mission**: `POST /missions`
  - Creates a new mission.
- **Update Mission**: `PUT /missions/{missionId}`
  - Updates an existing mission.
- **Delete Mission**: `DELETE /missions/{missionId}`
  - Deletes a specific mission.
- **Upload Custom Icon for Mission**: `PUT /missions/{missionId}/icon`
  - Updates a specific mission with a custom icon. The request must be `multipart/form-data` with a file field named `customIcon`.

#### Search

- **Search Cards**: `GET /assessments/search` or `GET /missions/search`
  Searches for cards based on specified criteria.

Example search queries:

- Search for a random assessment card from a specific category, excluding certain cards:
  `GET /assessments/search?cardType=assessment&cardCategory=Context&random=1&exclude=[1,2]`
- Search for a specific number of random mission cards:
  `GET /missions/search?cardType=mission&random=3`

**Note:** Please replace `{userId}`, `{missionId}`, and `{assessmentId}` with the actual ID of the user, mission, or assessment you wish to retrieve, update, or delete.

### 3.11. Collections

#### 3.11.1. Users Collection

| Method | URI          | Action                                           |
| ------ | ------------ | ------------------------------------------------ |
| GET    | `/users`     | Retrieve a paginated list of users               |
| GET    | `/users/:id` | Retrieve detailed information of a specific user |
| POST   | `/users`     | Create a new user                                |
| PUT    | `/users/:id` | Update an existing user                          |
| DELETE | `/users/:id` | Delete a specific user                           |

#### 3.11.2. Assessments Collection

| Method | URI                     | Action                                                   |
| ------ | ----------------------- | -------------------------------------------------------- |
| GET    | `/assessments`          | Retrieve a list of all assessments                       |
| GET    | `/assessments/search`   | Search for assessments with specified criteria           |
| GET    | `/assessments/:id`      | Retrieve detailed information of a specific assessment   |
| POST   | `/assessments`          | Create a new assessment                                  |
| PUT    | `/assessments/:id`      | Update an existing assessment                            |
| PUT    | `/assessments/:id/icon` | Upload or update a custom icon for a specific assessment |
| DELETE | `/assessments/:id`      | Delete a specific assessment                             |

#### 3.11.3. Missions Collection

| Method | URI                  | Action                                                |
| ------ | -------------------- | ----------------------------------------------------- |
| GET    | `/missions`          | Retrieve a list of all missions                       |
| GET    | `/missions/search`   | Search for missions with specified criteria           |
| GET    | `/missions/:id`      | Retrieve detailed information of a specific mission   |
| POST   | `/missions`          | Create a new mission                                  |
| PUT    | `/missions/:id`      | Update an existing mission                            |
| PUT    | `/missions/:id/icon` | Upload or update a custom icon for a specific mission |
| DELETE | `/missions/:id`      | Delete a specific mission                             |
|        |

### 3.12. Events and Payloads (for Future Consideration)

In the future, the API could include events that trigger when specific actions are taken on resources like users, assessments, and missions. Here's how these might be structured:

| Event                   | Payload                                                                                                                | Description                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `UserCreated`           | `{ "id": userId, "event_type": "created", "name": string, "email": string, "createdAt": timestamp, "role": string }`   | Triggered when a new user is created, includes user details and creation time.     |
| `UserUpdated`           | `{ "id": userId, "event_type": "updated", "name": string, "email": string, "lastUpdated": timestamp, "role": string }` | Occurs when a user's information is updated, includes new user details.            |
| `UserDeleted`           | `{ "id": userId, "event_type": "deleted", "name": string, "email": string }`                                           | Fired when a user is deleted from the system, includes the ID of the deleted user. |
| `AssessmentCreated`     | `{ "id": assessmentId, "event_type": "created", "name": string, "createdAt": timestamp }`                              | Triggered when a new assessment card is created.                                   |
| `AssessmentUpdated`     | `{ "id": assessmentId, "event_type": "updated", "name": string, "lastUpdated": timestamp }`                            | Occurs when an assessment card is updated with new information.                    |
| `AssessmentIconUpdated` | `{ "id": assessmentId, "event_type": "icon_updated", "iconPath": string, "updatedAt": timestamp }`                     | Triggered when an assessment card's custom icon is updated.                        |
| `AssessmentDeleted`     | `{ "id": assessmentId, "event_type": "deleted" }`                                                                      | Fired when an assessment card is removed from the system.                          |
| `MissionCreated`        | `{ "id": missionId, "event_type": "created", "name": string, "createdAt": timestamp }`                                 | Triggered when a new mission card is created.                                      |
| `MissionUpdated`        | `{ "id": missionId, "event_type": "updated", "name": string, "lastUpdated": timestamp }`                               | Occurs when a mission card is updated.                                             |
| `MissionIconUpdated`    | `{ "id": missionId, "event_type": "icon_updated", "iconPath": string, "updatedAt": timestamp }`                        | Triggered when a mission card's custom icon is updated.                            |
| `MissionDeleted`        | `{ "id": missionId, "event_type": "deleted" }`                                                                         | Fired when a mission card is deleted.                                              |

Including events for icon updates allows for greater flexibility and integration potential.
