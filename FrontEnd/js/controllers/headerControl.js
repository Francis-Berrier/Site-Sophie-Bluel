import { checkEditHeader } from "../functions/checkEditMode.js";
import { boutonsLog } from "../functions/boutonsLog.js";

export function headerControl() {
    checkEditHeader();
    boutonsLog();
}