import { feedback } from "./setup";
class FeedbackService {
    updateFeedback(stats) {
        if (feedback)
            feedback.innerText =
                `Level: ${stats.level} \n
         Score: ${stats.score} \n
         Lives: ${stats.lives} \n
         Register: ${stats.register} \n
         User Word: ${stats.userWord} \n
         Current Word: ${stats.currentWords && stats.currentWords.map(x => x)} \n
         Visible Words: ${stats.visibleWords} \n
         Level Words: ${stats.levelWords} \n`;
    }
}
export default new FeedbackService();
