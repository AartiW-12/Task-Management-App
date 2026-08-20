import React, { useEffect, useMemo, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, } from 'react-native';

import { scale, verticalScale, } from 'react-native-size-matters';

import TabSwitcher from '../../components/tabSwitcher/TabSwitcher';

import ProjectIcon from '../../assets/images/bottomTab/Projects.svg';
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from '../../constants/style/ConstantStyling';
import StatusBadge from '../../components/statusBadge/StatusBadge'
import Searchbar from '../../components/searchbar/Searchbar'
import { Strings } from '../../constants/strings/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../constants/button/Button';
import { formatProjectDate } from '../../constants/function/FormatProjectDate'

import TasksIcon from '../../assets/images/bottomTab/Tasks.svg'
import TeamIcon from '../../assets/images/bottomTab/Team.svg'
import CalendarIcon from '../../assets/images/Icons/CalendarIcon.svg'

import { PROJECTS, getProjectProgress, getProjectManager, getProjectTaskCount, getProjectMemberCount,
} from '../../constants/mockData/mockTaskData';

const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Review',
    value: 'Review',
  },
  {
    label: 'Done',
    value: 'Done',
  },
];

const Projects = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('')

  const filteredProjects = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return PROJECTS.filter(project => {
      const matchesTab =
        activeTab === 'all' ||
        project.status === activeTab;
      const matchesSearch =
        project.name.toLowerCase().includes(search) 
        // project.manager.toLowerCase().includes(search);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchText]);

  const getProgressColor = (status, progress) => {
    if (status === 'Done' || progress === 100) {
      return Colors.sucess;
    }

    if (status === 'Review') {
      return Colors.primary;
    }

    if (progress < 30) {
      return Colors.danger;
    }

    return Colors.primary;
  };

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>
          Projects
        </Text>
        <Button
          text={'+'}
          textStyle={styles.plus}
          style={styles.addButton}
          onPress={() => navigation.navigate("ProjectForm")}
        />
      </View>
      <View>
        <Searchbar
          value={searchText}
          onChangeText={setSearchText}
          placeholder={Strings.projectScreen.searchPlaceholder}
          containerStyle={styles.searchBar}
        />
      </View>

      <View style={styles.tabsContainer}>

        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

      </View>
      <FlatList
        data={filteredProjects}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.projectList}
        renderItem={({ item: project }) => {

          const progressData = getProjectProgress(project.id);

          const progress = progressData?.progress ?? 0;

          const progressColor = getProgressColor(
            project.status,
            progress
          );

          const manager = getProjectManager(project.id);

          const taskCount = getProjectTaskCount(project.id);

          const memberCount = getProjectMemberCount(project.id);

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.projectCard}
              onPress={() =>
                navigation.navigate("ProjectDetails", {
                  project,
                })
              }
            >

              {/* Project Header */}
              <View style={styles.cardTopRow}>

                <View
                  style={[
                    styles.projectIconContainer,
                    {
                      backgroundColor:
                        Colors.inputBackground,
                    },
                  ]}
                >
                  <ProjectIcon
                    width={scale(19)}
                    height={scale(19)}
                    color={Colors.primary}
                  />
                </View>

                <View style={styles.projectInfo}>

                  <View style={styles.nameRow}>

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

                  <Text style={styles.manager}>
                    {manager
                      ? `${manager.firstName} ${manager.lastName}`
                      : "Unknown Manager"}
                  </Text>

                </View>

              </View>

              {/* Project Meta */}
              <View style={styles.metaRow}>

                {/* Tasks */}
                <View style={styles.metaItem}>

                  <TasksIcon
                    width={scale(11)}
                    height={scale(11)}
                    color={Colors.darkGray}
                  />

                  <Text style={styles.metaText}>
                    {taskCount}
                  </Text>

                </View>

                {/* Members */}
                <View style={styles.metaItem}>

                  <TeamIcon
                    width={scale(11)}
                    height={scale(11)}
                    color={Colors.darkGray}
                  />

                  <Text style={styles.metaText}>
                    {memberCount}
                  </Text>

                </View>

                {/* End Date */}
                <View style={styles.metaItem}>

                  <CalendarIcon
                    width={scale(11)}
                    height={scale(11)}
                    color={Colors.darkGray}
                  />

                  <Text style={styles.metaText}>
                    {console.log(project.endDate)}
                    {formatProjectDate(project.endDate)}
                  </Text>

                </View>

                {/* Status */}
                <View style={styles.statusWrapper}>

                  <StatusBadge
                    text={project.statusText}
                  />

                </View>

              </View>
              <View style={styles.progressRow}>

                <View style={styles.progressBackground}>

                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor:
                          progressColor,
                      },
                    ]}
                  />

                </View>

                <Text style={styles.progressText}>
                  {progress}%
                </Text>

              </View>

            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingHorizontal: Numbers.num20,
    paddingTop: Spacings.vxl,
    paddingBottom: Numbers.num50,
  },
  scrollContent: {
    paddingHorizontal: Spacings.lg,
    paddingTop: Spacings.vxxl,
    paddingBottom: Spacings.vxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacings.vxxl,
  },
  title: {
    fontSize: Spacings.mxxl,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
  },
  addButton: {
    width: Spacings.arrowSize,
    height: Spacings.arrowSize,
    borderRadius: Spacings.mxxl,
    backgroundColor: Colors.primary,
  },
  plus: {
    color: Colors.white,
    fontSize: fontSizes.title,
    lineHeight: Spacings.mtitle,
  },
  searchBar: {
    marginBottom: Spacings.vxxl,
  },
  tabsContainer: {
    marginBottom: Spacings.vmd,
  },
  projectList: {
    gap: Spacings.sm,
    // paddingHorizontal:20,
    paddingBottom: 40
  },

  projectCard: {
    backgroundColor: Colors.white,
    borderRadius: Spacings.md,
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectIconContainer: {
    width: Spacings.arrowSize,
    height: Spacings.arrowSize,
    borderRadius: Spacings.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },

  projectInfo: {
    flex: 1,
    marginLeft: Spacings.sm,
    fontFamily: Fonts.semiBold,
    fontSize: fontSizes.title
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  projectName: {
    flex: 1,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.w600,
    color: Colors.textColor,
  },

  manager: {
    marginTop: verticalScale(2),
    fontSize: fontSizes.xs,
    color: Colors.darkGray,
    fontFamily: Fonts.regular
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacings.vxs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacings.sm,
  },

  metaText: {
    fontSize: Spacings.mxs,
    color: Colors.darkGray,
    marginLeft: scale(2),
  },

  statusWrapper: {
    marginLeft: 'auto',
    paddingHorizontal: Spacings.xxs,
    borderRadius: Spacings.msm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacings.vsm,
  },
  progressBackground: {
    flex: 1,
    height: Spacings.vxxs,
    backgroundColor: Colors.gray,
    borderRadius: Spacings.mxxs,
    overflow: 'hidden',
  },

  progressFill: {
    height: Spacings.fullWidth,
    borderRadius: scale(3),
  },
  progressText: {
    marginLeft: Spacings.xs,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
    fontFamily: Fonts.bold
  },
});

export default Projects;