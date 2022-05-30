import {feedback} from "./setup";
import {IStats} from "../models/IStats";

class FeedbackService {
    updateFeedback(stats: IStats) {
        if (feedback)
            feedback.innerText =
                `Level: ${stats.level} \n
         Score: ${stats.score} \n
         Register: ${stats.register} \n
         User Word: ${stats.userWord} \n
         Current Word: ${stats.currentWords && stats.currentWords.map(x => x)} \n
         Visible Words: ${stats.visibleWords.map(x => `\n ${x.word}, PosY: ${x.posY}`)} \n`
    }
}

export default new FeedbackService();