import {PROJECTS, TASKS, USERS } from '../constants/mockData/mockTaskData'

export const getProjectTasks = projectId => {
    return TASKS.filter(
        task => task.projectId === projectId
    );
};

export const getProjectProgress = projectId => {
    const projectTasks = getProjectTasks(projectId);

    const completed = projectTasks.filter(
        task => task.status === "Completed"
    ).length;

    const total = projectTasks.length;

    return {
        total,
        completed,
        pending: total - completed,
        progress: total
            ? Math.round((completed / total) * 100)
            : 0,
    };
};
export const getUser = userId => {
    return USERS.find(
        user => user.id === userId
    );
};

export const getProjectManager = projectId => {
    const project = PROJECTS.find(
        project => project.id === projectId
    );

    if (!project) {
        return null;
    }

    return getUser(project.managerId);
};


export const getProjectTaskCount = projectId => {
    return getProjectTasks(projectId).length;
};

export const getProjectMemberCount = projectId => {
    const project = PROJECTS.find(
        project => project.id === projectId
    );

    return project?.memberIds?.length || 0;
};

export const getProjectMembers = projectId => {
    const project = PROJECTS.find(
        project => project.id === projectId
    );

    if (!project) {
        return [];
    }

    return project.memberIds
        .map(userId => getUser(userId))
        .filter(Boolean);
};


export const getTaskUser = task => {
    return getUser(task.assignedTo);
};

export const getProjectTaskStats = projectId => {
    const projectTasks = getProjectTasks(projectId);

    return {
        total: projectTasks.length,

        completed: projectTasks.filter(
            task => task.status === "Completed"
        ).length,

        inProgress: projectTasks.filter(
            task => task.status === "In Progress"
        ).length,

        backlog: projectTasks.filter(
            task => task.status === "Backlog"
        ).length,

        testing: projectTasks.filter(
            task => task.status === "Testing"
        ).length,

        todo : projectTasks.filter(
            task => task.status === "Todo"
        ).length,

        review : projectTasks.filter(
            task => task.status === 'Review'
        ).length,

    };
};

export const getWeeklyProgress = () => {
    const week = [
        { label: "Mon", date: "2026-08-10" },
        { label: "Tue", date: "2026-08-11" },
        { label: "Wed", date: "2026-08-12" },
        { label: "Thu", date: "2026-08-13" },
        { label: "Fri", date: "2026-08-14" },
        { label: "Sat", date: "2026-08-15" },
        { label: "Sun", date: "2026-08-16" },
    ];

    return week.map(day => {
        const completedTasks = TASKS.filter(
            task =>
                task.status === "Completed" &&
                task.completedAt?.startsWith(day.date)
        );

        const uniqueUsers = new Set(
            completedTasks.map(task => task.assignedTo)
        );

        return {
            ...day,
            completed: completedTasks.length,
            users: uniqueUsers.size,
        };
    });
};