# DevFlow Frontend Integration & API Reference (`details.md`)

This document is the **complete, production-accurate technical guide** for building and connecting the **DevFlow React + JavaScript Frontend** (`devflow-frontend`) to the **DevFlow ASP.NET Core Backend API**.

It contains all API endpoints, exact route structures, HTTP methods, request/response models, query parameters, enums, error contracts, Axios client setup, and SignalR WebSocket specs tailored for **React + JavaScript + Vite**.

---

## 1. Tech Stack & Environment Setup

- **Frontend Tech**: React 19 + JavaScript (ES Modules) + Vite + TailwindCSS
- **HTTP Client**: Axios (`axios`)
- **Routing**: React Router DOM v7 (`react-router-dom`)
- **WebSockets**: `@microsoft/signalr` (Install via: `npm install @microsoft/signalr`)
- **Base Backend HTTP URL**: `http://localhost:5000` / `https://localhost:7001`
- **SignalR WebSocket URL**: `http://localhost:5000/notificationHub`
- **Vite Dev Server URL**: `http://localhost:5173`
- **Content-Type**: `application/json`

---

## 2. Global API Envelope & Error Handlers

### 2.1 Standard API Envelope (`ApiResponse<T>`)
All successful HTTP endpoints return data wrapped inside the `ApiResponse<T>` envelope:

```json
{
  "success": true,
  "message": "Operation response message",
  "data": { ... } // Single Object, PagedResult<T>, Array, or null
}
```

### 2.2 Global Exception & Error Envelopes
When an error occurs, the server responds with one of the following JSON structures depending on the exception type:

#### 1. Validation Error (`400 Bad Request`)
Occurs when request body or parameters fail validation rules:
```json
{
  "message": "One or more validation errors occurred.",
  "errors": [
    "Title is required.",
    "Priority must be a valid enum value."
  ]
}
```

#### 2. Domain & Business Errors (`401`, `403`, `404`, `409`)
- `401 Unauthorized`: Token missing, expired, or invalid credentials (`UnauthorizedException`)
- `403 Forbidden`: Insufficient role or workspace/project permissions (`ForbiddenException`)
- `404 Not Found`: Target entity (Task, Project, Workspace, User, Workflow) does not exist (`NotFoundException`)
- `409 Conflict`: Resource state collision or duplicate member (`ConflictException`)

```json
{
  "message": "User is not a member of this workspace"
}
```

---

## 3. Axios Client Setup & Token Interceptor (React + JavaScript)

Create an Axios client instance with request and response interceptors to automatically attach Bearer JWT tokens and handle token refreshes:

```javascript
// src/api/axiosClient.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Access Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Handle 401 & Auto-Refresh Token
api.interceptors.response.use(
  (response) => response.data, // Automatically return response envelope data
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const res = await axios.post(`${API_BASE_URL}/api/Auth/refresh`, { refreshToken });
          if (res.data?.success) {
            const { token, refreshToken: newRefreshToken } = res.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', newRefreshToken);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
```

---

## 4. SignalR WebSockets Connection Setup (React Hook)

Install `@microsoft/signalr` (`npm install @microsoft/signalr`) and use this custom React hook to receive real-time notifications:

```javascript
// src/hooks/useSignalRNotification.js
import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalRNotification = (onNotificationReceived) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/notificationHub', {
        accessTokenFactory: () => localStorage.getItem('token'),
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveNotification', (notification) => {
      console.log('Real-time notification received:', notification);
      if (onNotificationReceived) {
        onNotificationReceived(notification);
      }
    });

    connection.start().catch((err) => console.error('SignalR connection error:', err));

    return () => {
      connection.stop();
    };
  }, [onNotificationReceived]);
};
```

---

## 5. Complete Enums Reference

> **CRITICAL FOR REACT DEVELOPERS**: Always send enum values as **integers** to the backend API.

### `UserRole`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Admin` | `0` | Platform Administrator |
| `Manager` | `1` | Manager |
| `Member` | `2` | Standard User |

