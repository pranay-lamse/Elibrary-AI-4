import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import "./Members.scss";
import { publicImagePath, publicImagePathURL } from "../../appConstant";
import { maxDigits } from "../../constants";
import memberValidate from "../../shared/userValidate";
import SaveAction from "../../shared/action-buttons/SaveAction";
import InputGroup from "../../shared/components/InputGroup";
import ToggleSwitch from "../../shared/components/ToggleSwitch";
import ImagePicker from "../../shared/lms-image-picker/ImagePicker";
import Select from "../../shared/components/Select";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { enableDisableUserInput } from "../../shared/sharedMethod";
import { default as CustomSelect } from 'react-select';
import { imagePicker } from "../../shared/custom-hooks";
import { fetchCountries } from "../../admin/store/actions/countryAction";
import { fetchMembershipPlans, createMembershipPaymentSessionBackend2, createMembershipPaymentSessionBackendDeleteSubscription } from "../../admin/store/actions/membershipPlanAction";

import { useNavigate } from "react-router";
const MemberFormEdit = (props) => {
  const {
    initialValues,
    membershipPlans,
    memberSubscription,
    countries,
    change,
    handleSubmit,
    onSaveMember,
    fetchCountries,
    fetchMembershipPlans,
    createMembershipPaymentSessionBackend2,
    createMembershipPaymentSessionBackendDeleteSubscription,
    isEditMode,
  } = props;

  const paymodeArray = [
    { id: 1, name: 'Online', value: 'Online', label: 'Online' },
    { id: 2, name: 'Offline', value: 'Offline', label: 'Offline' }
  ];

  const planDetails = [
    {
      id: 1,
      name: "BPL Card Holder",
      value: "BPL Card Holder",
      price: 0,
      deposit: 0,
      renewal_price: 0,
      book_status: "1",
      ebook_status: "1",
      library_status: "1",
      description: "BPL Card will have access as given below for free:",
      frequency: 3,
      slug: "test",
      deleted_at: null,
      created_at: "2024-02-21T10:17:19.000000Z",
      updated_at: "2024-03-01T10:36:07.000000Z",
      num_books_borrow: null
    },
    {
      id: 2,
      name: "Family Plan (4 Member)",
      value: "Family Plan (4 Member)",
      price: 1510,
      deposit: 0,
      renewal_price: 0,
      book_status: "1",
      ebook_status: "0",
      library_status: "0",
      description: "Lifetime membership to borrow books for four members of Family.",
      frequency: 3,
      slug: "golden",
      deleted_at: null,
      created_at: "2022-11-25T00:32:04.000000Z",
      updated_at: "2024-03-01T10:34:54.000000Z",
      num_books_borrow: null
    },
    {
      id: 3,
      name: "Lifetime membership",
      value: "Lifetime membership",
      price: 510,
      deposit: 0,
      renewal_price: 0,
      book_status: "1",
      ebook_status: "0",
      library_status: "0",
      description: "Lifetime membership to borrow books.",
      frequency: 3,
      slug: "golden",
      deleted_at: null,
      created_at: "2022-11-25T00:32:04.000000Z",
      updated_at: "2024-03-01T10:32:42.000000Z",
      num_books_borrow: null
    },
    {
      id: 4,
      name: "Library Access Of Study Room",
      value: "Library Access Of Study Room",
      price: 300,
      deposit: 0,
      renewal_price: 300,
      book_status: "0",
      ebook_status: "0",
      library_status: "1",
      description: "you can have access to the library for study.",
      frequency: 1,
      slug: "library-access-reading",
      deleted_at: null,
      created_at: "2024-02-22T07:34:56.000000Z",
      updated_at: "2024-03-01T10:31:51.000000Z",
      num_books_borrow: null
    },
    {
      id: 5,
      name: "E-LIBRARY ACCESS OF Computer",
      value: "E-LIBRARY ACCESS OF Computer",
      price: 500,
      deposit: 0,
      renewal_price: 500,
      book_status: "0",
      ebook_status: "1",
      library_status: "0",
      description: "to Access E-Books & Study on Computer",
      frequency: 1,
      slug: "e-book-access",
      deleted_at: null,
      created_at: "2024-02-22T07:35:33.000000Z",
      updated_at: "2024-03-01T10:29:55.000000Z",
      num_books_borrow: null
    },
    {
      id: 6,
      name: "Regular Membership",
      value: "Regular Membership",
      price: 130,
      deposit: 250,
      renewal_price: 130,
      book_status: "1",
      ebook_status: "0",
      library_status: "0",
      description: "Yearly membership to borrow books.",
      frequency: 2,
      slug: "silver",
      deleted_at: null,
      created_at: "2022-11-25T00:32:04.000000Z",
      updated_at: "2024-03-01T10:28:59.000000Z",
      num_books_borrow: null
    }
  ];

  const [isActive, setActive] = useState(initialValues.is_active);
  const [subcriptionPlanDeatails, setSubcriptionPlanDeatails] = useState(memberSubscription);
  console.log('subcriptionPlanDeatails', subcriptionPlanDeatails)
  const [planId, setPlanId] = useState(subcriptionPlanDeatails?.subscription_plan?.id);
  const [planIdName, setPlanIdName] = useState(subcriptionPlanDeatails?.subscription_plan?.name);
  const [subscription_id, setSubscription_id] = useState(subcriptionPlanDeatails?.id);

  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const inputRef = createRef();
  const [
    image,
    isDefaultImage,
    file,
    onFileChange,
    onRemovePhoto,
  ] = imagePicker(
    change,
    !!initialValues.image_path
      ? initialValues.image_path
      : !!initialValues.isCreate
        ? publicImagePath.USER_AVATAR
        : null,
    !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
    !!!initialValues.image_path
  );


  const onSave = (formValues) => {
    formValues.file = file;
    onSaveMember(formValues);
  };

  const onChecked = () => {
    setActive(!isActive);
  };
  const imagePickerOptions = {
    user: {
      name: initialValues
        ? initialValues.first_name + " " + initialValues.last_name
        : null,
    },
    image,
    isDefaultImage,
    onRemovePhoto,
    onFileChange,
  };

  const onClickShowPassword = () => {
    setIsPassword(!isPassword);
  };

  const onClickShowConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword);
  };



  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [payableAmount, setPayableAmount] = useState(0);
  const [memberId, setMemberId] = useState(initialValues?.id);

  const [pdfFile, setPdfFile] = useState(null);





  const [paymode, setPayMode] = useState(null);
  const [checkboxState, setCheckboxState] = useState({
    flag1: { checked: false, disabled: false },
    flag2: { checked: false, disabled: false },
    flag3: { checked: false, disabled: false },
  });

  const [checkboxState2, setCheckboxState2] = useState({
    flag1: { checked: subcriptionPlanDeatails?.book_status === null ? false : true, disabled: subcriptionPlanDeatails?.book_status === null ? false : true },
    flag2: { checked: subcriptionPlanDeatails?.library_status === null ? false : true, disabled: subcriptionPlanDeatails?.library_status === null ? false : true },
    flag3: { checked: subcriptionPlanDeatails?.ebook_status === null ? false : true, disabled: subcriptionPlanDeatails?.ebook_status === null ? false : true },
  });
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedPlan(selectedOption);
    setSelectedPlanId(selectedOption.id);
    setPayableAmount(selectedOption.price + selectedOption.deposit);

    setCheckboxState({
      flag1: {
        checked: selectedOption.book_status === "1",
        disabled: selectedOption.book_status === "1",
      },

      flag2: {
        checked: selectedOption.library_status === "1",
        disabled: selectedOption.library_status === "1",
      },
      flag3: {
        checked: selectedOption.ebook_status === "1",
        disabled: selectedOption.ebook_status === "1",
      },
    });
  };



  const handleOptionChange2 = (selectedOption) => {
    setPayMode(selectedOption.value);
  };

  const handleCheckboxChange = (flag, amount) => {
    setCheckboxState((prevState) => {
      const isChecked = !prevState[flag].checked;
      const amountChange = isChecked ? amount : -amount;
      setPayableAmount((prevAmount) => prevAmount + amountChange);
      return {
        ...prevState,
        [flag]: { ...prevState[flag], checked: isChecked },
      };
    });
  };

  const handleCheckboxChange2forupgrade = (flag, amount) => {
    setCheckboxState2((prevState) => {
      const isChecked = !prevState[flag].checked;
      const amountChange = isChecked ? amount : -amount;
      setPayableAmount((prevAmount) => prevAmount + amountChange);
      return {
        ...prevState,
        [flag]: { ...prevState[flag], checked: isChecked },
      };
    });
  };

  const handleCheckboxChange2 = (flag, amount) => {
    setCheckboxState((prevState) => {
      const isChecked = !prevState[flag].checked;
      const amountChange = isChecked ? amount : -amount;
      setPayableAmount((prevAmount) => prevAmount + amountChange);
      return {
        ...prevState,
        [flag]: { ...prevState[flag], checked: isChecked },
      };
    });
  };




  const [memberOne, setMemberOne] = useState("");
  const [memberTwo, setMemberTwo] = useState("");
  const [memberThree, setMemberThree] = useState("");

  const clickOnTryIt = async (id) => {
    /*  planDetails.toReversed().map((plan) => {
       if (id === plan.id) {


         let finalPrice = plan.price + plan.deposit; // Initialize final price with the base price

         if (
           checkboxState.flag1.checked &&
           !checkboxState.flag2.checked &&
           !checkboxState.flag3.checked
         ) {
           finalPrice += 380;
         }

         if (
           checkboxState.flag2.checked &&
           !checkboxState.flag1.checked &&
           !checkboxState.flag3.checked
         ) {
           finalPrice += 300; // Add 500 if checkbox2 is checked
         }

         if (
           checkboxState.flag3.checked &&
           !checkboxState.flag1.checked &&
           !checkboxState.flag2.checked
         ) {
           finalPrice += 500; // Add 300 if checkbox3 is checked
         }

         if (
           checkboxState.flag3.checked &&
           checkboxState.flag2.checked &&
           !checkboxState.flag1.checked
         ) {
           finalPrice += 800;
         }

         if (
           checkboxState.flag1.checked &&
           checkboxState.flag2.checked &&
           !checkboxState.flag3.checked
         ) {
           finalPrice += 680;
         }

         if (
           checkboxState.flag1.checked &&
           checkboxState.flag3.checked &&
           !checkboxState.flag2.checked
         ) {
           finalPrice += 880;
         }

         window.final_price = finalPrice;
       }
     });
     let finalPrice = window.final_price; */

    if (paymode == 'Offline') {
      if (id === 2) {
        if (!memberOne || !memberTwo || !memberThree) {
          alert("All fields are required");
          return;
        }

        const url = `${window.location.origin}/test-payment3-backend/${payableAmount}/${checkboxState.flag1.checked}/${checkboxState.flag2.checked}/${checkboxState.flag3.checked}/${memberOne}/${memberTwo}/${memberThree}?id=${id}&plan_amount=${payableAmount}&paymode=${paymode}&memberId=${memberId}`;
        window.location.href = url;




      } else if (id === 1) {
        if (!pdfFile) {
          alert("BPL Document required");
          return;

        }

        const libraryIdNew = "";
        console.log('here', pdfFile);


        createMembershipPaymentSessionBackend2(
          id,
          true,
          pdfFile,
          libraryIdNew,
          memberId,
          navigate
        );

      } else {
        const url = `${window.location.origin}/test-payment-backend/${payableAmount}/${checkboxState.flag1.checked}/${checkboxState.flag2.checked}/${checkboxState.flag3.checked}?id=${id}&memberId=${memberId}&plan_amount=${payableAmount}&paymode=${paymode}`;
        window.location.href = url;
      }

    } else if (paymode == 'Online') {
      if (id === 2) {
        if (!memberOne || !memberTwo || !memberThree) {
          alert("All fields are required");
          return;
        }

        const url = `${window.location.origin}/test-payment3-backend/${payableAmount}/${checkboxState.flag1.checked}/${checkboxState.flag2.checked}/${checkboxState.flag3.checked}/${memberOne}/${memberTwo}/${memberThree}?id=${id}&plan_amount=${payableAmount}&paymode=${paymode}&memberId=${memberId}`;
        window.location.href = url;
        /* ${window.location.origin} */
        /* ${window.location.origin} */



      } else if (id === 1) {
        if (!pdfFile) {
          alert("BPL Document required");
          return;

        }

        createMembershipPaymentSessionBackend2(
          id,
          true,
          pdfFile,
          libraryIdNew,
          memberId,
          navigate
        );





      } else {
        const url = `${window.location.origin}/test-payment-backend/${payableAmount}/${checkboxState.flag1.checked}/${checkboxState.flag2.checked}/${checkboxState.flag3.checked}?id=${id}&memberId=${memberId}&plan_amount=${payableAmount}&paymode=${paymode}`;
        window.location.href = url;
      }

    }
    else {
      if (paymode) {
        alert("Select PayMode");
        return;
      }

    }




  };

  const clickOnTryItMemberDelete = async (id) => {


    createMembershipPaymentSessionBackendDeleteSubscription(

      subscription_id,
      navigate
    );

  }






  const clickOnTryItforupgrade = async (id) => {

    /*  planDetails.toReversed().map((plan) => {
       if (id === plan.id) {


         let finalPrice = plan.price + plan.deposit; // Initialize final price with the base price

         if (
           checkboxState2.flag1.checked &&
           !checkboxState2.flag2.checked &&
           !checkboxState2.flag3.checked
         ) {
           finalPrice += 380;
         }

         if (
           checkboxState2.flag2.checked &&
           !checkboxState2.flag1.checked &&
           !checkboxState2.flag3.checked
         ) {
           finalPrice += 300; // Add 500 if checkbox2 is checked
         }

         if (
           checkboxState2.flag3.checked &&
           !checkboxState2.flag1.checked &&
           !checkboxState2.flag2.checked
         ) {
           finalPrice += 500; // Add 300 if checkbox3 is checked
         }

         if (
           checkboxState2.flag3.checked &&
           checkboxState2.flag2.checked &&
           !checkboxState2.flag1.checked
         ) {
           finalPrice += 800;
         }

         if (
           checkboxState2.flag1.checked &&
           checkboxState2.flag2.checked &&
           !checkboxState2.flag3.checked
         ) {
           finalPrice += 680;
         }

         if (
           checkboxState2.flag1.checked &&
           checkboxState2.flag3.checked &&
           !checkboxState2.flag2.checked
         ) {
           finalPrice += 880;
         }

         window.final_price = finalPrice;
       }
     });
     let finalPrice = window.final_price; */


    if (paymode == 'Offline') {
      if (id === 2) {




        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;




      } else if (id === 1) {
        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;


      } else {
        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;
      }

    } else if (paymode == 'Online') {
      if (id === 2) {


        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;




      } else if (id === 1) {
        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;


      } else {
        const url = `${window.location.origin}/test-payment2-backend/${payableAmount}/${checkboxState2.flag1.checked}/${checkboxState2.flag2.checked}/${checkboxState2.flag3.checked}?paymode=${paymode}&memberId=${memberId}&id=${id}&plan_amount=${payableAmount}&subscription_id=${subscription_id}`;
        window.location.href = url;
      }

    }
    else {
      if (paymode) {
        alert("Select PayMode");
        return;
      }

    }




  };


  return (
    <Row className="animated fadeIn member-form m-none m-sm-3">
      <Col xs={8} md={12} lg={8} className="primary-detail">
        <div className="d-flex justify-content-between">
          <h5>{getFormattedMessage("profile.primary-details")}</h5>
          <div className="d-flex">
            <div>
              <Field
                name="is_active"
                checked={isActive}
                label={getFormattedMessage("profile.toggle.is-active.label")}
                component={ToggleSwitch}
                onChange={onChecked}
              />
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "0px" }} />
        <Row>
          <Col xs={12} sm={6} lg={6}>
            <Field
              name="first_name"
              label="profile.input.first-name.label"
              required
              inputRef={inputRef}
              groupText="user-circle-o"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6} lg={6}>
            <Field
              name="last_name"
              label="profile.input.last-name.label"
              required
              groupText="user"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6} lg={6}>
            <Field
              name="email"
              label="profile.input.email.label"
              required
              groupText="envelope"
              autoComplete={initialValues ? "off" : "new-email"}
              component={InputGroup}
            />
          </Col>
          {initialValues.isCreate ? (
            <Col xs={12} sm={6} lg={6}>
              <Field
                name="password"
                label="profile.input.password.label"
                required
                autoComplete={initialValues ? "off" : "new-password"}
                type={isPassword ? "password" : "text"}
                groupText="lock"
                component={InputGroup}
                appendGroupText={isPassword ? "eye-slash" : "eye"}
                isAppendIcon
                onClick={() => onClickShowPassword()}
              />
            </Col>
          ) : null}

          {initialValues.isCreate ? (
            <Col xs={12} sm={6} lg={6}>
              <Field
                name="confirm_password"
                label="profile.input.confirm-password.label"
                required
                autoComplete={initialValues ? "off" : "new-password"}
                type={isConfirmPassword ? "password" : "text"}
                groupText="lock"
                component={InputGroup}
                appendGroupText={isConfirmPassword ? "eye-slash" : "eye"}
                isAppendIcon
                onClick={() => onClickShowConfirmPassword()}
              />
            </Col>
          ) : null}
          <Col xs={12} sm={6} lg={6}>
            <Field
              name="phone"
              type="number"
              label="profile.input.phone.label"
              onChange={(e) =>
                enableDisableUserInput(e, maxDigits.PHONE_NUMBER)
              }
              groupText="phone"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6} lg={6}>
            <Field
              name="aadhaar"
              type="number"
              label="profile.input.aadhaar.label"
              onChange={(e) => enableDisableUserInput(e, 16)}
              groupText="aadhaar"
              component={InputGroup}
            />
          </Col>

        </Row>
      </Col>
      <Col xs={4} md={12} lg={4} className="member-profile">
        <h5 className="member-profile__title">
          {getFormattedMessage("profile.member-profile")}
        </h5>
        <hr />
        <div className="mt-5">
          <Field name="file_name" type="hidden" component={InputGroup} />
          <ImagePicker {...imagePickerOptions} />
        </div>
      </Col>
      <Col xs={12} className="mt-2">
        <h5>{getFormattedMessage("profile.additional-details")}</h5>
        <hr />
        <Row>
          <Col xs={12} sm={6}>
            <Field
              name="address_1"
              label="profile.input.address1.label"
              groupText="address-book"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              name="address_2"
              label="profile.input.address2.label"
              groupText="address-book-o"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              name="city"
              label="profile.input.city.label"
              groupText="circle"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              name="state"
              label="profile.input.state.label"
              groupText="square"
              component={InputGroup}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              name="country"
              label="profile.select.country.label"
              options={countries}
              placeholder="profile.select.country.placeholder"
              groupText="flag"
              component={Select}
              isSearchable={true}
              isMini={true}
              menuPlacement="top"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              type="number"
              className="inputBox"
              name="zip"
              label="profile.input.zip.label"
              groupText="map-pin"
              component={InputGroup}
            />
          </Col>
        </Row>
      </Col>


      {subcriptionPlanDeatails != null ?
        (<Col xs={12} className="mt-2 assign-subscription">
          <h5>{getFormattedMessage("Upgrade Subscription")}</h5>
          <button
            onClick={() => clickOnTryItMemberDelete(memberId)}
            className="btn frontend-btn btn-primary mt-2"


          >Delete Subscription</button>
          <hr />

          <div class="assign-table-new mt-2" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {/* <CustomSelect
                  name="plan"
                  label="Plan"
                  options={planDetails.reverse().map(plan => ({ value: plan.id, label: plan.name, ...plan }))}
                  placeholder="Plan"
                  onChange={() => { }}
                  menuPlacement="top"
                  value={planId}
                  required
                  style={{ marginBottom: '20px' }}
                /> */}
            {planIdName && (
              <div>
                <h2 style={{ fontSize: '24px', marginBottom: '0px', color: '#333' }}>Selected Plan: {planIdName}</h2>
              </div>
            )}
            <div >
              <label style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  checked={checkboxState2.flag1.checked}
                  disabled={checkboxState2.flag1.disabled || !planId}
                  onChange={() => handleCheckboxChange2forupgrade('flag1', 380)}
                /> {" "}
                Access of Books (₹ 130 / Year + ₹ 250 ONE-TIME)
              </label>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  checked={checkboxState2.flag2.checked}
                  disabled={checkboxState2.flag2.disabled || !planId}
                  onChange={() => handleCheckboxChange2forupgrade('flag2', 300)}
                />
                {" "}
                Library Access of Study Room (₹ 300 / Month)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checkboxState2.flag3.checked}
                  disabled={checkboxState2.flag3.disabled || !planId}
                  onChange={() => handleCheckboxChange2forupgrade('flag3', 500)}
                />
                {" "}
                Access of Ebook & Computer For Study (₹ 500 / Month)
              </label>
            </div>


            <label className="mt-4" style={{ display: 'block', marginBottom: '10px', fontSize: '16px', color: '#333' }}>
              Payable Amount:{' '}
              <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>₹{payableAmount}</span>
            </label>

            <div style={{ marginBottom: '20px' }}>
              <CustomSelect
                name="Pay Mode"
                label="Pay Mode"
                options={paymodeArray.map(plan => ({ value: plan.id, label: plan.name, ...plan }))}
                placeholder="Pay Mode"
                onChange={handleOptionChange2}
                menuPlacement="top"
                required
                isDisabled={!planId}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <button
                onClick={() => clickOnTryItforupgrade(planId)}
                className="btn frontend-btn btn-primary"
                style={{
                  opacity: planId && paymode ? 1 : 0.5,
                  pointerEvents: planId && paymode ? 'auto' : 'none'
                }}
                disabled={!planId || !paymode}
              >
                <span>Upgrade Subscription</span>
              </button>
            </div>
          </div>

        </Col>)
        :
        (<Col xs={12} className="mt-2 assign-subscription">
          <h5>{getFormattedMessage("Assign Subscription")}</h5>
          <hr />

          <div className="assign-table-new mt-2" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CustomSelect
              name="plan"
              label="Plan"
              options={planDetails.reverse().map(plan => ({ value: plan.id, label: plan.name, ...plan }))}
              placeholder="Plan"
              onChange={handleOptionChange}
              menuPlacement="top"
              required
              style={{ marginBottom: '20px' }}
            />
            {selectedPlan && (
              <div className="mt-4">
                <h2 style={{ fontSize: '24px', marginBottom: '0px', color: '#333' }}>Selected Plan: {selectedPlan.name}</h2>
              </div>
            )}
            {selectedPlan && (
              <div>
                <label style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    checked={checkboxState.flag1.checked}
                    disabled={checkboxState.flag1.disabled || !selectedPlan}
                    onChange={() => handleCheckboxChange('flag1', 380)}
                  />
                  {" "}
                  Access of Books (₹ 130 / Year + ₹ 250 ONE-TIME)
                </label>
                <label style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    checked={checkboxState.flag2.checked}
                    disabled={checkboxState.flag2.disabled || !selectedPlan}
                    onChange={() => handleCheckboxChange('flag2', 300)}
                  />
                  {" "}
                  Library Access of Study Room (₹ 300 / Month)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={checkboxState.flag3.checked}
                    disabled={checkboxState.flag3.disabled || !selectedPlan}
                    onChange={() => handleCheckboxChange('flag3', 500)}
                  />
                  {" "}
                  Access of Ebook & Computer For Study (₹ 500 / Month)
                </label>
              </div>

            )}


            {selectedPlanId == 1 && (
              <div className="mt-4">
                <h4>Enter BPL Document</h4>

                <label htmlFor="pdf_preview_file">
                  Upload BPL Document
                  (jpg,png)
                </label>

                <input
                  name="pdf_preview_file"
                  type="file"
                  required
                  onChange={handleFileChange}
                  style={{
                    marginRight: "10px",
                  }}
                />




              </div>
            )}
            {selectedPlanId == 2 && (
              <div className="mt-4">
                <h4>Enter Members Names</h4>
                <label>
                  <input
                    type="text"

                    value={initialValues?.first_name + " " + initialValues?.last_name}

                  />

                </label>
                <label>
                  <input
                    type="text"

                    onChange={(e) => setMemberOne(e.target.value)}

                    required
                  />

                </label>
                <label>
                  <input
                    type="text"

                    onChange={(e) => setMemberTwo(e.target.value)}

                    required
                  />

                </label>

                <label>
                  <input
                    type="text"

                    onChange={(e) => setMemberThree(e.target.value)}

                    required
                  />

                </label>


              </div>
            )}
            <label className="mt-4" style={{ display: 'block', marginBottom: '10px', fontSize: '16px', color: '#333' }}>
              Payable Amount:{' '}
              <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>₹{payableAmount}</span>
            </label>

            <div style={{ marginBottom: '20px' }}>
              <CustomSelect
                name="Pay Mode"
                label="Pay Mode"
                options={paymodeArray.map(plan => ({ value: plan.id, label: plan.name, ...plan }))}
                placeholder="Pay Mode"
                onChange={handleOptionChange2}
                menuPlacement="top"
                required
                isDisabled={!selectedPlan}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <button
                onClick={() => clickOnTryIt(selectedPlanId)}
                className="btn frontend-btn btn-primary"
                style={{
                  opacity: selectedPlan && paymode ? 1 : 0.5,
                  pointerEvents: selectedPlan && paymode ? 'auto' : 'none'
                }}
                disabled={!selectedPlan || !paymode}
              >
                <span>Add Subscription</span>
              </button>
            </div>
          </div>



        </Col>)

      }





      <Col xs={12}>
        <SaveAction onSave={handleSubmit(onSave)} {...props} />
      </Col>
    </Row>
  );
};

MemberFormEdit.propTypes = {
  initialValues: PropTypes.object,
  memberSubscription: PropTypes.object,
  membershipPlans: PropTypes.array,
  countries: PropTypes.array,
  fetchCountries: PropTypes.func,
  fetchMembershipPlans: PropTypes.func,
  onSaveMember: PropTypes.func,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
};

const memberFormEdit = reduxForm({ form: "MemberFormEdit", validate: memberValidate })(
  MemberFormEdit
);
const mapStateToProps = (state) => {
  const { membershipPlans, countries } = state;
  return {
    membershipPlans: Object.values(membershipPlans),
    countries,
  };
};

export default connect(mapStateToProps, {
  fetchCountries,
  fetchMembershipPlans,
  createMembershipPaymentSessionBackend2,
  createMembershipPaymentSessionBackendDeleteSubscription
})(memberFormEdit);
