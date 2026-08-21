import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { scale } from 'react-native-size-matters';
import ProjectIcon from '../../assets/images/Icons/ProjectsIcon.svg';
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings, } from '../../constants/style/ConstantStyling';
import Header from '../../components/header/Header';
import EditIcon from '../../assets/images/Icons/EditIcon.svg';
import StatusBadge from '../../components/statusBadge/StatusBadge';
import { Strings } from '../../constants/strings/Strings';
import TaskIcon from '../../assets/images/bottomTab/Tasks.svg';
import TeamIcon from '../../assets/images/bottomTab/Team.svg';
import CalendarIcon from '../../assets/images/Icons/CalendarIcon.svg';
import FlagIcon from '../../assets/images/Icons/FlagIcon.svg';
import TabSwitcher from '../../components/tabSwitcher/TabSwitcher';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatProjectDate } from '../../constants/function/FormatProjectDate';
import { getProjectProgress, getProjectManager, getProjectTasks, getProjectMembers, getTaskUser, } from '../../hooks/projectCommonFunctions';
import { CommonStyles } from '../../constants/style/CommonStyles';


const taskTabs = [
  {
    label: 'Tasks',
    value: 'Tasks',
  },
  {
    label: 'Team',
    value: 'Team',
  },
  {
    label: 'Files',
    value: 'Files',
  },
  {
    label: 'Activity',
    value: 'Activity',
  },
];

const files = [
  // {
  //   id: '1',
  //   name: 'Project Requirements.pdf',
  //   type: 'PDF',
  //   size: '2.4 MB',
  // },
];

const activities = [
  // {
  //   id: '1',
  //   user: 'Alex Chen',
  //   action: 'created a new task',
  //   target: 'Design system component library',
  //   time: '10 min ago',
  // },
];