### `WorkspaceRole`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Owner` | `0` | Workspace Owner (Full Admin Rights) |
| `Admin` | `1` | Workspace Administrator |
| `Member` | `2` | Workspace Member |

### `ProjectRole`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Owner` | `0` | Project Owner |
| `Admin` | `1` | Project Administrator |
| `Member` | `2` | Project Member |

### `TaskPriority`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Low` | `0` | Low Priority Task |
| `Medium` | `1` | Normal / Medium Priority |
| `High` | `2` | High / Urgent Priority |

### `TaskStatus`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Todo` | `0` | Backlog / Todo column |
| `InProgress` | `1` | In Progress column |
| `Completed` | `2` | Completed / Done column |

### `NotificationType`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `TaskAssigned` | `0` | Task assigned to user |
| `TaskCompleted` | `1` | Task marked completed |
| `ProjectCreated` | `2` | Project created |
| `MemberAdded` | `3` | Added to workspace/project |
| `Workflow` | `4` | Triggered by automation rule |

### `WorkflowTrigger`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `TaskAssigned` | `0` | Event when task assignee updates |
| `TaskCompleted` | `1` | Event when task status changes to Completed |
| `ProjectCreated` | `2` | Event when a project is created |

### `WorkflowActionType`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `NotifyUser` | `0` | Send persistent + SignalR notification |

### `WorkflowOperator`
| Name | Integer Value | Description |
| :--- | :--- | :--- |
| `Equals` | `0` | `==` exact match |
| `NotEquals` | `1` | `!=` not equal |
| `GreaterThan` | `2` | `>` numeric / date greater |
| `LessThan` | `3` | `<` numeric / date less |
| `GreaterThanOrEqual` | `4` | `>=` greater or equal |
| `LessThanOrEqual` | `5` | `<=` less or equal |
| `Contains` | `6` | Substring match |

---

## 6. Common Utility Models & DTOs

### `PaginationRequest` (Query Parameters)
Used across paginated `GET` endpoints:
- `pageNumber`: `number` (integer, default: `1`)
- `pageSize`: `number` (integer, default: `10`)
- `searchTerm`: `string | null` (optional search keyword)
- `sortBy`: `string | null` (property name to sort by)
- `descending`: `boolean` (default: `false`)

### `PagedResult<T>` (Pagination Response Envelope)
```json
{
  "items": [],
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 1,
  "totalCount": 0,
  "hasPreviousPage": false,
  "hasNextPage": false
}
```

### `NotificationRealtimeModel` (SignalR WebSocket Payload)
```javascript
{
  userId: 2,
  message: "Task assigned to you",
  type: 0, // NotificationType enum (0 = TaskAssigned)
  referenceId: 101, // Associated task/project ID
  createdAt: "2026-07-31T18:00:00Z"
}
```

---

## 7. Comprehensive API Modules & Endpoint Specifications

---

### MODULE 1: Auth API (`/api/Auth`)

#### 1.1 Register User
- **HTTP Method**: `POST`
- **Endpoint**: `/api/Auth/Register`
- **Authentication**: Public
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!",
    "role": 2
  }
  ```

#### 1.2 Login User
- **HTTP Method**: `POST`
- **Endpoint**: `/api/Auth/Login`
- **Authentication**: Public
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Login Successfull",
    "data": {
      "token": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "a4b2c3...",
      "refreshTokenExpiresAt": "2026-08-07T18:00:00Z"
    }
  }
  ```

#### 1.3 Refresh Access Token
- **HTTP Method**: `POST`
- **Endpoint**: `/api/Auth/refresh`
- **Authentication**: Public
- **Request Body**:
  ```json
  {
    "refreshToken": "a4b2c3..."
  }
  ```

#### 1.4 Logout User
- **HTTP Method**: `POST`
- **Endpoint**: `/api/Auth/logout`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "refreshToken": "a4b2c3..."
  }
  ```

---

### MODULE 2: Workspace API (`/api/workspaces`)

#### 2.1 Create Workspace
- **HTTP Method**: `POST`
- **Endpoint**: `/api/workspaces`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "name": "Frontend Engineering"
  }
  ```

