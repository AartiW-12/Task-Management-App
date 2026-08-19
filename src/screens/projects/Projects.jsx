import React, { useEffect, useMemo, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, } from 'react-native';

import { scale, verticalScale, } from 'react-native-size-matters';

import TabSwitcher from '../../components/tabSwitcher/TabSwitcher';

import ProjectIcon from '../../assets/images/bottomTab/Projects.svg';
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from '../../constants/style/ConstantStyling';
import StatusBadge from '../../components/statusBadge/StatusBadge'
import Searchbar from '../../components/searchbar/Searchbar'

import {
  logAppScreenView,
  logAppEvent,
} from '../../services/analyticsServices';
import { Strings } from '../../constants/strings/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../constants/button/Button';
import { formatProjectDate } from '../../constants/function/FormatProjectDate'

import TasksIcon from '../../assets/images/bottomTab/Tasks.svg'
import TeamIcon from '../../assets/images/bottomTab/Team.svg'
import CalendarIcon from '../../assets/images/Icons/CalendarIcon.svg'

const projects = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    manager: 'Alex Chen',
    tasks: 34,
    members: 6,
    startDate: new Date(2026, 5, 1).getTime(),
    endDate: new Date(2026, 11, 28).getTime(),
    progress: 68,
    priority: 'High',
    status: 'Active',
    statusText: 'In Progress',
    color: Colors.primary,
    iconBackground: '#EAF1FF',
  },

  {
    id: '2',
    name: 'API Integration v3',
    manager: 'Sarah Kim',
    tasks: 18,
    members: 4,
    startDate: new Date(2026, 0, 15).getTime(),
    endDate: new Date(2026, 10, 15).getTime(),
    progress: 23,
    priority: 'Critical',
    status: 'Active',
    statusText: 'Todo',
    color: '#8B43F5',
    iconBackground: '#F0E5FF',
  },

  {
    id: '3',
    name: 'Dashboard Analytics',
    manager: 'Mike Ross',
    tasks: 12,
    members: 3,
    startDate: new Date(2026, 5, 1).getTime(),
    endDate: new Date(2026, 11, 10).getTime(),
    progress: 85,
    priority: 'Medium',
    status: 'Review',
    statusText: 'Review',
    color: '#23C96B',
    iconBackground: '#E7F9EF',
  },

  {
    id: '4',
    name: 'E-Commerce Platform',
    manager: 'Emma Davis',
    tasks: 56,
    members: 8,
    startDate: new Date(2026, 6, 30).getTime(),
    endDate: new Date(2026, 10, 30).getTime(),
    progress: 100,
    priority: 'Low',
    status: 'Done',
    statusText: 'Completed',
    color: '#F5A623',
    iconBackground: '#FFF3DD',
  },
];

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

  useEffect(() => {
    logAppScreenView(
      'Projects',
      'ProjectsScreen'
    );

    logAppEvent('projects_opened');
  }, []);

  const filteredProjects = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return projects.filter(project => {
      const matchesTab =
        activeTab === 'all' ||
        project.status === activeTab;
      const matchesSearch =
        project.name.toLowerCase().includes(search) ||
        project.manager.toLowerCase().includes(search);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchText]);

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
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.projectList}
        renderItem={({ item: project }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.projectCard}
            onPress={() =>
              navigation.navigate('ProjectDetails', {
                project,
              })
            }
          >
            <View style={styles.cardTopRow}>
              <View
                style={[
                  styles.projectIconContainer,
                  {
                    backgroundColor: project.iconBackground,
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
                  <StatusBadge text={project.priority} />
                </View>
                <Text style={styles.manager}>
                  {project.manager}
                </Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <TasksIcon
                  width={scale(11)}
                  height={scale(11)}
                  color={Colors.darkGray}
                />
                <Text style={styles.metaText}>
                  {project.tasks}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <TeamIcon
                  width={scale(11)}
                  height={scale(11)}
                  color={Colors.darkGray}
                />
                <Text style={styles.metaText}>
                  {project.members}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <CalendarIcon
                  width={scale(11)}
                  height={scale(11)}
                  color={Colors.darkGray}
                />
                <Text style={styles.metaText}>
                  {formatProjectDate(project.endDate)}
                </Text>
              </View>
              <View style={styles.statusWrapper}>
                <StatusBadge text={project.statusText} />
              </View>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {project.progress}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingHorizontal:Numbers.num20,
    paddingTop:Numbers.num16,
    paddingBottom:Numbers.num50,
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
    paddingBottom:40
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