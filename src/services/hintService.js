const Groq = require("groq-sdk");
const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});

const generateHint = async (questionText) => {
    
    // Prompt for AI to generate hints
    const prompt = `
        Provide a helpful hint to answer the following question:
        Question: "${questionText}"
        The hint should not give away the answer, but help guide the user toward the correct solution. Be specific about your response short and crisp and contain only message no other text to be printed
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            model: "llama3-8b-8192", // Use the appropriate model
        });

        const hints = chatCompletion.choices[0]?.message?.content || "";
        return hints;
    } catch (error) {
        console.error('Error generating hint:', error);
        throw new Error('Failed to generate hint');
    }
};

module.exports = { generateHint };
