import {
    logEvent,
    logScreenView,
} from "@react-native-firebase/analytics";

import { analytics } from '../firebase/firebaseConfig';

export const logDashboardView = async () => {
    try {
        await logScreenView(analytics, {
            screen_name: "Dashboard",
            screen_class: "DashboardScreen",
        });
    } catch (error) {
        console.log("Analytics screen error:", error);
    }
};

export const logDashboardEvent = async (eventName, params = {}) => {
    try {
        await logEvent(analytics, eventName, params);
    } catch (error) {
        console.log("Analytics event error:", error);
    }
};