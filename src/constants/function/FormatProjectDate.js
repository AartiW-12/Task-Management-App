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

    // Date string: "2026-12-28"
    else if (typeof date === 'string') {
        jsDate = new Date(`${date}T00:00:00`);
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