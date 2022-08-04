import { IAuthErrorResponse } from "../lib/types";
import { showToast } from "../component/toast/Toast";

export const errorHandler = (err: IAuthErrorResponse<{ error: string }>) => {
  if (err.data.error) {
    return showToast({ type: "error", message: `${err.data.error}` });
  } else {
    return showToast({ type: "error", message: "Something went wrong..." });
  }
};
export const successHandler = (msg: string) => {
  return showToast({ type: "success", message: msg });
};
