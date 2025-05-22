import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import CustomInput from "../../../shared/components/CustomInput";
import {Button, Col, ListGroup, ListGroupItem, Popover, PopoverBody, PopoverHeader, Row} from "reactstrap";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {chartLabels, chartLabelSelector} from "../../constants";
import DatePicker from "../../../shared/components/DatePicker";
import moment from "moment";
import {dateFormat} from "../../../constants";
import "./DateRangePicker.scss";

const DateRangePicker = (props) => {
    const { change, onDateSelector } = props;
    const [selectedMinDate, setSelectedMinDate] = useState(moment().startOf('month').toDate());
    const [selectedMaxDate, setSelectedMaxDate] = useState(moment().endOf('month').toDate());
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [applyButton, setApplyButton] = useState(false);
    const [childPopoverOpen, setChildPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(true);
    const toggleChild = () => setChildPopoverOpen(!childPopoverOpen);
    const today = moment().format(dateFormat.NATIVE);
    const nextWeek = moment().add(1, 'week').format(dateFormat.NATIVE);
    const lastWeek = moment().subtract(1, 'week').format(dateFormat.NATIVE);
    const startMonth = moment().startOf('month').format(dateFormat.NATIVE);
    const nextMonth = moment().endOf('month').format(dateFormat.NATIVE);
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.NATIVE);
    const endOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.NATIVE);
    const interStartMediateDate = moment(selectedMinDate).format(dateFormat.NATIVE);
    const interMediateEndDate = moment(selectedMaxDate).format(dateFormat.NATIVE);
    const inputToady = moment().format(dateFormat.CHART_DATE);
    const inputNextWeek = moment().add(1, 'week').format(dateFormat.CHART_DATE);
    const inputLastWeek = moment().subtract(1, 'week').format(dateFormat.CHART_DATE);
    const inputStartMonth = moment().startOf('month').format(dateFormat.CHART_DATE);
    const inputNextMonth = moment().endOf('month').format(dateFormat.CHART_DATE);
    const inputStartOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.CHART_DATE);
    const inputEndOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.CHART_DATE);
    const inputInterStartMediateDate = moment(selectedMinDate).format(dateFormat.CHART_DATE);
    const inputInterMediateEndDate = moment(selectedMaxDate).format(dateFormat.CHART_DATE);

    const cleanParams = {
        type: chartLabelSelector.CLEAN,
        params: ''
    };
    const todayParams = {
        type: chartLabelSelector.TODAY,
        params: { start_date: today, end_date: today }
    };
    const currentWeekParams = {
        type: chartLabelSelector.THIS_WEEK,
        params: { start_date: today, end_date: nextWeek }
    };
    const lastWeekParams = {
        type: chartLabelSelector.LAST_WEEK,
        params: { start_date: lastWeek, end_date: today }
    };
    const currentMonthParams = {
        type: chartLabelSelector.THIS_MONTH,
        params: { start_date: startMonth, end_date: nextMonth }
    };
    const lastMonthParams = {
        type: chartLabelSelector.LAST_MONTH,
        params: { start_date: startOfLastMonth, end_date: endOfLastMonth }
    };
    const interMediateParams = {
        type: chartLabelSelector.CUSTOM,
        params: { start_date: interStartMediateDate, end_date: interMediateEndDate }
    };

    const [dateColor, setDateColor] = useState({
        clear:'',today:'', this_week:'', last_week:'', this_month:'', last_month:'', custom:""
    });

    const onClickCustomRange = () => {
        setApplyButton(true);
        setDateColor("custom")
    };

    const onSelectDate = (type) => {
        switch (type) {
            case chartLabelSelector.CLEAN:
                change('date_selector', '');
                onDateSelector(cleanParams);
                setDateColor('clear');
                setPopoverOpen(false)
                break;
            case chartLabelSelector.TODAY:
                change('date_selector', inputToady + '-' + inputToady);
                onDateSelector(todayParams);
                setDateColor("today");
                setPopoverOpen(false)
                break;
            case chartLabelSelector.THIS_WEEK:
                change('date_selector', inputToady + '-' + inputNextWeek);
                onDateSelector(currentWeekParams);
                setDateColor("this_week")
                setPopoverOpen(false)
                break;
            case chartLabelSelector.LAST_WEEK:
                change('date_selector', inputLastWeek + '-' + inputToady);
                onDateSelector(lastWeekParams);
                setDateColor("last_week")
                setPopoverOpen(false)
                break;
            case chartLabelSelector.THIS_MONTH:
                change('date_selector', inputStartMonth + '-' + inputNextMonth);
                onDateSelector(currentMonthParams);
                setDateColor("this_month")
                setPopoverOpen(false)
                break;
            case chartLabelSelector.LAST_MONTH:
                change('date_selector', inputStartOfLastMonth + '-' + inputEndOfLastMonth);
                onDateSelector(lastMonthParams);
                setDateColor("last_month")
                setPopoverOpen(false)
                break;
            case chartLabelSelector.CUSTOM:
                change('date_selector', inputInterStartMediateDate + '-' + inputInterMediateEndDate);
                onDateSelector(interMediateParams);
                setPopoverOpen(false)
                break;
            default:
                onDateSelector();
                break;
        }
    };

    const onSelectMinDate = (date) => {
        setSelectedMinDate(date);
    };

    const onSelectMaxDate = (date) => {
        setSelectedMaxDate(date);
    };

    return (
        <div>
            <div id="Popover1" >
                <Field name="date_selector" component={CustomInput} isCustom groupText="calendar-check-o" readOnly
                       placeholder="books-circulation.date.placeholder"
                         onFocus={dateColor === "custom" ? () => setPopoverOpen(true) : null}/>
            </div>

            <Popover trigger={!childPopoverOpen ? 'legacy' : ' '} placement="bottom" isOpen={popoverOpen}
                     target="Popover1" toggle={toggle}>
                <PopoverBody className="date-picker">
                    <ListGroup>
                        <ListGroupItem className={dateColor === "clear" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.CLEAN)}>
                            Clear
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "today" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.TODAY)}>
                            {getFormattedMessage('dashboard.chart.filter.today.label')}
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "this_week" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.THIS_WEEK)}>
                            {getFormattedMessage('dashboard.chart.filter.this-week.label')}
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "last_week" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.LAST_WEEK)}>
                            {getFormattedMessage('dashboard.chart.filter.last-week.label')}
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "this_month" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.THIS_MONTH)}>
                            {getFormattedMessage('dashboard.chart.filter.this-month.label')}
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "last_month" ? "bg-primary text-white" : null}
                            onClick={() => onSelectDate(chartLabelSelector.LAST_MONTH)}>
                            {getFormattedMessage('dashboard.chart.filter.last-month.label')}
                        </ListGroupItem>
                        <ListGroupItem className={dateColor === "custom" ? "bg-primary text-white" : null}>
                            <span id="Popover2" onClick={() => onClickCustomRange()}>
                                {getFormattedMessage('dashboard.chart.filter.custom.label')}
                            </span>
                            <Popover trigger="legacy" placement="left" className="date-picker__child-popover"
                                     isOpen={childPopoverOpen} target="Popover2" toggle={toggleChild}>
                                <PopoverBody className="mt-3">
                                    <Row>
                                        <Col md={6} xs={12}>
                                            <DatePicker
                                                selected={selectedMinDate}
                                                onChange={onSelectMinDate}
                                                shouldCloseOnSelect={false} startOpen={false}
                                                placeHolder="Click to select a date"/>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <DatePicker
                                                selected={selectedMaxDate}
                                                minDate={selectedMinDate}
                                                onChange={onSelectMaxDate}
                                                shouldCloseOnSelect={false} startOpen={false}
                                                placeHolder="Click to select a date"/>
                                        </Col>
                                    </Row>
                                </PopoverBody>
                            </Popover>
                        </ListGroupItem>
                        <div className="mt-3 text-start pl-4">
                            {
                                applyButton ?
                                    <Button color="primary" size="md" className="text-white" disabled={!childPopoverOpen}
                                            onClick={() => onSelectDate(chartLabelSelector.CUSTOM)}>
                                        {getFormattedMessage('global.input.apply-btn.label')}
                                    </Button> : null
                            }
                            <Button className={`${applyButton ? "ml-3" : null}`} color="secondary" size="md"
                                    onClick={() => setPopoverOpen(false)}>
                                {getFormattedMessage('global.input.cancel-btn.label')}
                            </Button>
                        </div>
                    </ListGroup>
                </PopoverBody>
            </Popover>
        </div>
    )
};

DateRangePicker.propTypes = {
    filterKey: PropTypes.object,
    options: PropTypes.array,
    filterKeyName: PropTypes.string,
    initialize: PropTypes.func,
    handleFilter: PropTypes.func,
    change: PropTypes.func,
};

export default reduxForm({ form: 'dateForm' })(DateRangePicker);
