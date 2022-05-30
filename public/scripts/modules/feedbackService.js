import { feedback } from "./setup.js";
class FeedbackService {
    updateFeedback(stats) {
        if (feedback)
            feedback.innerText =
                `Level: ${stats.level} \n
         Score: ${stats.score} \n
         Register: ${stats.register} \n
         User Word: ${stats.userWord} \n
         Current Word: ${stats.currentWord} \n
         Visible Words: ${stats.visibleWords.map(x => `\n ${x.word}, PosY: ${x.posY}`)} \n`;
    }
}
export const feedbackService = new FeedbackService();
