
export const USERS = [
    {
        id: "user_1",
        firstName: "Alex",
        lastName: "Chen",
        role: "Senior Designer",
        email: "alex@example.com",
    },
    {
        id: "user_2",
        firstName: "Sarah",
        lastName: "Kim",
        role: "Backend Engineer",
        email: "sarah@example.com",
    },
    {
        id: "user_3",
        firstName: "Mike",
        lastName: "Ross",
        role: "Frontend Developer",
        email: "mike@example.com",
    },
    {
        id: "user_4",
        firstName: "Emma",
        lastName: "Davis",
        role: "QA Engineer",
        email: "emma@example.com",
    },
];

export const PROJECTS = [
    {
        id: "project_1",
        name: "Mobile App Redesign",
        description: "Redesign and improve the mobile application experience.",
        managerId: "user_1",
        memberIds: ["user_1", "user_2", "user_3", "user_4"],
        priority: "High",
        status: "Active",
        statusText: "In Progress",
        startDate: "2026-08-01",
        endDate: "2026-12-28",
    },

    {
        id: "project_2",
        name: "API Integration v3",
        description: "Integrate and improve application API services.",
        managerId: "user_2",
        memberIds: ["user_1", "user_2", "user_3", "user_4"],
        priority: "Critical",
        status: "Active",
        statusText: "Todo",
        startDate: "2026-08-05",
        endDate: "2026-11-15",
    },

    {
        id: "project_3",
        name: "Dashboard Analytics",
        description: "Build and improve dashboard analytics.",
        managerId: "user_3",
        memberIds: ["user_1", "user_2", "user_3"],
        priority: "Medium",
        status: "Review",
        statusText: "Review",
        startDate: "2026-08-01",
        endDate: "2026-12-10",
    },

    {
        id: "project_4",
        name: "E-Commerce Platform",
        description: "Develop and launch the e-commerce platform.",
        managerId: "user_4",
        memberIds: ["user_1", "user_2", "user_3", "user_4"],
        priority: "Low",
        status: "Done",
        statusText: "Completed",
        startDate: "2026-07-30",
        endDate: "2026-11-30",
    },
];