#### 2.2 Get My Workspaces (Paginated)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/workspaces/my`
- **Authentication**: Required (`[Authorize]`)
- **Query Parameters**: `pageNumber`, `pageSize`, `searchTerm`, `sortBy`, `descending`

#### 2.3 Get Workspace By ID
- **HTTP Method**: `GET`
- **Endpoint**: `/api/workspaces/{workspaceId}`
- **Authentication**: Required (`[Authorize]`)

#### 2.4 Get Workspace Members (Paginated)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/workspaces/{workspaceId}/members`
- **Authentication**: Required (`[Authorize]`)

#### 2.5 Add Workspace Member
- **HTTP Method**: `POST`
- **Endpoint**: `/api/workspaces/{workspaceId}/members`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "email": "developer@example.com",
    "role": 2 // WorkspaceRole (0 = Owner, 1 = Admin, 2 = Member)
  }
  ```

#### 2.6 Remove Workspace Member
- **HTTP Method**: `DELETE`
- **Endpoint**: `/api/workspaces/{workspaceId}/members/{userId}`
- **Authentication**: Required (`[Authorize]`)

---

### MODULE 3: Project API (`/api/projects`)

#### 3.1 Create Project
- **HTTP Method**: `POST`
- **Endpoint**: `/api/projects`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "name": "DevFlow Web App",
    "description": "React & Tailwind frontend application",
    "workspaceId": 1
  }
  ```

#### 3.2 Get Project By ID
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{Id}`
- **Authentication**: Required (`[Authorize]`)

#### 3.3 Get Projects By Workspace (Paginated)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/workspace/{workspaceId}`
- **Authentication**: Required (`[Authorize]`)
- **Query Parameters**: `pageNumber`, `pageSize`, `searchTerm`, `sortBy`, `descending`

#### 3.4 Update Project
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/projects/{ProjectId}`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "name": "Updated Project Name",
    "description": "Updated description"
  }
  ```

---

### MODULE 4: Project Members API (`/api/projects/{projectId}/members`)

#### 4.1 Add Project Member
- **HTTP Method**: `POST`
- **Endpoint**: `/api/projects/{projectId}/members`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "userId": 2,
    "role": 2 // ProjectRole (0 = Owner, 1 = Admin, 2 = Member)
  }
  ```

#### 4.2 Get Project Members
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{projectId}/members`
- **Authentication**: Required (`[Authorize]`)

#### 4.3 Remove Project Member
- **HTTP Method**: `DELETE`
- **Endpoint**: `/api/projects/{projectId}/members/{userId}`
- **Authentication**: Required (`[Authorize]`)

---

### MODULE 5: Task API (`/api/projects/{projectId}/tasks`)

> **IMPORTANT**: Task endpoints are scoped under `/api/projects/{projectId}/tasks`.

#### 5.1 Create Task
- **HTTP Method**: `POST`
- **Endpoint**: `/api/projects/{projectId}/tasks`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "title": "Design Workspace Dashboard",
    "description": "Create modern UI layout with stats",
    "dueDate": "2026-08-15T12:00:00Z",
    "priority": 2 // TaskPriority (0 = Low, 1 = Medium, 2 = High)
  }
  ```

#### 5.2 Get Tasks By Project (Paginated & Filtered)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{projectId}/tasks`
- **Authentication**: Required (`[Authorize]`)
- **Query Parameters**:
  - `pageNumber` (int, default: 1)
  - `pageSize` (int, default: 10)
  - `searchTerm` (string, optional)
  - `sortBy` (string, optional)
  - `descending` (bool, default: false)
  - `status` (TaskStatus enum: 0 = Todo, 1 = InProgress, 2 = Completed, optional)
  - `priority` (TaskPriority enum: 0 = Low, 1 = Medium, 2 = High, optional)
  - `assignedToUserId` (int, optional)

