import React, {
    Component,
    View,
    ScrollView,
    Text
} from 'react-native';

import routes from '../routes';
import styles from './styles';
import ToolBar from './common/ToolBar';
import AppBody from './common/AppBody';
import Heading1 from './common/Heading1';
import PrimaryButton from './common/PrimaryButton';
import NumericInput from './common/NumericInput';
import DateTimeInput from './common/DateTimeInput';

const subSectionStyle = {
    paddingBottom: 20,
    paddingTop: 20
};

var nextVisit = {
    visit: {date:null, time:null},
    bloodSample: {date:null, time:null},
    bookAppointment: {date:null, time:null}
};

export default class ScheduleVisit extends Component {

    setNextVisitDate(date) {
        nextVisit.visit.date = date;

        var bloodSampleDay = new Date(
            this.refs.nextBloodSampleDate.state.value
        );
        bloodSampleDay.setDate(date.getDate() - 1);
        this.refs.nextBloodSampleDate.setState({
            value: bloodSampleDay
        });

        var bookAppointmentDay = new Date(
            this.refs.bookAppointmentDate.state.value
        );
        bookAppointmentDay.setDate(date.getDate() - 14);
        this.refs.bookAppointmentDate.setState({
            value: bookAppointmentDay
        });
    }
    setNextVisitTime(time) {
        nextVisit.visit.time = time;
    }
    setNextBloodSampleDate(date) {
        nextVisit.bloodSample.date = date;
    }
    setNextBloodSampleTime(time) {
        nextVisit.bloodSample.time = time;
    }
    setNextBookAppointmentDate(date) {
        nextVisit.bookAppointment.date = date;
    }
    setNextBookAppointmentTime(time) {
        nextVisit.bookAppointment.time = time;
    }

    goToScheduleVisit() {
        this.props.goToScheduleVisitSuccess(nextVisit);
        this.props.navigator.push(routes.scheduleVisitSuccess);
    }

    render() {
        const conditionId = this.props.store.selected_condition;
        const selectedCondition = this.props.store.conditions.entities[conditionId];

        return (
            <ScrollView>
                <ToolBar title={selectedCondition ? selectedCondition.title : null} />
                <AppBody>
                    <Heading1>
                        When is your next visit?
                    </Heading1>
                    <View style={{paddingBottom: 20}}>
                        <DateTimeInput
                            ref="nextVisitDate"
                            time="16"
                            onSelect={this.setNextVisitDate.bind(this)} />
                    </View>
                    <View style={subSectionStyle}>
                        <Heading1>Blood Sample Collection</Heading1>
                        <DateTimeInput
                            ref="nextBloodSampleDate"
                            time="15:30"
                            onSelect={this.setNextBloodSampleDate.bind(this)} />
                    </View>
                    <View style={subSectionStyle}>
                        <Heading1>Book Appointment</Heading1>
                        <DateTimeInput
                            ref="bookAppointmentDate"
                            time="11"
                            onSelect={this.setNextBookAppointmentDate.bind(this)} />
                    </View>
                    <View style={{marginTop:20}}>
                        <PrimaryButton
                            title="SCHEDULE VISIT"
                            onPress={this.goToScheduleVisit.bind(this)}/>
                    </View>
                </AppBody>
            </ScrollView>
        );
    }
}

ScheduleVisit.propTypes = {
    navigator: React.PropTypes.object.isRequired
};
