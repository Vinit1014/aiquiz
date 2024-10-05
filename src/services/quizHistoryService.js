
// const { Submission } = require('../models/quizModel');

// const fetchQuizHistory = async (filters) => {
//     const { grade, subject, marks, from, to, completedDate } = filters;
//     console.log(grade, completedDate);
    
//     // Initialize the query object
//     const query = {};

//     // Filter by marks if provided
//     if (marks) {
//         console.log('Filtering by marks: ', marks);
//         query.marks = { $gte: parseInt(marks, 10) };
//     }

//     if (completedDate) {
//         const date = new Date(completedDate); // Convert string to Date
//         const startOfDay = new Date(date.setHours(0, 0, 0, 0));
//         const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
//         // Set query for completedDate
//         query.submittedAt = {
//             $gte: startOfDay,
//             $lte: endOfDay,
//         };
//     }

//     if (from && to) {
//         const startOfRange = new Date(from); // Convert 'from' string to Date
//         startOfRange.setHours(0, 0, 0, 0); // Set to start of the day
        
//         const endOfRange = new Date(to); // Convert 'to' string to Date
//         endOfRange.setHours(23, 59, 59, 999); // Set to end of the day
        
//         query.submittedAt = {
//             $gte: startOfRange,
//             $lte: endOfRange,
//         };
//     } else if (from) {
//         const startOfRange = new Date(from);
//         startOfRange.setHours(0, 0, 0, 0);
//         query.submittedAt = { $gte: startOfRange };
//     } else if (to) {
//         const endOfRange = new Date(to);
//         endOfRange.setHours(23, 59, 59, 999);
//         query.submittedAt = { $lte: endOfRange };
//     }

//     console.log(query);

//     // const rawSubmissions = await Submission.find(query); // Before populating
//     // console.log('Raw Submissions:', rawSubmissions);
    
//     // Query the Submission model and populate quiz data
//     const history = await Submission.find(query).populate({
//         path: 'quizId', // Populate quiz data
//         select: 'grade subject', // Only select fields relevant for filtering
//     });

//     console.log(history);
    
//     // Further filter by grade and subject if provided
//     const filteredHistory = history.filter(
//         (submission) => 
//             submission.quizId && // Ensure quizId is populated
//             (!grade || submission.quizId.grade === parseInt(grade, 10)) && // Apply grade filter if provided
//             (!subject || submission.quizId.subject === subject) // Apply subject filter if provided
//     );

//     return filteredHistory;
// };

// module.exports = { fetchQuizHistory };


const redisClient = require('../utils/redis');
const { Submission } = require('../models/quizModel');

const fetchQuizHistory = async (filters) => {
    const { grade, subject, marks, from, to, completedDate } = filters;

    // Create a unique cache key based on filters
    const cacheKey = `quizHistory:${JSON.stringify(filters)}`;
    
    try {
        // Check if the data is already cached in Redis
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Returning cached data');
            return JSON.parse(cachedData); // Return cached data
        }

        // Initialize the query object
        const query = {};

        // Filter by marks if provided
        if (marks) {
            query.marks = { $gte: parseInt(marks, 10) };
        }

        // Filter by completed date or date range
        if (completedDate) {
            const date = new Date(completedDate);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));
            query.submittedAt = {
                $gte: startOfDay,
                $lte: endOfDay,
            };
        }

        if (from && to) {
            const startOfRange = new Date(from);
            startOfRange.setHours(0, 0, 0, 0);
            const endOfRange = new Date(to);
            endOfRange.setHours(23, 59, 59, 999);
            query.submittedAt = {
                $gte: startOfRange,
                $lte: endOfRange,
            };
        } else if (from) {
            const startOfRange = new Date(from);
            startOfRange.setHours(0, 0, 0, 0);
            query.submittedAt = { $gte: startOfRange };
        } else if (to) {
            const endOfRange = new Date(to);
            endOfRange.setHours(23, 59, 59, 999);
            query.submittedAt = { $lte: endOfRange };
        }

        // Query the Submission model and populate quiz data
        const history = await Submission.find(query).populate({
            path: 'quizId',
            select: 'grade subject',
        });

        // Filter by grade and subject if provided
        const filteredHistory = history.filter(
            (submission) =>
                submission.quizId &&
                (!grade || submission.quizId.grade === parseInt(grade, 10)) &&
                (!subject || submission.quizId.subject === subject)
        );

        // Cache the result in Redis with an expiration time (e.g., 1 hour)
        await redisClient.set(cacheKey, JSON.stringify(filteredHistory), {
            EX: 3600, // Expire in 1 hour (3600 seconds)
        });

        return filteredHistory;
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        throw error;
    }
};

module.exports = { fetchQuizHistory };
