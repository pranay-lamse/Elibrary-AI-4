import { setLoading } from "./loadingAction";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType } from "../../constants";
import { addToast } from "./toastAction";

export const purchaseReturnPdfAction =
    (purchaseId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.PURCHASE_RETURN_PDF + "/" + purchaseId)
            .then((response) => {
                if (response) {
                    window.open(
                        response.data.data.purchase_return_pdf_url,
                        "_blank"
                    );
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
            });
    };
