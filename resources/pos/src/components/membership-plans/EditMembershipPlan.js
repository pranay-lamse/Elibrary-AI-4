import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MembershipPlanForm from "./MembershipPlanForm";
import { membershipPlanFrequencyOptions } from "../../constants";
import Modal from "../../shared/components/Modal";
import { getFormattedOptions } from "../../shared/sharedMethod";
import { editMembershipPlan } from "../../admin/store/actions/membershipPlanAction";

const EditMembershipPlan = (props) => {
    const { membershipPlan, currency, editMembershipPlan, toggleModal } = props;
    const {
        name,
        membership_plan_id,
        price,
        frequency,
        // stripe_plan_id
        description,
        deposit,
        renewal_price,
        book_status,
        ebook_status,
        library_status,
    } = membershipPlan;
    const membershipFrequencyOptions = getFormattedOptions(
        membershipPlanFrequencyOptions
    );
    const changeAbleFields = {
        name,
        membership_plan_id,
        price,
        deposit,
        renewal_price,
        description,
        book_status,
        ebook_status,
        library_status,
        frequency: membershipFrequencyOptions.find(
            (option) => option.id === frequency
        ),
    };

    const onSaveMembershipPlan = (formValues) => {
        editMembershipPlan(props.membershipPlan.id, formValues);
    };
    // const plan = props.membershipPlan;

    const prepareFormOption = {
        // plan,
        membershipPlan,
        onSaveMembershipPlan,
        onCancel: toggleModal,
        initialValues: changeAbleFields,
        currency: currency,
    };
    // console.log('membershipPlan', props.membershipPlan);
    console.log("final1");

    return (
        <Modal
            {...props}
            content={<MembershipPlanForm {...prepareFormOption} />}
        />
    );
};

EditMembershipPlan.propTypes = {
    membershipPlan: PropTypes.object,
    currency: PropTypes.string,
    editMembershipPlan: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editMembershipPlan })(EditMembershipPlan);