const ProjectDetails = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const project = route?.params?.project;
  // console.log(project)

  const [activeTab, setActiveTab] = useState('Tasks');

  const progressData = useMemo(() => {
    if (!project?.id) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        progress: 0,
      };
    }

    return getProjectProgress(project.id);
  }, [project?.id]);


  const manager = useMemo(() => {
    if (!project?.id) {
      return null;
    }

    return getProjectManager(project.id);
  }, [project?.id]);


  const projectTasks = useMemo(() => {
    if (!project?.id) {
      return [];
    }

    return getProjectTasks(project.id);
  }, [project?.id]);


  const teamMembers = useMemo(() => {
    if (!project?.id) {
      return [];
    }

    return getProjectMembers(project.id);
  }, [project?.id]);

  const StatCard = ({ icon, value, label }) => {
    return (
      <View style={styles.statCard}>
        <Text style={styles.statIcon}>
          {icon}
        </Text>
        <Text style={styles.statValue}>
          {value}
        </Text>
        <Text style={styles.statLabel}>
          {label}
        </Text>
      </View>
    );
  };

  const renderTasks = () => {
    return (
      <>
        <TouchableOpacity style={styles.addTaskButton}>
          <Text style={styles.addTaskText}>
            {Strings.buttonText.addTask}
          </Text>
        </TouchableOpacity>
        <View style={styles.taskList}>
          {projectTasks.length === 0 ? <View style={CommonStyles.emptyList}>
            <Text style={CommonStyles.emptyListText}>{Strings.emptyTasks}{' '}{project.name}</Text>
          </View> :
            projectTasks.map(task => {
              const assignedUser = getTaskUser(task);
              const userName = assignedUser
                ? `${assignedUser.firstName} ${assignedUser.lastName}`
                : 'Unassigned';

              const getTaskDotColor = status => {
                switch (status) {
                  case 'Completed':
                    return Colors.BagdeText;

                  case 'In Progress':
                    return Colors.primary;

                  case 'Backlog':
                    return Colors.darkGray;

                  case 'Testing':
                    return Colors.sucess;

                  default:
                    return Colors.darkGray;
                }
              };
              return (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskCard}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.taskDot,
                      {
                        backgroundColor:
                          getTaskDotColor(task.status),
                      },
                    ]}
                  />
                  <View style={styles.taskContent}>
                    <Text
                      style={styles.taskTitle}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>
                    <Text style={styles.taskUser}>
                      {userName}
                    </Text>
                  </View>
                  <StatusBadge
                    text={task.status}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </>
    );
  };

  const renderTeam = () => {
    return (
      <View style={styles.tabContent}>
        {teamMembers.length === 0 ? <View style={CommonStyles.emptyList}>
          <Text style={CommonStyles.emptyListText}>{Strings.emptyTeam}</Text>
        </View> : teamMembers.map(member => {
          const initials = `${member.firstName?.[0] || '-'}${member.lastName?.[0] || '-'}`;
          const isManager =
            member.id === project.managerId;
          return (
            <View
              key={member.id}
              style={styles.memberCard}
            >
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>
                  {initials}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>
                  {member.firstName} {member.lastName}
                </Text>
                <Text style={styles.memberRole}>
                  {isManager
                    ? 'Project Manager'
                    : member.role}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderFiles = () => {
    return (
      <View style={styles.tabContent}>
        {files.length === 0 ? <View style={CommonStyles.emptyList}>
          <Text style={CommonStyles.emptyListText}>{Strings.emptyFiles}{' '}{project.name}</Text>
        </View> : files.map(file => (
          <TouchableOpacity
            key={file.id}
            style={styles.fileCard}
            activeOpacity={0.8}
          >
            <View style={styles.fileIcon}>
              <Text style={styles.fileType}>
                {file.type}
              </Text>
            </View>

            <View style={styles.fileInfo}>
              <Text
                style={styles.fileName}
                numberOfLines={1}
              >
                {file.name}
              </Text>
              <Text style={styles.fileSize}>
                {file.size}
              </Text>
            </View>
            <Text style={styles.fileArrow}>
              ›
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderActivity = () => {
    return (
      <View style={styles.tabContent}>
        {activities.length === 0 ? <View style={CommonStyles.emptyList}>
            <Text style={CommonStyles.emptyListText}>{Strings.emptyActivity}{' '}{project.name}</Text>
        </View> :  activities.map(activity => (
          <View
            key={activity.id}
            style={styles.activityCard}
          >
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>
                  {activity.user}
                </Text>
                {' '}
                {activity.action}
                {' '}
                <Text style={styles.activityTarget}>
                  {activity.target}
                </Text>
              </Text>
              <Text style={styles.activityTime}>
                {activity.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };
  const renderActiveTab = () => {

    switch (activeTab) {

      case 'Tasks':
        return renderTasks();

      case 'Team':
        return renderTeam();

      case 'Files':
        return renderFiles();

      case 'Activity':
        return renderActivity();

      default:
        return null;
    }
  };
  if (!project) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        onBackPress={() => navigation.goBack()}
        rightIcon={
          <EditIcon
            height={18}
            width={18}
          />
        }
        onRightPress={() =>
          navigation.navigate("ProjectForm",{project: project , mode: 'edit'})
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.projectHeader}>
          <ProjectIcon
            width={scale(45)}
            height={scale(45)}
          />
          <View style={styles.projectInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.projectName}>
                {project.name}
              </Text>
              <StatusBadge
                text={project.priority}
              />
            </View>
            <Text style={styles.manager}>
              {manager
                ? `${manager.firstName} ${manager.lastName}`
                : 'Unknown Manager'}
            </Text>
          </View>
        </View>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {Strings.projectScreen.label.progress}
          </Text>
          <Text style={styles.progressValue}>
            {progressData.progress}%
          </Text>
        </View>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressData.progress}%`,
              },
            ]}
          />
        </View>
        <View style={styles.statistics}>
          <StatCard
            icon={
              <TaskIcon
                height={15}
                width={15}
                color={Colors.primary}
              />
            }
            value={progressData.total}
            label="Tasks"
          />
          <StatCard
            icon={
              <TeamIcon
                height={15}
                width={15}
                color={Colors.primary}
              />
            }
            value={teamMembers.length}
            label="Members"
          />
          <StatCard
            icon={
              <CalendarIcon
                height={15}
                width={15}
                color={Colors.primary}
              />
            }
            value={formatProjectDate(project.startDate)}
            label="Start"
          />
          <StatCard
            icon={
              <FlagIcon
                height={15}
                width={15}
              />
            }
            value={formatProjectDate(project.endDate)}
            label="End"
          />
        </View>

        <View style={styles.innerTabs}>
          <TabSwitcher
            tabs={taskTabs}
            activeTab={activeTab}
            onTabPress={setActiveTab}
            variant="underline"
          />
        </View>
        <View style={styles.tabContentContainer}>
          {renderActiveTab()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  scrollContent: {
    paddingHorizontal: Spacings.lg,
    paddingTop: Spacings.vxs,
    paddingBottom: Spacings.vxxl,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectInfo: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Numbers.num4,
  },
  projectName: {
    flex: 1,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
  },
  manager: {
    marginTop: Spacings.vxxs,
    fontSize: fontSizes.md,
    color: Colors.darkGray,
    fontFamily: Fonts.regular,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacings.vmd,
    marginBottom: Spacings.vxs,
  },
  progressLabel: {
    fontSize: fontSizes.xs,
    color: Colors.textColor,
  },
  progressValue: {
    fontSize: Spacings.sm,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
    fontFamily: Fonts.semiBold,
  },
  progressBackground: {
    height: Spacings.xxs,
    backgroundColor: Colors.gray,
    borderRadius: Spacings.xxs,
    overflow: 'hidden',
  },
  progressFill: {
    height: Spacings.fullWidth,
    backgroundColor: Colors.primary,
    borderRadius: Spacings.xxs,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacings.vxl,
    marginBottom: Spacings.vsm,
  },
  statCard: {
    width: '23.5%',
    backgroundColor: Colors.inputBackground,
    borderRadius: Spacings.mmd,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacings.vsm,
  },
  statIcon: {
    fontSize: Spacings.md,
    color: Colors.primary,
    marginBottom: Spacings.vxxs,
  },
  statValue: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
  },
  statLabel: {
    marginTop: Spacings.vxxs,
    fontSize: fontSizes.xs,
    color: Colors.darkGray,
  },
  innerTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginHorizontal: scale(-16),
    paddingHorizontal: Spacings.lg,
  },
  addTaskButton: {
    height: Spacings.varrowSize,
    borderRadius: Spacings.xxl,
    borderWidth: Numbers.p5,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacings.vmd,
  },
  addTaskText: {
    color: Colors.primary,
    fontSize: Spacings.sm,
    fontWeight: fontWeights.w600,
  },
  taskList: {
    marginTop: Spacings.vxs,
    gap: Spacings.vxs,
  },
  taskCard: {
    minHeight: Spacings.h54,
    backgroundColor: Colors.white,
    borderRadius: Spacings.md,
    borderWidth: 1,
    borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.vsm,
  },
  taskDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
  },
  taskContent: {
    flex: 1,
    marginLeft: Spacings.sm,
  },
  taskTitle: {
    fontSize: fontSizes.md,
    color: Colors.textColor,
    fontWeight: fontWeights.w600,
  },
  taskUser: {
    fontSize: fontSizes.sm,
    color: Colors.darkGray,
    marginTop: Spacings.vxxs,
  },
  tabContentContainer: {
    marginTop: Spacings.vmd,
  },
  tabContent: {
    gap: Spacings.vxs,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacings.md,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.vxs,
  },
  memberAvatar: {
    width: Spacings.arrowSize,
    height: Spacings.arrowSize,
    borderRadius: Spacings.xl,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInitials: {
    fontSize: Spacings.sm,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  memberInfo: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  memberName: {
    fontSize: Spacings.md,
    fontFamily: Fonts.semiBold,
    color: Colors.textColor,
  },
  memberRole: {
    marginTop: Spacings.vxxs,
    fontSize: fontSizes.xs,
    fontFamily: Fonts.regular,
    color: Colors.darkGray,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacings.md,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.vxs,
  },
  fileIcon: {
    width: Spacings.arrowSize,
    height: Spacings.arrowSize,
    borderRadius: Spacings.sm,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileType: {
    fontSize: fontSizes.xs,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  fileInfo: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  fileName: {
    fontSize: fontSizes.md,
    fontFamily: Fonts.semiBold,
    color: Colors.textColor,
  },
  fileSize: {
    marginTop: Spacings.vxxs,
    fontSize: fontSizes.xxs,
    fontFamily: Fonts.regular,
    color: Colors.darkGray,
  },
  fileArrow: {
    fontSize: fontSizes.xxl,
    color: Colors.darkGray,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Spacings.md,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.vsm,
  },
  activityDot: {
    width: Spacings.xs,
    height: Spacings.xs,
    borderRadius: Spacings.md,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  activityText: {
    fontSize: fontSizes.sm,
    color: Colors.darkGray,
    fontFamily: Fonts.regular,
    lineHeight: Spacings.vmd,
  },
  activityUser: {
    color: Colors.textColor,
    fontFamily: Fonts.semiBold,
  },
  activityTarget: {
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
  },
  activityTime: {
    marginTop: Spacings.xxs,
    fontSize: fontSizes.xxs,
    color: Colors.darkGray,
    fontFamily: Fonts.regular,
  },
});

export default ProjectDetails;