import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";


import {
    moderateScale,
    scale,
    verticalScale,
} from "react-native-size-matters";

import Svg, { Path, Defs, LinearGradient, Stop, Line, } from "react-native-svg";

// import { dashboardData } from "../../data/dashboardData";
import { logDashboardEvent, logDashboardView } from "../../services/analyticsServices";
import { logoutUser } from "../../services/authServices";
import { auth, db } from "../../firebase/firebaseConfig";
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from "../../constants/style/ConstantStyling";
import Header from '../../components/header/Header'

import NotificationIcon from '../../assets/images/Icons/NotificationIcon.svg'
import SearchIcon from '../../assets/images/Icons/SearchIcon.svg'
import ProjectIcon from '../../assets/images/Icons/ProjectsIcon.svg'
import TasksIcon from '../../assets/images/Icons/TasksIcon.svg'
import PendingIcon from '../../assets/images/Icons/PendingIcon.svg'
import DoneIcon from '../../assets/images/Icons/DoneIcon.svg'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Strings } from "../../constants/strings/Strings";
import StatusBadge from "../../components/statusBadge/StatusBadge";
import { SafeAreaView } from "react-native-safe-area-context";

const dashboardData = {
    user: {
        // name: "Alex Chen",
        // initials: "AC",
        greeting: "Good morning 👋",
    },

    statistics: [
        {
            id: "projects",
            title: "Projects",
            value: 12,
            change: 2,
            changeType: "positive",
            icon: ProjectIcon,
        },
        {
            id: "tasks",
            title: "Tasks",
            value: 84,
            change: 8,
            changeType: TasksIcon,
            icon: TasksIcon,
        },
        {
            id: "pending",
            title: "Pending",
            value: 23,
            change: -3,
            changeType: "negative",
            icon: PendingIcon,
        },
        {
            id: "done",
            title: "Done",
            value: 61,
            change: 11,
            changeType: "positive",
            icon: DoneIcon,
        },
    ],

    weeklyProgress: {
        title: "Weekly Progress",

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ],

        values: [
            8,
            14,
            5,
            18,
            12,
            4,
            2,
        ],
    },

    activeProjects: [
        {
            id: "project_1",
            name: "Mobile App Redesign",
            progress: 68,
            priority: "High",
            icon: ProjectIcon,
        },
        {
            id: "project_2",
            name: "Mobile App Redesign",
            progress: 68,
            priority: "High",
            icon: ProjectIcon,
        },
        {
            id: "project_3",
            name: "Mobile App Redesign",
            progress: 68,
            priority: "High",
            icon: ProjectIcon,
        },
    ],
};

