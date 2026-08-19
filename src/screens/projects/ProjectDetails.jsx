import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';

import {scale,} from 'react-native-size-matters';

import ProjectIcon from '../../assets/images/Icons/ProjectsIcon.svg';
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from '../../constants/style/ConstantStyling';
import Header from '../../components/header/Header';

import EditIcon from '../../assets/images/Icons/EditIcon.svg'
import StatusBadge from '../../components/statusBadge/StatusBadge';
import { Strings } from '../../constants/strings/Strings';

import TaskIcon from '../../assets/images/bottomTab/Tasks.svg'
import TeamIcon from '../../assets/images/bottomTab/Team.svg'
import CalendarIcon from '../../assets/images/Icons/CalendarIcon.svg'
import FlagIcon from '../../assets/images/Icons/FlagIcon.svg'
import TabSwitcher from '../../components/tabSwitcher/TabSwitcher';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatProjectDate } from '../../constants/function/FormatProjectDate';

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

const tasks = [
  {
    id: '1',
    title: 'Design system component library',
    user: 'Alex Chen',
    status: 'In Progress',
    statusColor: Colors.primary,
    dotColor: '#F5A623',
  },
  {
    id: '2',
    title: 'User authentication flow',
    user: 'Emma Davis',
    status: 'Completed',
    statusColor: '#26A05D',
    dotColor: '#F5A623',
  },
  {
    id: '3',
    title: 'Push notification service',
    user: 'Alex Chen',
    status: 'Backlog',
    statusColor: '#7F8999',
    dotColor: Colors.primary,
  },
  {
    id: '4',
    title: 'Dark mode implementation',
    user: 'Mike Ross',
    status: 'Testing',
    statusColor: '#9A49DF',
    dotColor: '#23C96B',
  },
];
const teamMembers = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Project Manager',
    initials: 'AC',
  },
];

const files = [
  {
    id: '1',
    name: 'Project Requirements.pdf',
    type: 'PDF',
    size: '2.4 MB',
  },
];

const activities = [
  {
    id: '1',
    user: 'Alex Chen',
    action: 'created a new task',
    target: 'Design system component library',
    time: '10 min ago',
  },
];

const ProjectDetails = () => {

  const navigation = useNavigation();
  const route = useRoute()

  const project = route?.params?.project || {
    name: 'Mobile App Redesign',
    manager: 'Alex Chen',
    progress: 68,
    priority: 'High',
  };


  const [activeTab, setActiveTab] = useState('Tasks');

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
            + Add Task
          </Text>
        </TouchableOpacity>

        <View style={styles.taskList}>
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.taskDot,
                  {
                    backgroundColor: task.dotColor,
                  },
                ]}
              />

              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>
                  {task.title}
                </Text>

                <Text style={styles.taskUser}>
                  {task.user}
                </Text>
              </View>

              <StatusBadge text={task.status} />
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const renderTeam = () => {
    return (
      <View style={styles.tabContent}>
        {teamMembers.map(member => (
          <View
            key={member.id}
            style={styles.memberCard}
          >
            <View style={styles.memberAvatar}>
              <Text style={styles.memberInitials}>
                {member.initials}
              </Text>
            </View>

            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>
                {member.name}
              </Text>

              <Text style={styles.memberRole}>
                {member.role}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderFiles = () => {
    return (
      <View style={styles.tabContent}>
        {files.map(file => (
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
        {activities.map(activity => (
          <View
            key={activity.id}
            style={styles.activityCard}
          >
            <View style={styles.activityDot} />

            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>
                  {activity.user}
                </Text>{' '}
                {activity.action}{' '}
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
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=''
        onBackPress={() => navigation.goBack()}
        rightIcon={<EditIcon height={18} width={18} />}
        onRightPress={() => navigation.navigate("EditProject", { project })}
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
              <StatusBadge text={project.priority} />
            </View>

            <Text style={styles.manager}>
              {project.manager}
            </Text>

          </View>

        </View>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{Strings.projectScreen.label.progress}</Text>
          <Text style={styles.progressValue}>
            {project.progress}%
          </Text>

        </View>

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
        <View style={styles.statistics}>
          <StatCard
            icon={<TaskIcon height={15} width={15} color={Colors.primary} />}
            value={tasks.length}
            label="Tasks"
          />
          <StatCard
            icon={<TeamIcon height={15} width={15} color={Colors.primary} />}
            value={teamMembers.length}
            label="Members"
          />
          <StatCard
            icon={<CalendarIcon height={15} width={15} color={Colors.primary} />}
            value={formatProjectDate(project.startDate)}
            label="Start"
          />
          <StatCard
            icon={<FlagIcon height={15} width={15} />}
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
    gap: Numbers.num4
  },
  projectName: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
  },
  manager: {
    marginTop: Spacings.vxxs,
    fontSize: fontSizes.sm,
    color: Colors.darkGray,
    fontFamily: Fonts.regular
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
    fontSize: Spacings.xs,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
    fontFamily: Fonts.semiBold
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
    fontSize: Spacings.xs,
    color: Colors.primary,
    marginBottom: Spacings.vxxs,
  },
  statValue: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
  },
  statLabel: {
    marginTop: Spacings.vxxs,
    fontSize:fontSizes.xxs,
    color: Colors.darkGray,
  },
  innerTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginHorizontal: scale(-16),
    paddingHorizontal: Spacings.lg,
  },
  innerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacings.vxs,
    position: 'relative',
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
    fontSize: Spacings.xs,
    fontWeight:fontWeights.w600,
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
    fontSize:fontSizes.sm,
    color: Colors.textColor,
    fontWeight:fontWeights.w600,
  },
  taskUser: {
    fontSize:fontSizes.xs,
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
    fontSize: Spacings.xs,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  memberInfo: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  memberName: {
    fontSize: Spacings.sm,
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
    fontSize:fontSizes.xxs,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  fileInfo: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  fileName: {
    fontSize: fontSizes.sm,
    fontFamily: Fonts.semiBold,
    color: Colors.textColor,
  },
  fileSize: {
    marginTop: Spacings.vxxs,
    fontSize:fontSizes.xxs,
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
    alignSelf:'center'
  },
  activityContent: {
    flex: 1,
    marginLeft: Spacings.xs,
  },
  activityText: {
    fontSize:fontSizes.xs,
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