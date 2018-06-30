import React, {Component} from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { createNewTopic, changeLabelFilterStatus, changeTodoFilterStatus, saveFilters} from '../../store/actions.js'

import { PageHeader, Modal, Button, FormGroup, ControlLabel, FormControl, Radio} from "react-bootstrap";

import './index.scss'

class Sidebar extends Component {

    state = {
        show: false,
        labelIcon: '',
        filteredBy:[]
    };

    componentDidMount(){
        this.stateFromApi('todoTopics', this.props.createNewTopicForProps);
        this.stateFromApi('filteredBy', this.props.saveFiltersForProps);
    }

    componentWillReceiveProps(nextProps){
        this.stateToApi('todoTopics', nextProps.todoTopicsForProps);
        this.stateToApi('filteredBy', nextProps.filteredByForProps);
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this._inputTopicTitle.value !== ''){
            let labelIcon = this.state.labelIcon;

            let newItem = {
                id: Date.now(),
                label: this._inputTopicTitle.value,
                labelIcon: labelIcon,
                value: false,
                filteredByLabel:false
            };

            this.props.createNewTopicForProps(newItem);

            this.toggleModal();
        }
        else{
            alert('fill the inputs title')
        }
    };

    stateFromApi = (paramName, action) =>{
        const apiParams = localStorage.getItem(paramName);

        if (apiParams) {
            JSON.parse(apiParams).map(item => action(item))
            return;
        }
    };

    stateToApi = (paramName, params) =>{
        localStorage.setItem(paramName, JSON.stringify(params));
    };

    onChangeRadio = (e) =>{
        let value = e.currentTarget.value;

        this.setState({labelIcon: value});
    }

    onClickLabel = (e) => {
        let labelLink = e.currentTarget;
        let labelLinkClass = labelLink.className;
        let labelLinkName = labelLink.innerText;

        (labelLinkClass === 'active_filter') ? labelLink.className = '' : labelLink.className = 'active_filter';

        let labelItem = this.props.todoTopicsForProps.filter(function(item) {
            return item.label === labelLinkName
        });

        let labelItemId = labelItem[0].id;

        this.changeLabelFilterStatus(labelItemId);

        this.filterTodoByLabel(labelItemId);

    };

    changeLabelFilterStatus = (labelItemId) =>{

        this.props.changeLabelFilterStatusForProps(labelItemId);

    }

    filterTodoByLabel = (labelItemId) =>{
        let isCoincidence = this.props.filteredByForProps.some((item) => item === labelItemId);
        let newTopicsParam = []

        if(isCoincidence){
          newTopicsParam = this.props.filteredByForProps.filter(function(item){
            return item !== labelItemId
          })
        } else{
          newTopicsParam = [...this.props.filteredByForProps, labelItemId]
        }

        this.props.saveFiltersForProps(newTopicsParam)
        this.props.changeTodoFilterStatusForProps(newTopicsParam)

        newTopicsParam = []

    }

    toggleModal = () => this.setState({ show: !this.state.show });

    showTopicLabels = (item) =>{
        var filterByLabelStatus = item.filteredByLabel;
        return(
            <li key={item.id} onClick={this.onClickLabel} className={(filterByLabelStatus) ? 'active_filter' : null}>
                <span className={`glyphicon ${item.labelIcon}`}></span>
                <span className="nav-label">{item.label}</span>
            </li>
        )
    }

    render(){
        let topicLabels = this.props.todoTopicsForProps.map(this.showTopicLabels);

        return(
            <aside id="left_sidebar">
                <PageHeader>
                    Topics
                </PageHeader>

                <nav className="navbar-primary">
                    <button onClick={this.toggleModal} className="btn-expand-collapse">add new topic</button>
                    <ul className="navbar-primary-menu">
                        {topicLabels}
                    </ul>
                </nav>

                <Modal show={this.state.show} animation={true} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        Create new topic
                    </Modal.Header>
                    <Modal.Body>
                        <div className="create_new_topic">
                            <form id="new_topic_form" onSubmit={this.onSubmit}>
                                <FormGroup controlId="topic_name" bsSize="large">
                                    <ControlLabel>Todo title</ControlLabel>
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        inputRef={(node) => { this._inputTopicTitle = node }}
                                    />
                                </FormGroup>

                                <FormGroup >
                                    <ControlLabel>Choose an icon for label</ControlLabel><br/>
                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-signal"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-signal"></span>
                                    </Radio>
                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-headphones"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-headphones"></span>
                                    </Radio>
                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-info-sign"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-info-sign"></span>
                                    </Radio>

                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-wrench"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-wrench"></span>
                                    </Radio>

                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-apple"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-apple"></span>
                                    </Radio>

                                    <Radio name="radioGroup"
                                           inline
                                           value="glyphicon-fire"
                                           onChange={this.onChangeRadio}>
                                        <span className="glyphicon glyphicon-fire"></span>
                                    </Radio>
                                </FormGroup>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            block
                            bsSize="large"
                            type="submit"
                            form="new_topic_form"
                        >
                            create topic
                        </Button>
                    </Modal.Footer>
                </Modal>
            </aside>
        )
    }
}

const putStateToProps = (state) => {
    return {
        todoTopicsForProps: state.todoTopics,
        filteredByForProps: state.filteredBy
    }
}

const putActionsToProps = (dispatch) => {
    return {
        createNewTopicForProps: bindActionCreators(createNewTopic, dispatch),
        changeLabelFilterStatusForProps: bindActionCreators(changeLabelFilterStatus, dispatch),
        changeTodoFilterStatusForProps: bindActionCreators(changeTodoFilterStatus, dispatch),
        saveFiltersForProps: bindActionCreators(saveFilters, dispatch)
    }
}

export default  connect(putStateToProps, putActionsToProps)(Sidebar);