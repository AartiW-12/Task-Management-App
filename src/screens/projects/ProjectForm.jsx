import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Modal, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import { scale, verticalScale, moderateScale, } from 'react-native-size-matters';
import Header from '../../components/header/Header';
import { Colors, Fonts, fontSizes, Numbers, Spacings, } from '../../constants/style/ConstantStyling';
import { db } from '../../firebase/firebaseConfig';
import DeleteIcon from '../../assets/images/Icons/DeleteIcon.svg'
import ProjectNameIcon from '../../assets/images/Icons/ProjectNameIcon.svg'
import CalendarIcon from '../../assets/images/Icons/CalendarIcon.svg'
import AddMemberIcon from '../../assets/images/Icons/AddMembers.svg'
import { Strings } from '../../constants/strings/Strings';
import Input from '../../constants/input/Input';
import Button from '../../constants/button/Button';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../constants/style/CommonStyles';
import { customSnackbar } from '../../components/snackbar/SnackBar';
import { getProjectManager, getProjectMembers } from '../../hooks/projectCommonFunctions';
import { useNavigation, useRoute } from '@react-navigation/native';

const PRIORITIES = [
    'Low',
    'Medium',
    'High',
    'Critical',
];

const STATUS_OPTIONS = [
    'Active',
    'Review',
    'Done'
];

const DUMMY_USERS = [
    {
        id: '1',
        firstName: 'Alex',
        lastName: 'Chen',
        role: 'Project Manager',
    },
    {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Kim',
        role: 'UI/UX Designer',
    },
    {
        id: '3',
        firstName: 'Mike',
        lastName: 'Ross',
        role: 'Developer',
    },
    {
        id: '4',
        firstName: 'Emma',
        lastName: 'Davis',
        role: 'Project Manager',
    },
];

