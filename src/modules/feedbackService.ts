import {feedback} from "./setup";
import {Stats} from "../models/Stats";

class FeedbackService {
    updateFeedback(stats: Stats) {
        if (feedback)
            feedback.innerText =
                `Level: ${stats.level} \n
         Score: ${stats.score} \n
         Lives: ${stats.lives} \n
         Register: ${stats.register} \n
         User Word: ${stats.userWord} \n
         Current Word: ${stats.currentWords && stats.currentWords.map(x => x)} \n
         Visible Words: ${stats.visibleWords} \n`
    }
}

export default new FeedbackService();