const Dashboard = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        logDashboardView();

        logDashboardEvent("dashboard_opened");
    }, []);

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

                    console.log("FIRESTORE USER DATA:", data)

                    setUserProfile(data)
                } else {
                    // Google user may not have a Firestore document
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

    const handleSearch = () => {
        logDashboardEvent("search_clicked");

        // navigation.navigate("Search");
    };

    const handleNotification = () => {
        logDashboardEvent("notifications_clicked");

        // navigation.navigate("Notifications");
    };

    const handleStatisticPress = (item) => {
        logDashboardEvent("dashboard_stat_clicked", {
            stat_type: item.id,
        });

        if (item.id === "projects") {
            navigation.navigate("Projects");
        }

        if (item.id === "tasks") {
            navigation.navigate("Tasks");
        }
    };

    const handleProjectPress = (project) => {
        logDashboardEvent("project_clicked", {
            project_id: project.id,
            project_name: project.name,
        });

        navigation.navigate("ProjectDetails", {
            projectId: project.id,
        });
    };

    const handleLogout = async () => {
        try {
            await logoutUser()
            try {
                await GoogleSignin.signOut()
                console.log("GOOGLE SIGN OUT")
            } catch (googleError) {
                console.log(
                    'GOOGLE SIGNOUT ERROR:',
                    googleError.code || googleError.message
                )
            }
        } catch (error) {
            Alert.alert('Logout failed:', error)
        }
    }

    const renderCategoryCard = (item) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.statCard}
                activeOpacity={0.8}
                onPress={() => handleStatisticPress(item)}
            >
                <View style={styles.statTopRow}>
                    {item.icon && (
                        <item.icon
                            width={moderateScale(35)}
                            height={moderateScale(35)}
                        />
                    )}
                    <Text
                        style={[
                            styles.changeText,
                            item.changeType === "negative" &&
                            styles.negativeChange,
                        ]}
                    >
                        {item.change > 0 ? "+" : ""}
                        {item.change}
                    </Text>

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

    return (
        <SafeAreaView style={styles.container} >

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText} onPress={handleLogout}>
                                {userProfile
                                    ? `${userProfile.firstName?.charAt(0)}${userProfile.lastName?.charAt(0)}`
                                    : "XYZ"}
                            </Text>
                        </View>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greeting}>
                                {dashboardData.user.greeting}
                            </Text>
                            <Text
                                style={styles.userName}
                                numberOfLines={1}
                            >
                                {userProfile
                                    ? `${userProfile.firstName} ${userProfile.lastName}`
                                    : "Loading..."}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.headerButton}
                            // onPress={onSearchPress}
                            activeOpacity={0.7}
                        >
                            <SearchIcon
                                width={moderateScale(18)}
                                height={moderateScale(18)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerButton}
                            // onPress={onNotificationPress}
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

                    {dashboardData.statistics.map(renderCategoryCard)}

                </View>

                <View style={styles.progressCard}>

                    <Text style={styles.sectionTitle}>
                        {dashboardData.weeklyProgress.title}
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
                                viewBox="0 0 700 240"
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


                                <Line
                                    x1="0"
                                    y1="0"
                                    x2="700"
                                    y2="0"
                                    stroke="#E9EDF4"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                />

                                <Line
                                    x1="0"
                                    y1="60"
                                    x2="700"
                                    y2="60"
                                    stroke="#E9EDF4"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                />

                                <Line
                                    x1="0"
                                    y1="120"
                                    x2="700"
                                    y2="120"
                                    stroke="#E9EDF4"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                />

                                <Line
                                    x1="0"
                                    y1="180"
                                    x2="700"
                                    y2="180"
                                    stroke="#E9EDF4"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                />

                                <Line
                                    x1="0"
                                    y1="240"
                                    x2="700"
                                    y2="240"
                                    stroke="#E9EDF4"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                />


                                <Path
                                    d="
                    M 0 144

                    C 40 105,
                      80 72,
                      117 60

                    C 155 48,
                      180 85,
                      233 168

                    C 260 205,
                      300 140,
                      350 30

                    C 390 5,
                      430 50,
                      467 78

                    C 510 108,
                      550 150,
                      583 183

                    C 620 210,
                      660 225,
                      700 228

                    L 700 240
                    L 0 240
                    Z
                "
                                    fill="url(#chartGradient)"
                                />

                                <Path
                                    d="
                    M 0 144

                    C 40 105,
                      80 72,
                      117 60

                    C 155 48,
                      180 85,
                      233 168

                    C 260 205,
                      300 140,
                      350 30

                    C 390 5,
                      430 50,
                      467 78

                    C 510 108,
                      550 150,
                      583 183

                    C 620 210,
                      660 225,
                      700 228
                "
                                    fill="none"
                                    stroke="#7346FF"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.chartLabels}>
                        {dashboardData.weeklyProgress.labels.map(
                            (label) => (
                                <Text
                                    key={label}
                                    style={styles.chartLabel}
                                >
                                    {label}
                                </Text>
                            )
                        )}
                    </View>
                </View>
                <View style={styles.projectsHeader}>
                    <Text style={styles.sectionTitle}>{Strings.dashboardLables.activeProjects}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            logDashboardEvent("view_all_projects_clicked")
                            navigation.navigate("Projects")
                        }}
                    >
                        <Text style={styles.seeAll}>{Strings.dashboardLables.seeAll}</Text>
                    </TouchableOpacity>
                </View>
                {dashboardData.activeProjects.map((project) => (
                    <TouchableOpacity
                        key={project.id}
                        style={styles.projectCard}
                        activeOpacity={0.8}
                        onPress={() => handleProjectPress(project)}
                    >
                        <View
                            style={[
                                styles.projectIcon,
                                {
                                    backgroundColor:
                                        project.iconBackground,
                                },
                            ]}
                        >
                            <project.icon height={36} width={36} />
                        </View>
                        <View style={styles.projectContent}>
                            <View style={styles.projectTitleRow}>
                                <Text
                                    style={styles.projectName}
                                    numberOfLines={1}
                                >
                                    {project.name}
                                </Text>
                                <StatusBadge text={project.priority}/>
                            </View>
                            <View style={styles.progressRow}>

                                <View style={styles.progressBackground}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: `${project.progress}%`,
                                            },
                                        ]}
                                    />
                                </View>

                                <Text style={styles.progressPercentage}>
                                    {project.progress}%
                                </Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                ))}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingBottom:50
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
        top: Spacings.vxs,
        right: Spacings.vxs,
        width: Spacings.xxs,
        height: Spacings.xxs,
        borderRadius: scale(3),
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
        paddingVertical:5
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