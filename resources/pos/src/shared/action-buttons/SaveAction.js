import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import "./ActionButtons.scss";
import { getFormattedMessage } from "../sharedMethod";

const SaveAction = ({
    onSave,
    onCancel,
    invalid,
    isHideCancel,
    pristine,
    isDisableSubmit = false,
    newBookItem,
    isCreateInEdit,
    isLoading,
}) => {
    return (
        <div className="save-action">
            <Button
                onClick={onSave}
                disabled={
                    invalid || pristine || isCreateInEdit || isLoading
                        ? true
                        : isDisableSubmit
                }
                color="primary"
                size="md"
                className="save-action__save-btn text-white"
            >
                {newBookItem
                    ? getFormattedMessage(
                          "books.items.input.add-item-btn.label"
                      )
                    : isLoading
                    ? "Saving..."
                    : getFormattedMessage("global.input.save-btn.label")}
            </Button>
            {!isHideCancel ? (
                <Button
                    onClick={onCancel}
                    color="secondary"
                    className="save-action__cancel-btn"
                    size="md"
                >
                    {getFormattedMessage("global.input.cancel-btn.label")}
                </Button>
            ) : null}
        </div>
    );
};

SaveAction.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default SaveAction;
