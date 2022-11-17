import { Reply } from "../../pages/StudioDetail/Relay";
import { reportService } from "../../services/ReportService";
import { SHOW_MODAL } from "../types/modalTypes";

export const reportDetailAction = (data) => {
  return async (dispatch) => {
    try {
      await reportService.createReportDetail(data);
      dispatch({ type: SHOW_MODAL, Component: <Reply /> });
    } catch (error) {
      console.log(error);
    }
  };
};
