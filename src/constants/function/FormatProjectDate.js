export const formatProjectDate = (date) => {
    if (!date) return '';

    let jsDate;

    // Firestore Timestamp
    if (typeof date.toDate === 'function') {
        jsDate = date.toDate();
    }

    // JavaScript Date
    else if (date instanceof Date) {
        jsDate = date;
    }

    // Timestamp in milliseconds
    else if (typeof date === 'number') {
        jsDate = new Date(date);
    }

    // Firestore timestamp object
    else if (date.seconds) {
        jsDate = new Date(date.seconds * 1000);
    }

    else {
        return '';
    }

    if (isNaN(jsDate.getTime())) {
        return '';
    }

    return jsDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
    });
};