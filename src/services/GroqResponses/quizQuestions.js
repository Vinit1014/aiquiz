const Groq = require("groq-sdk");
const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});

const generateQuizQuestions = async(grade, subject, totalQuestions, difficulty)=>{
    const prompt = `Generate ${totalQuestions} quiz questions for grade ${grade} students in ${subject}. Each question should be in the following JSON format: {"questionId": "unique id in format q1, q2", "questionText": "question text", "options": ["option A", "option B", "option C", "option D"], "correctAnswer": "one of the options give me option number as 1 or 2 or 3 or 4"}. Return the result as a valid JSON array.No other text to be written`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192", // Use the appropriate model
    });

    // console.log(chatCompletion.choices[0]?.message);
    const generatedQuestions = chatCompletion.choices[0]?.message?.content || "";
    return JSON.parse(generatedQuestions);
}

module.exports = {generateQuizQuestions};
