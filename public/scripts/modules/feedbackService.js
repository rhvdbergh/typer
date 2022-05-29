import { feedback } from "./setup.js";
class FeedbackService {
    updateFeedback(stats) {
        console.log('updating feedback');
        if (feedback)
            feedback.innerText =
                `Level: ${stats.level} \n
         Score: ${stats.score} \n
         Register: ${stats.register} \n
         UserWord: ${stats.userWord} \n
         CurrentWord: ${stats.currentWord}`;
    }
}
export const feedbackService = new FeedbackService();