export const TASKS = [

    {
        id: "task_01",
        projectId: "project_1",
        title: "Redesign login screen",
        status: "Completed",
        assignedTo: "user_1",
        completedAt: "2026-08-10T10:00:00",
    },
    {
        id: "task_02",
        projectId: "project_1",
        title: "Create dashboard wireframe",
        status: "Completed",
        assignedTo: "user_2",
        completedAt: "2026-08-10T14:30:00",
    },
    {
        id: "task_03",
        projectId: "project_1",
        title: "Update navigation flow",
        status: "Completed",
        assignedTo: "user_3",
        completedAt: "2026-08-10T16:00:00",
    },
    {
        id: "task_04",
        projectId: "project_1",
        title: "Build project card UI",
        status: "Completed",
        assignedTo: "user_1",
        completedAt: "2026-08-11T09:30:00",
    },
    {
        id: "task_05",
        projectId: "project_1",
        title: "Build task list UI",
        status: "Completed",
        assignedTo: "user_2",
        completedAt: "2026-08-11T13:00:00",
    },
    {
        id: "task_06",
        projectId: "project_1",
        title: "Add task status badge",
        status: "Completed",
        assignedTo: "user_3",
        completedAt: "2026-08-12T10:15:00",
    },
    {
        id: "task_07",
        projectId: "project_1",
        title: "Implement search UI",
        status: "Completed",
        assignedTo: "user_4",
        completedAt: "2026-08-12T12:00:00",
    },
    {
        id: "task_08",
        projectId: "project_1",
        title: "Add notification UI",
        status: "In Progress",
        assignedTo: "user_1",
        completedAt: null,
    },
    {
        id: "task_09",
        projectId: "project_1",
        title: "Improve responsive spacing",
        status: "Testing",
        assignedTo: "user_2",
        completedAt: null,
    },
    {
        id: "task_10",
        projectId: "project_1",
        title: "Test dashboard layout",
        status: "Testing",
        assignedTo: "user_3",
        completedAt: null,
    },
    {
        id: "task_11",
        projectId: "project_1",
        title: "Fix profile screen issues",
        status: "Backlog",
        assignedTo: "user_4",
        completedAt: null,
    },
    {
        id: "task_12",
        projectId: "project_1",
        title: "Review mobile UI",
        status: "In Progress",
        assignedTo: "user_1",
        completedAt: null,
    },


    {
        id: "task_13",
        projectId: "project_2",
        title: "Create API service",
        status: "In Progress",
        assignedTo: "user_1",
        completedAt: "2026-08-11T15:00:00",
    },
    {
        id: "task_14",
        projectId: "project_2",
        title: "Add authentication API",
        status: "Completed",
        assignedTo: "user_2",
        completedAt: "2026-08-12T09:00:00",
    },
    {
        id: "task_15",
        projectId: "project_2",
        title: "Integrate projects endpoint",
        status: "Completed",
        assignedTo: "user_3",
        completedAt: "2026-08-12T11:00:00",
    },
    {
        id: "task_16",
        projectId: "project_2",
        title: "Integrate tasks endpoint",
        status: "Completed",
        assignedTo: "user_4",
        completedAt: "2026-08-12T14:00:00",
    },
    {
        id: "task_17",
        projectId: "project_2",
        title: "Handle API errors",
        status: "Completed",
        assignedTo: "user_1",
        completedAt: "2026-08-13T10:30:00",
    },
    {
        id: "task_18",
        projectId: "project_2",
        title: "Add loading states",
        status: "In Progress",
        assignedTo: "user_2",
        completedAt: null,
    },
    {
        id: "task_19",
        projectId: "project_2",
        title: "Add retry handling",
        status: "Testing",
        assignedTo: "user_3",
        completedAt: null,
    },
    {
        id: "task_20",
        projectId: "project_2",
        title: "Validate API responses",
        status: "Testing",
        assignedTo: "user_4",
        completedAt: null,
    },
    {
        id: "task_21",
        projectId: "project_2",
        title: "Update API documentation",
        status: "Backlog",
        assignedTo: "user_1",
        completedAt: null,
    },
    {
        id: "task_22",
        projectId: "project_2",
        title: "Test API integration",
        status: "In Progress",
        assignedTo: "user_2",
        completedAt: null,
    },

    {
        id: "task_23",
        projectId: "project_3",
        title: "Create analytics dashboard",
        status: "Completed",
        assignedTo: "user_3",
        completedAt: "2026-08-11T10:00:00",
    },
    {
        id: "task_24",
        projectId: "project_3",
        title: "Create analytics charts",
        status: "Completed",
        assignedTo: "user_1",
        completedAt: "2026-08-12T10:00:00",
    },
    {
        id: "task_25",
        projectId: "project_3",
        title: "Add filter functionality",
        status: "Completed",
        assignedTo: "user_2",
        completedAt: "2026-08-13T10:00:00",
    },
    {
        id: "task_26",
        projectId: "project_3",
        title: "Test analytics",
        status: "Testing",
        assignedTo: "user_3",
        completedAt: null,
    },
    {
        id: "task_27",
        projectId: "project_3",
        title: "Fix chart responsiveness",
        status: "In Progress",
        assignedTo: "user_1",
        completedAt: null,
    },
    {
        id: "task_28",
        projectId: "project_4",
        title: "Create product listing",
        status: "Completed",
        assignedTo: "user_4",
        completedAt: "2026-08-10T10:00:00",
    },
    {
        id: "task_29",
        projectId: "project_4",
        title: "Create shopping cart",
        status: "Completed",
        assignedTo: "user_1",
        completedAt: "2026-08-11T10:00:00",
    },
    {
        id: "task_30",
        projectId: "project_4",
        title: "Implement checkout",
        status: "Completed",
        assignedTo: "user_2",
        completedAt: "2026-08-12T10:00:00",
    },
    {
        id: "task_31",
        projectId: "project_4",
        title: "Test payment flow",
        status: "Completed",
        assignedTo: "user_3",
        completedAt: "2026-08-13T10:00:00",
    },
];

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