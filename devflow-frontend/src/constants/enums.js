/**
 * DevFlow Enum Constants mapping to backend .NET 9 ASP.NET Core Enums (details.md)
 */

export const UserRole = {
  Admin: 0,
  Manager: 1,
  Member: 2,
};

export const WorkspaceRole = {
  Owner: 0,
  Admin: 1,
  Member: 2,
};

export const TaskPriority = {
  Low: 0,
  Medium: 1,
  High: 2,
};

export const TaskStatus = {
  Todo: 0,
  InProgress: 1,
  Completed: 2,
};

export const NotificationType = {
  TaskAssigned: 0,
  TaskCompleted: 1,
  ProjectCreated: 2,
  MemberAdded: 3,
  Workflow: 4,
};

export const NotificationRecipient = {
  Assignee: 0,
  Reporter: 1,
  ProjectManager: 2,
  Creator: 3,
  WorkspaceMember: 4,
};

export const WorkflowTrigger = {
  TaskAssigned: 0,
  TaskCompleted: 1,
  ProjectCreated: 2,
};

export const WorkflowActionType = {
  NotifyUser: 0,
};

export const WorkflowOperator = {
  Equals: 0,
  NotEquals: 1,
  GreaterThan: 2,
  LessThan: 3,
  GreaterThanOrEqual: 4,
  LessThanOrEqual: 5,
  Contains: 6,
};
