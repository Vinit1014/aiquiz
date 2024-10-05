const Groq = require("groq-sdk");

const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});

const generateSuggestions = async (incorrectResponses) => {
    // Craft a prompt for Groq AI
    const prompt = `
        Based on the following incorrect answers from a user, suggest two specific areas where the user can improve their skills. Please provide your suggestions in the following format:
        
        Areas to improve:
        1. [First area for improvement]
        2. [Second area for improvement]

        Here are the details of the incorrect answers:
        ${incorrectResponses.map((res, index) => (
            `\n${index + 1}. Question: ${res.question.text}\nUser's Response: ${res.userResponse}\nCorrect Answer: ${res.question.correctAnswer}`
        )).join('\n')}
        
        Focus on identifying key skills or knowledge areas that the user needs to work on based on their mistakes.
    `;


    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192", // Use the appropriate model
    });

    // console.log(chatCompletion.choices[0]);
    

    const suggestions = chatCompletion.choices[0]?.message?.content.trim();
    return suggestions;
    // try {
    //     // Send the prompt to Groq AI and get suggestions
    //     const aiResponse = await groqClient.generate({ prompt });
    //     return suggestions;
    // } catch (error) {
    //     console.error('Error generating AI suggestions:', error);
    //     return 'Could not generate suggestions due to an error.';
    // }
};

module.exports = {generateSuggestions};