const ProjectForm = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const project = route?.params?.project || null;
    const mode = route?.params?.mode || 'create';

     const isEdit = mode === 'edit';

    console.log("new", project)
    const teamMemberArray = project?.id ? getProjectMembers(project.id) : []
    const managerName = project?.id ? getProjectManager(project.id) : null

    //state for input values    
    const [projectName, setProjectName] = useState(project?.name || '');
    const [description, setDescription] = useState(project?.description || '');
    const [priority, setPriority] = useState(project?.priority || '');
    const [status, setStatus] = useState(project?.statusText || '');
    const [manager, setManager] = useState(managerName || '');
    const [teamMembers, setTeamMembers] = useState(teamMemberArray || []);

    //state for modals
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showManagerModal, setShowManagerModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);

    //state for data and loading
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(DUMMY_USERS);

    const [startDate, setStartDate] = useState(
        project?.startDate
            ? new Date(project.startDate)
            : new Date()
    );

    const [endDate, setEndDate] = useState(
        project?.endDate
            ? new Date(project.endDate)
            : new Date()
    );

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    // useEffect(() => {
    //     const loadUsers = async () => {
    //         try {
    //             const snapshot = await db
    //                 .collection('users')
    //                 .get();
    //             const firestoreUsers = [];
    //             snapshot.forEach(doc => {
    //                 const data = doc.data();
    //                 firestoreUsers.push({
    //                     id: doc.id,
    //                     firstName: data.firstName || '',
    //                     lastName: data.lastName || '',
    //                     role: data.role || 'Team Member',
    //                 });
    //             });
    //             if (firestoreUsers.length > 0) {
    //                 setUsers(firestoreUsers);
    //             }
    //         } catch (error) {
    //             console.log(
    //                 'ERROR LOADING USERS:',
    //                 error
    //             );
    //         }
    //     };
    //     loadUsers();
    // }, []);

    const toggleTeamMember = member => {
        const alreadySelected =
            teamMembers.some(
                item => item.id === member.id
            );
        if (alreadySelected) {
            setTeamMembers(
                teamMembers.filter(
                    item => item.id !== member.id
                )
            );
        } else {
            setTeamMembers([
                ...teamMembers,
                member,
            ]);
        }
    };

    const removeTeamMember = memberId => {
        setTeamMembers(
            teamMembers.filter(
                member => member.id !== memberId
            )
        );
    };

    const handleSubmit = async () => {
        // if (!projectName.trim()) {
        //     Alert.alert(
        //         'Required',
        //         'Please enter project name.'
        //     );
        //     return;
        // }
        // if (!priority) {
        //     Alert.alert(
        //         'Required',
        //         'Please select priority.'
        //     );
        //     return;
        // }
        // try {
        //     setLoading(true);
        //     const user = auth.currentUser;
        //     if (!user) {
        //         Alert.alert(
        //             'Authentication',
        //             'Please login again.'
        //         );
        //         return;
        //     }
        //     const projectData = {
        //         name: projectName.trim(),
        //         description: description.trim(),
        //         startDate: startDate.toISOString(),
        //         endDate: endDate.toISOString(),
        //         priority,
        //         status,
        //         manager: manager
        //             ? {
        //                 id: manager.id,
        //                 name: `${manager.firstName} ${manager.lastName}`.trim(),
        //             }
        //             : null,
        //         teamMembers: teamMembers.map(member => ({
        //             id: member.id,
        //             name: `${member.firstName} ${member.lastName}`.trim(),
        //             role: member.role,
        //         })),
        //         updatedBy: user.uid,
        //         updatedAt: new Date().toISOString(),
        //     };
        //     if (!isEdit) {
        //         const projectRef = db
        //             .collection('projects')
        //             .doc();
        //         await projectRef.set({
        //             ...projectData,
        //             id: projectRef.id,
        //             createdBy: user.uid,
        //             createdAt:
        //                 new Date().toISOString(),
        //         });
        //         Alert.alert(
        //             'Success',
        //             'Project created successfully.',
        //             [
        //                 {
        //                     text: 'OK',
        //                     onPress: () => {
        //                         navigation.goBack();
        //                     },
        //                 },
        //             ]
        //         );
        //     }
        //     else {
        //         const projectId =
        //             project?.id ||
        //             route?.params?.projectId;
        //         if (!projectId) {
        //             Alert.alert(
        //                 'Error',
        //                 'Project ID not found.'
        //             );
        //             return;
        //         }
        //         await db
        //             .collection('projects')
        //             .doc(projectId)
        //             .update(projectData);
        //         Alert.alert(
        //             'Success',
        //             'Project updated successfully.',
        //             [
        //                 {
        //                     text: 'OK',
        //                     onPress: () => {
        //                         navigation.goBack();
        //                     },
        //                 },
        //             ]
        //         );
        //     }
        // } catch (error) {
        //     console.log(
        //         'PROJECT SAVE ERROR:',
        //         error
        //     );
        //     Alert.alert(
        //         'Error',
        //         'Unable to save project.'
        //     );
        // } finally {
        //     setLoaing(false);
        // }


        customSnackbar("!  Created ", 'validation')
        navigation.goBack()
    };

    const handleDelete = () => {
        const projectId =
            project?.id ||
            route?.params?.projectId;
        if (!projectId) {
            return;
        }
        Alert.alert(
            'Delete Project',
            'Are you sure you want to delete this project?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await db
                                .collection('projects')
                                .doc(projectId)
                                .delete();
                            navigation.goBack();
                        } catch (error) {
                            console.log(
                                'DELETE PROJECT ERROR:',
                                error
                            );
                            Alert.alert(
                                'Error',
                                'Unable to delete project.'
                            );
                        }
                    },
                },
            ]
        );

    };
    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Header
                    title={isEdit ? Strings.headers.editProject : Strings.headers.newProject}
                    onBackPress={() => navigation.goBack()}
                    rightIcon={
                        isEdit ? (
                            <DeleteIcon height={35} width={35} />
                        ) : null
                    }
                    onRightPress={handleDelete}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        styles.scrollContent
                    }
                    keyboardShouldPersistTaps='handled'
                >
                    <Text style={styles.formLabel}>{Strings.projectScreen.label.projectName}</Text>
                    <Input
                        value={projectName}
                        onChangeText={setProjectName}
                        placeholder={Strings.placeholders.enterProjectName}
                        style={styles.input}
                        leftIcon={<ProjectNameIcon height={15} width={15} />}
                    />
                    <Text style={styles.formLabel}>{Strings.projectScreen.label.projectDesc}</Text>
                    <Input
                        value={description}
                        onChangeText={setDescription}
                        placeholder={Strings.placeholders.projectDesc}
                        multiline
                        style={styles.input}
                    />
                    <View style={styles.dateRow}>
                        <View style={styles.dateColumn}>
                            <Text style={styles.formLabel}>
                                {Strings.projectScreen.label.startDate}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setShowStartDatePicker(true)}
                            >
                                <View pointerEvents="none">
                                    <Input
                                        value={startDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                        editable={false}
                                        placeholder={Strings.placeholders.startDate}
                                        leftIcon={
                                            <CalendarIcon
                                                height={15}
                                                width={15}
                                                color={Colors.darkGray}
                                            />
                                        }
                                        style={styles.input}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateColumn}>
                            <Text style={styles.formLabel}>
                                {Strings.projectScreen.label.endDate}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setShowEndDatePicker(true)}
                            >
                                <View pointerEvents="none">
                                    <Input
                                        value={endDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                        editable={false}
                                        placeholder={Strings.placeholders.endDate}
                                        leftIcon={
                                            <CalendarIcon
                                                height={15}
                                                width={15}
                                                color={Colors.darkGray}
                                            />
                                        }
                                        style={styles.input}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.formLabel}>{Strings.projectScreen.label.priority}</Text>
                    <View style={styles.priorityRow}>
                        {PRIORITIES.map(item => {
                            const selected =
                                priority === item;
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() =>
                                        setPriority(item)
                                    }
                                    style={[
                                        styles.priorityButton,
                                        selected &&
                                        styles.priorityButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.priorityText,
                                            selected &&
                                            styles.priorityTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {!isEdit && <View>
                        <Text style={styles.formLabel}>{Strings.projectScreen.label.status}</Text>
                        <Dropdown
                            value={status || 'Select status'}
                            onPress={() => {
                                console.log('STATUS CLICK');
                                setShowStatusModal(true);
                            }}
                        />
                    </View>}
                    <Text style={styles.formLabel}>{Strings.projectScreen.label.projectManager}</Text>
                    <Dropdown
                        value={
                            manager
                                ? `${manager.firstName} ${manager.lastName}`
                                : 'Select manager'
                        }
                        onPress={() =>
                            setShowManagerModal(true)
                        }
                    />
                    <Text style={styles.formLabel}>{Strings.projectScreen.label.teamMembers}</Text>
                    <View style={styles.teamContainer}>
                        {teamMembers.map(member => (
                            <MemberChip
                                key={member.id}
                                member={member}
                                onRemove={() =>
                                    removeTeamMember(member.id)
                                }
                            />
                        ))}
                        <TouchableOpacity
                            style={styles.addMemberButton}
                            onPress={() => {
                                console.log('TEAM CLICK');
                                setShowTeamModal(true);
                            }}
                        >
                            <Text style={styles.addMemberText}>
                                <AddMemberIcon height={12} width={12} />  Add Members
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionRow}>
                        {isEdit && (
                            <Button
                                text={Strings.buttonText.cancel}
                                onPress={() => navigation.goBack()}
                                style={styles.cancelButton}
                                textStyle={styles.cancelText}
                            />
                        )}
                        <Button
                            text={
                                loading
                                    ? 'Saving...'
                                    : isEdit
                                        ? 'Save Changes'
                                        : 'Create Project'
                            }
                            onPress={handleSubmit}
                            disabled={loading}
                            style={[
                                styles.submitButton,
                                !isEdit && styles.createButtonFull,
                            ]}
                            textStyle={styles.submitText}
                        />
                    </View>
                </ScrollView>
                <DatePicker
                    modal
                    mode="date"
                    open={showStartDatePicker}
                    date={startDate}
                    onConfirm={(date) => {
                        setShowStartDatePicker(false);
                        setStartDate(date);
                    }}
                    onCancel={() => setShowStartDatePicker(false)}
                />
                <DatePicker
                    modal
                    mode="date"
                    open={showEndDatePicker}
                    date={endDate}
                    minimumDate={startDate}
                    onConfirm={(date) => {
                        setShowEndDatePicker(false);
                        setEndDate(date);
                    }}
                    onCancel={() => setShowEndDatePicker(false)}
                />
                <SelectionModal
                    visible={showStatusModal}
                    title="Select Status"
                    data={STATUS_OPTIONS}
                    selected={status}
                    onSelect={value => {
                        setStatus(value);
                        setShowStatusModal(false);
                    }}
                    onClose={() =>
                        setShowStatusModal(false)
                    }
                />
                <SelectionModal
                    visible={showManagerModal}
                    title="Select Manager"
                    data={users}
                    selected={manager?.id}
                    isUser
                    onSelect={value => {
                        setManager(value);
                        setShowManagerModal(false);
                    }}
                    onClose={() =>
                        setShowManagerModal(false)
                    }
                />
                <TeamSelectionModal
                    visible={showTeamModal}
                    users={users}
                    selected={teamMembers}
                    onToggle={toggleTeamMember}
                    onClose={() =>
                        setShowTeamModal(false)
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const Dropdown = ({
    value,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.dropdown}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.dropdownText,
                    value.startsWith('Select') &&
                    styles.placeholderText,
                ]}
            >
                {value}
            </Text>

            <Text style={styles.chevron}>
                ˅
            </Text>

        </TouchableOpacity>
    );
};

const MemberChip = ({
    member,
    onRemove,
}) => {
    const initials =
        `${member.firstName?.charAt(0) || ''}${member.lastName?.charAt(0) || ''}`;
    return (
        <View style={styles.memberChip}>
            <View style={styles.memberChipAvatar}>
                <Text style={styles.memberChipInitials}>
                    {initials}
                </Text>
            </View>

            <Text style={styles.memberChipName}>
                {member.firstName}
            </Text>

            <TouchableOpacity
                onPress={onRemove}
                hitSlop={{
                    top: 8,
                    bottom: 8,
                    left: 8,
                    right: 8,
                }}
            >
                <Text style={styles.removeMember}>
                    ×
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const SelectionModal = ({
    visible,
    title,
    data,
    selected,
    onSelect,
    onClose,
    isUser = false,
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {title}
                            </Text>

                            <TouchableOpacity
                                onPress={onClose}
                                hitSlop={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                }}
                            >
                                <Text style={styles.modalClose}>
                                    ×
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={data}
                            keyExtractor={(item, index) =>
                                isUser
                                    ? item.id
                                    : `${item}-${index}`
                            }
                            ListEmptyComponent={
                                <View style={CommonStyles.emptyList}>
                                    <Text style={CommonStyles.emptyListText}>{Strings.emptyList}</Text>
                                </View>
                            }
                            renderItem={({ item }) => {
                                const value = isUser
                                    ? item.id
                                    : item;

                                const isSelected =
                                    selected === value;

                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.option,
                                            isSelected &&
                                            styles.optionSelected,
                                        ]}
                                        onPress={() => onSelect(item)}
                                    >
                                        {isUser ? (
                                            <>
                                                <View style={styles.optionAvatar}>
                                                    <Text style={styles.optionAvatarText}>
                                                        {item.firstName?.charAt(0)}
                                                        {item.lastName?.charAt(0)}
                                                    </Text>
                                                </View>

                                                <View>
                                                    <Text style={styles.optionText}>
                                                        {item.firstName} {item.lastName}
                                                    </Text>

                                                    <Text style={styles.optionSubText}>
                                                        {item.role}
                                                    </Text>
                                                </View>
                                            </>
                                        ) : (
                                            <Text style={styles.optionText}>
                                                {item}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const TeamSelectionModal = ({
    visible,
    users,
    selected,
    onToggle,
    onClose,
}) => {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Add Team Members
                            </Text>
                            <TouchableOpacity
                                onPress={onClose}
                            >
                                <Text style={styles.modalClose}>
                                    ×
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={users}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={
                                <View style={CommonStyles.emptyList}>
                                    <Text style={CommonStyles.emptyListText}>{Strings.emptyList}</Text>
                                </View>
                            }
                            renderItem={({ item }) => {
                                const isSelected =
                                    selected.some(
                                        member =>
                                            member.id === item.id
                                    );
                                return (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() =>
                                            onToggle(item)
                                        }
                                    >
                                        <View style={styles.optionAvatar}>
                                            <Text style={styles.optionAvatarText}>
                                                {item.firstName?.charAt(0)}
                                                {item.lastName?.charAt(0)}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.optionText}>
                                                {item.firstName} {item.lastName}
                                            </Text>
                                            <Text style={styles.optionSubText}>
                                                {item.role}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.checkbox,
                                                isSelected &&
                                                styles.checkboxSelected,
                                            ]}
                                        >
                                            {isSelected && (
                                                <Text style={styles.checkboxText}>
                                                    ✓
                                                </Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <Button
                            text={'Done'}
                            onPress={onClose}
                            textStyle={styles.modalDoneText}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },

    scrollContent: {
        paddingHorizontal: Spacings.xl,
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(100),
    },
    formLabel: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(5),
        fontSize: fontSizes.sm,
        color: Colors.darkGray,
        fontFamily: Fonts.semiBold,
        paddingTop: 10,
        paddingBottom: 5
    },
    inputContainer: {
        height: verticalScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: scale(10),
        paddingHorizontal: scale(9),
    },
    inputIcon: {
        fontSize: moderateScale(10),
        color: '#9BA5B4',
        marginRight: scale(5),
    },
    input: {
        borderWidth: Numbers.p2,
        borderColor: Colors.textColor,
        alignSelf: 'center',
        borderRadius: Spacings.mxl,
        backgroundColor: Colors.white,
        fontFamily: Fonts.regular,
    },
    descriptionInput: {
        height: verticalScale(48),

        paddingTop: verticalScale(8),

        alignItems: 'flex-start',

        fontSize: moderateScale(8),
    },
    dateRow: {
        flexDirection: 'row',

        justifyContent: 'space-between',

        gap: scale(8),
    },

    dateColumn: {
        flex: 1,
    },

    dateInput: {
        height: verticalScale(30),

        flexDirection: 'row',

        alignItems: 'center',

        paddingHorizontal: scale(9),

        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#E3E8EF',

        borderRadius: scale(10),
    },

    dateText: {
        marginLeft: scale(6),

        fontSize: moderateScale(8),

        color: Colors.textColor,

        fontFamily: Fonts.regular,
    },

    priorityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: scale(5),
    },

    priorityButton: {
        flex: 1,
        height: verticalScale(24),
        borderRadius: scale(15),
        backgroundColor: Colors.inputBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priorityButtonActive: {
        backgroundColor: Colors.primary,
    },
    priorityText: {
        fontSize: moderateScale(7),
        color: Colors.textColor,
        opacity: 0.8,
        fontFamily: Fonts.regular,
        fontSize: fontSizes.xs
    },
    priorityTextActive: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
    },
    dropdown: {
        height: verticalScale(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: scale(20),
        paddingHorizontal: scale(12),
    },
    dropdownText: {
        fontSize: fontSizes.xs,
        color: Colors.textColor,
        fontFamily: Fonts.regular,
    },

    placeholderText: {
        color: Colors.darkGray,
    },
    chevron: {
        fontSize: moderateScale(16),
        color: Colors.darkGray,
    },
    teamContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: scale(5),
    },
    memberChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: scale(18),
        paddingLeft: scale(4),
        paddingRight: scale(6),
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10)
    },
    memberChipAvatar: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(11),
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberChipInitials: {
        fontSize: moderateScale(8),
        color: Colors.white,
        fontFamily: Fonts.semiBold,
    },
    memberChipName: {
        marginLeft: scale(4),
        fontSize: Spacings.xs,
        color: Colors.textColor,
    },
    removeMember: {
        marginLeft: scale(4),
        fontSize: moderateScale(12),
        color: Colors.darkGray,
    },
    addMemberButton: {
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(5),
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: scale(12),
        borderStyle: 'dashed',
    },
    addMemberText: {
        fontSize: fontSizes.xs,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginTop: verticalScale(15),
    },
    cancelButton: {
        flex: 1,
        height: verticalScale(34),
        borderRadius: scale(9),
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0
    },
    cancelText: {
        fontSize: moderateScale(8),
        color: Colors.textColor,
        fontFamily: Fonts.semiBold,
    },
    submitButton: {
        flex: 1,
        height: verticalScale(34),
        borderRadius: scale(9),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonFull: {
        flex: 1,
    },
    submitText: {
        fontSize: fontSizes.xs,
        color: Colors.white,
        fontFamily: Fonts.semiBold,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    modalContainer: {
        maxHeight: '70%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(14),
        paddingBottom: verticalScale(20),
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    modalTitle: {
        fontSize: fontSizes.md,
        color: Colors.textColor,
        fontFamily: Fonts.semiBold,
    },
    modalClose: {
        fontSize: moderateScale(30),
        color: Colors.darkGray,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(8),
        borderRadius: scale(10),
    },
    optionSelected: {
        backgroundColor: Colors.selectedOption,
    },
    optionText: {
        fontSize: fontSizes.sm,
        color: Colors.textColor,
        fontFamily: Fonts.semiBold,
    },

    optionSubText: {
        marginTop: verticalScale(2),
        fontSize: fontSizes.xs,
        color: Colors.darkGray,
    },

    optionAvatar: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(15),
        backgroundColor: Colors.initialsBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(9),
    },

    optionAvatarText: {
        fontSize: fontSizes.xs,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
    },
    checkbox: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(5),
        borderWidth: 1,
        borderColor: Colors.darkGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },

    checkboxText: {
        color: Colors.white,
        fontSize: moderateScale(11),
    },
    modalDoneText: {
        color: Colors.white,
        fontSize: fontSizes.sm,
        fontFamily: Fonts.semiBold,
    },

});

export default ProjectForm;