#### 5.3 Get Task By ID
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{projectId}/tasks/{taskId}`
- **Authentication**: Required (`[Authorize]`)

#### 5.4 Update Task Details
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/projects/{projectId}/tasks/{taskId}`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated details",
    "dueDate": "2026-08-20T12:00:00Z",
    "priority": 1
  }
  ```

#### 5.5 Update Task Status (Kanban Drag & Drop)
- **HTTP Method**: `PATCH`
- **Endpoint**: `/api/projects/{projectId}/tasks/{taskId}/status`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "status": 1 // TaskStatus (0 = Todo, 1 = InProgress, 2 = Completed)
  }
  ```

#### 5.6 Update Task Assignee
- **HTTP Method**: `PATCH`
- **Endpoint**: `/api/projects/{projectId}/tasks/{taskId}/assignee`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "assignedToUserId": 2 // User ID to assign (or null to unassign)
  }
  ```

#### 5.7 Delete Task
- **HTTP Method**: `DELETE`
- **Endpoint**: `/api/projects/{projectId}/tasks/{taskId}`
- **Authentication**: Required (`[Authorize]`)

---

### MODULE 6: Workflow API (`/api/projects/{projectId}/workflows`)

> **IMPORTANT**: Workflow endpoints are scoped under `/api/projects/{projectId}/workflows`.

#### 6.1 Create Workflow Rule
- **HTTP Method**: `POST`
- **Endpoint**: `/api/projects/{projectId}/workflows`
- **Authentication**: Required (`[Authorize]`)
- **Request Body**:
  ```json
  {
    "name": "Auto Notify Assignee on High Priority Task",
    "description": "Sends notification when high priority task is assigned",
    "trigger": 0, // WorkflowTrigger (0 = TaskAssigned, 1 = TaskCompleted, 2 = ProjectCreated)
    "isEnabled": true,
    "conditions": [
      {
        "field": "Priority",
        "operator": 0, // Equals
        "value": "2"   // High Priority
      }
    ],
    "actions": [
      {
        "actionType": 0, // NotifyUser
        "parameters": "{\"Recipient\":0,\"Message\":\"High priority task assigned to you\"}",
        "order": 1
      }
    ]
  }
  ```

#### 6.2 Get Workflows By Project (Paginated)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{projectId}/workflows`
- **Authentication**: Required (`[Authorize]`)

#### 6.3 Get Workflow By ID
- **HTTP Method**: `GET`
- **Endpoint**: `/api/projects/{projectId}/workflows/{workflowId}`
- **Authentication**: Required (`[Authorize]`)

#### 6.4 Update Workflow Rule
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/projects/{projectId}/workflows/{workflowId}`
- **Authentication**: Required (`[Authorize]`)

#### 6.5 Enable Workflow
- **HTTP Method**: `PATCH`
- **Endpoint**: `/api/projects/{projectId}/workflows/{workflowId}/enable`
- **Authentication**: Required (`[Authorize]`)

#### 6.6 Disable Workflow
- **HTTP Method**: `PATCH`
- **Endpoint**: `/api/projects/{projectId}/workflows/{workflowId}/disable`
- **Authentication**: Required (`[Authorize]`)

---

### MODULE 7: Notification API (`/api/notifications`)

#### 7.1 Get User Notifications (Paginated)
- **HTTP Method**: `GET`
- **Endpoint**: `/api/notifications`
- **Authentication**: Required (`[Authorize]`)
- **Query Parameters**: `pageNumber`, `pageSize`, `isRead`

#### 7.2 Get Unread Notification Count
- **HTTP Method**: `GET`
- **Endpoint**: `/api/notifications/unread-count`
- **Authentication**: Required (`[Authorize]`)

#### 7.3 Mark Single Notification as Read
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/notifications/{notificationId}/read`
- **Authentication**: Required (`[Authorize]`)

#### 7.4 Mark All Notifications as Read
- **HTTP Method**: `PUT`
- **Endpoint**: `/api/notifications/read-all`
- **Authentication**: Required (`[Authorize]`)
