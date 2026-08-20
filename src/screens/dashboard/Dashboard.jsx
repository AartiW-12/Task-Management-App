import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, } from "react-native";
import { moderateScale, scale, verticalScale, } from "react-native-size-matters";
import Svg, { Path, Defs, LinearGradient, Stop, Line, } from "react-native-svg";
import { auth, db } from "../../firebase/firebaseConfig";
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from "../../constants/style/ConstantStyling";
import NotificationIcon from '../../assets/images/Icons/NotificationIcon.svg'
import SearchIcon from '../../assets/images/Icons/SearchIcon.svg'
import ProjectIcon from '../../assets/images/Icons/ProjectsIcon.svg'
import TasksIcon from '../../assets/images/Icons/TasksIcon.svg'
import PendingIcon from '../../assets/images/Icons/PendingIcon.svg'
import DoneIcon from '../../assets/images/Icons/DoneIcon.svg'
import { Strings } from "../../constants/strings/Strings";
import StatusBadge from "../../components/statusBadge/StatusBadge";
import { SafeAreaView } from "react-native-safe-area-context";
import { PROJECTS, TASKS, getProjectProgress, getWeeklyProgress, } from "../../constants/mockData/mockTaskData";


const Dashboard = ({ navigation }) => {

    const [userProfile, setUserProfile] = useState(null)

    //getting user credentials like name
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const user = auth.currentUser
                if (!user) {
                    console.log("No User Logged In")
                    return
                }
                const userDoc = await db
                    .collection('users')
                    .doc(user.uid)
                    .get()
                if (userDoc.exists) {
                    const data = userDoc.data()
                    setUserProfile(data)
                } else {
                    setUserProfile({
                        firstName: user.displayName?.split(' ')[0] || '',
                        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                        email: user.email || '',
                        photoURL: user.photoURL || '',
                    })
                    console.log("Using Firebase Auth profile:", user.displayName)
                }
            } catch (err) {
                console.log("ERROR WHILE GETTING DATA", err)
            }
        }
        getUserProfile()
    }, [])

    //category card common function 
    const renderCategoryCard = item => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.statCard}
                activeOpacity={0.8}
                onPress={() => {
                    if (item.id === "projects") {
                        navigation.navigate("Projects");
                    }
                    if (item.id === "tasks") {
                        navigation.navigate("Tasks");
                    }
                }}
            >
                <View style={styles.statTopRow}>
                    <item.icon
                        width={moderateScale(35)}
                        height={moderateScale(35)}
                    />
                    {item.change !== null && (
                        <Text
                            style={[
                                styles.changeText,
                                item.change.startsWith("-") &&
                                styles.negativeChange,
                            ]}
                        >
                            {item.change}
                        </Text>
                    )}
                </View>
                <Text style={styles.statValue}>
                    {item.value}
                </Text>
                <Text style={styles.statTitle}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    const isCompletedStatus = (status) => {
        const normalizedStatus = String(status || "").toLowerCase();
        return (
            normalizedStatus === "completed" ||
            normalizedStatus === "complete" ||
            normalizedStatus === "done"
        );
    };

    const weeklyProgress = getWeeklyProgress();
    const chartWidth = 700;
    const chartHeight = 240;

    const chartMax = Math.max(5, ...weeklyProgress.map((item) => item.completed)
    );

    const chartPoints = weeklyProgress.map((item, index) => {
        const x =
            (index / (weeklyProgress.length - 1)) *
            chartWidth;
        const y =
            chartHeight -
            (item.completed / chartMax) *
            chartHeight;
        return {
            x,
            y,
        };
    });

    const chartPath = chartPoints
        .map((point, index) => {
            return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
        })
        .join(" ");

    const chartAreaPath = `${chartPath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
    const totalProjects = PROJECTS.length;

    const totalTasks = TASKS.length;

    const completedTasks = TASKS.filter(task =>
        isCompletedStatus(task.status)
    ).length;

    const pendingTasks = TASKS.filter(task =>
        !isCompletedStatus(task.status)
    ).length;

    const dashboardStatistics = [
        {
            id: "projects",
            title: "Projects",
            value: totalProjects,
            change: "+2",
            icon: ProjectIcon,
        },
        {
            id: "tasks",
            title: "Tasks",
            value: totalTasks,
            change: "+8",
            icon: TasksIcon,
        },
        {
            id: "pending",
            title: "Pending",
            value: pendingTasks,
            change: "-3",
            icon: PendingIcon,
        },
        {
            id: "done",
            title: "Done",
            value: completedTasks,
            change: "+11",
            icon: DoneIcon,
        },
    ];

    const activeProjects = PROJECTS.filter(
        project => !isCompletedStatus(project.status)
    );

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.avatarText}>
                                {userProfile
                                    ? `${userProfile.firstName?.charAt(0) || ""}${userProfile.lastName?.charAt(0) || ""}`
                                    : "AC"}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greeting}>{Strings.greeting}</Text>
                            <Text
                                style={styles.userName}
                                numberOfLines={1}
                            >
                                {userProfile
                                    ? `${userProfile.firstName || ""} ${userProfile.lastName || ""}`
                                    : "Loading..."}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.headerButton}
                            activeOpacity={0.7}
                        >
                            <SearchIcon
                                width={moderateScale(18)}
                                height={moderateScale(18)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerButton}
                            activeOpacity={0.7}
                        >
                            <NotificationIcon
                                width={moderateScale(18)}
                                height={moderateScale(18)}
                            />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.statisticsContainer}>
                    {dashboardStatistics.map(renderCategoryCard)}
                </View>
                <View style={styles.progressCard}>
                    <Text style={styles.sectionTitle}>
                        Weekly Progress
                    </Text>
                    <View style={styles.chartContainer}>
                        <View style={styles.chartYAxis}>
                            <Text style={styles.axisText}>20</Text>
                            <Text style={styles.axisText}>15</Text>
                            <Text style={styles.axisText}>10</Text>
                            <Text style={styles.axisText}>5</Text>
                            <Text style={styles.axisText}>0</Text>
                        </View>
                        <View style={styles.chartArea}>
                            <Svg
                                width="100%"
                                height="100%"
                                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                                preserveAspectRatio="none"
                            >
                                <Defs>
                                    <LinearGradient
                                        id="chartGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <Stop
                                            offset="0"
                                            stopColor="#7346FF"
                                            stopOpacity="0.20"
                                        />
                                        <Stop
                                            offset="1"
                                            stopColor="#7346FF"
                                            stopOpacity="0"
                                        />
                                    </LinearGradient>
                                </Defs>
                                {[0, 60, 120, 180, 240].map((y) => (
                                    <Line
                                        key={y}
                                        x1="0"
                                        y1={y}
                                        x2={chartWidth}
                                        y2={y}
                                        stroke="#E9EDF4"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                    />
                                ))}
                                <Path
                                    d={chartAreaPath}
                                    fill="url(#chartGradient)"
                                />
                                <Path
                                    d={chartPath}
                                    fill="none"
                                    stroke="#7346FF"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.chartLabels}>
                        {weeklyProgress.map(item => (
                            <Text
                                key={item.date}
                                style={styles.chartLabel}
                            >
                                {item.label}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.projectsHeader}>
                    <Text style={styles.sectionTitle}>
                        Active Projects
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Projects")}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.seeAll}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                {activeProjects.map(project => {
                    const progress = getProjectProgress(project.id);
                    return (
                        <TouchableOpacity
                            key={project.id}
                            style={styles.projectCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("ProjectDetails", { project: project })}
                        >
                            <View style={styles.projectIcon}>
                                <ProjectIcon
                                    width={moderateScale(35)}
                                    height={moderateScale(35)}
                                />
                            </View>
                            <View style={styles.projectContent}>
                                <View style={styles.projectTitleRow}>
                                    <Text
                                        style={styles.projectName}
                                        numberOfLines={1}
                                    >
                                        {project.name}
                                    </Text>
                                    <StatusBadge
                                        text={project.priority}
                                    />
                                </View>
                                <View style={styles.progressRow}>
                                    <View style={styles.progressBackground}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: `${progress.progress}%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.progressPercentage}>
                                        {progress.progress}%
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingBottom: 50,
    },
    scrollContent: {
        paddingHorizontal: Spacings.lg,
        paddingTop: Spacings.vmd,
        paddingBottom: Numbers.num20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacings.vxl,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: Numbers.num34,
        height: Numbers.num34,
        borderRadius: Spacings.mxl,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: Colors.white,
        fontSize: Spacings.sm,
        fontWeight: "700",
    },
    greetingContainer: {
        marginLeft: Spacings.xs,
    },
    greeting: {
        fontSize: Spacings.msm,
        color: Colors.darkGray,
        marginBottom: Numbers.p2,
    },
    userName: {
        fontSize: Spacings.mmd,
        color: Colors.textColor,
        fontWeight: fontWeights.w700,
    },
    headerActions: {
        flexDirection: "row",
        gap: Spacings.msm,
    },
    headerButton: {
        width: Numbers.num34,
        height: Numbers.num34,
        borderRadius: Spacings.mxl,
        backgroundColor: Colors.inputBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    notificationDot: {
        position: 'absolute',
        top: Numbers.num7,
        right: Spacings.mxs,
        width: Numbers.num7,
        height: Numbers.num7,
        borderRadius: Numbers.num4,
        backgroundColor: Colors.danger,
    },
    statisticsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    statCard: {
        width: "48.5%",
        backgroundColor: Colors.white,
        borderRadius: Spacings.mlg,
        paddingHorizontal: Spacings.lg,
        paddingVertical: Spacings.sm,
        marginBottom: Spacings.vxs,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    statTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statIcon: {
        width: Spacings.heading,
        height: Spacings.heading,
        borderRadius: Spacings.xs,
        justifyContent: "center",
        alignItems: "center",
    },
    changeText: {
        color: Colors.sucess,
        fontSize: Spacings.mxs,
        fontWeight: fontWeights.w600,
    },
    negativeChange: {
        color: Colors.danger,
    },
    statValue: {
        marginTop: Spacings.vxs,
        fontSize: fontSizes.xxl,
        fontWeight: fontWeights.w700,
        color: Colors.textColor,
    },
    statTitle: {
        marginTop: verticalScale(1),
        fontSize: Spacings.mxs,
        color: Colors.darkGray,
    },
    progressCard: {
        backgroundColor: Colors.white,
        borderRadius: Spacings.sm,
        paddingHorizontal: Spacings.md,
        paddingVertical: Spacings.vmd,
        borderWidth: 1,
        borderColor: Colors.gray,
        marginTop: verticalScale(1),
    },
    sectionTitle: {
        fontSize: Spacings.sm,
        fontWeight: fontSizes.w700,
        color: Colors.textColor,
        fontFamily: Fonts.semiBold
    },
    chartContainer: {
        height: Spacings.h110,
        flexDirection: "row",
        marginTop: Spacings.sm,
    },
    chartYAxis: {
        width: Spacings.xxl,
        justifyContent: "space-between",
        paddingVertical: verticalScale(2),
    },
    axisText: {
        fontSize: fontSizes.xs,
        color: Colors.darkGray,
    },
    chartArea: {
        flex: 1,
        position: "relative",
        justifyContent: "space-between",
    },
    horizontalLine: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.gray
    },
    fakeChart: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    chartPoint: {
        position: "absolute",
        width: Spacings.xxs,
        height: Spacings.xxs,
        borderRadius: scale(3),
        backgroundColor: Colors.primary,
        transform: [
            {
                translateX: -scale(3),
            },
            {
                translateY: scale(3),
            },
        ],
    },
    chartLabels: {
        marginLeft: Spacings.xxl,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Spacings.vxs,
    },
    chartLabel: {
        fontSize: fontSizes.xs,
        color: Colors.darkGray,
    },
    projectsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: Spacings.vxl,
        marginBottom: Spacings.vxs,
    },
    seeAll: {
        fontSize: Spacings.mxs,
        color: Colors.primary,
        fontWeight: fontWeights.w600,
    },
    projectCard: {
        backgroundColor: Colors.white,
        borderRadius: Spacings.mlg,
        padding: Spacings.sm,
        marginBottom: Spacings.vxs,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    projectIcon: {
        width: Spacings.arrowSize,
        height: Spacings.arrowSize,
        borderRadius: Spacings.sm,
        justifyContent: "center",
        alignItems: "center",
    },
    projectContent: {
        flex: 1,
        marginLeft: Spacings.xs,
        paddingVertical: 5
    },
    projectTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    projectName: {
        flex: 1,
        fontSize: Spacings.msm,
        color: Colors.textColor,
        fontWeight: fontWeights.w600,
    },
    priorityBadge: {
        paddingHorizontal: Spacings.xs,
        paddingVertical: verticalScale(5),
        borderRadius: Spacings.lg,
        backgroundColor: Colors.priorityBadge,
        marginLeft: scale(5),
    },
    priorityText: {
        fontSize: fontSizes.xxs,
        color: Colors.BagdeText,
        fontWeight: fontWeights.w600,
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: verticalScale(7),
    },
    progressBackground: {
        flex: 1,
        height: verticalScale(4),
        backgroundColor: Colors.gray,
        borderRadius: verticalScale(2),
        overflow: "hidden",
    },
    progressFill: {
        height: Spacings.fullWidth,
        backgroundColor: Colors.primary,
        borderRadius: verticalScale(2),
    },
    progressPercentage: {
        marginLeft: scale(7),
        fontSize: moderateScale(8),
        color: Colors.darkGray,
    },
});

export default Dashboard;