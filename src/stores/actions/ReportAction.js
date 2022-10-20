import { Reply } from "../../pages/StudioDetail/Relay";
import { reportService } from "../../services/ReportService";
import { SHOW_MODAL } from "../types/modalTypes";

export const reportDetailAction = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const data1 = await reportService.createReportDetail(data);
      console.log(data1);
      dispatch({ type: SHOW_MODAL, Component: <Reply /> });
    } catch (error) {
      console.log(error);
    }
  };
};
