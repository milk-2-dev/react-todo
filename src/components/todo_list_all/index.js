import React, {Component} from 'react';
import { bindActionCreators } from 'redux';

import { PageHeader, Modal, Button, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import  MultiSelectReact  from 'multi-select-react';

import { connect } from 'react-redux';
import { createNewTodo, changeVote } from '../../store/actions.js'

import './index.scss';

import TodoListItem from './todo_list_item/index';

class TodoListAll extends Component{
    state = {
        show: false,
        multiSelect: []
    };

    componentDidMount(){
        this.stateFromApi('todoItems')
    }

    componentWillReceiveProps(nextProps){
        this.stateToApi('todoItems', nextProps.todoItemsForProps);
    }

    onClickVote = (e) => {

        let todoId = Number(e.currentTarget.attributes.datatodoid.nodeValue);
        let ourTodo = this.props.todoItemsForProps.filter(function(item) {
            return item.todoKey === todoId;
        });

        let userId = this.props.todoUserForProps.userKey;

        let userIsVoted = ourTodo[0].todoVotes.votedUsers.some(function(item) {
            return item === userId
        });

        if(userIsVoted){
            alert('You already voted')
            return
        }

        let newTodoVotes = {
            value: ourTodo[0].todoVotes.value + 1,
            votedUsers: [...ourTodo[0].todoVotes.votedUsers, userId]
        }

        this.props.changeVoteForProps(newTodoVotes, todoId);

    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this._inputTodoTitle.value !== '' & this._inputTodoDesc.value !== ''){

            let newTodoLabels = this.state.multiSelect.filter(function(item){
                    return (item.value === true)
                })

            var newItem = {
                todoTitle: this._inputTodoTitle.value,
                todoDesc: this._inputTodoDesc.value,
                todoAuthor: this.props.todoUserForProps.userName,
                todoLabels: newTodoLabels,
                todoVotes: {
                    value: 0,
                    votedUsers: []
                },
                todoDate: Date.now(),
                todoKey: Date.now(),
                filterActive: 'showAll'
            };

            this.props.createNewTodoForProps(newItem);

            this.toggleModal();
        }
        else{
            alert('fill the inputs name')
        }
    };

    stateFromApi = (paramName) =>{
        const apiParams = localStorage.getItem(paramName);

        if (apiParams) {
            JSON.parse(apiParams).map(item => this.props.createNewTodoForProps(item))
            return;
        }
    };

    stateToApi = (paramName, params) =>{
        localStorage.setItem(paramName, JSON.stringify(params));
    };

    toggleModal = () => this.setState({ show: !this.state.show });

    render(){
        const selectedOptionsStyles = {
            color: "#3c763d",
            backgroundColor: "#dff0d8"
        };
        const optionsListStyles = {
            backgroundColor: "#dff0d8",
            color: "#3c763d"
        };
        const {todoItemsForProps, todoTopicsForProps} = this.props;

        return(
            <section id="todo_list_all">
                <PageHeader>
                    Today
                </PageHeader>

                <div className="add_new_todo">
                    <button onClick={this.toggleModal}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>

                <TodoListItem enteries={todoItemsForProps} onVote={this.onClickVote}/>

                <Modal show={this.state.show} animation={true} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        Create new todo
                    </Modal.Header>
                    <Modal.Body>
                        <div className="create_new_wallet">
                            <form id="new_wallet_form" onSubmit={this.onSubmit}>
                                <FormGroup controlId="wallet_name" bsSize="large">
                                    <ControlLabel>Todo title</ControlLabel>
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        inputRef={(node) => { this._inputTodoTitle = node }}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formControlsTextarea">
                                    <ControlLabel>Todo description</ControlLabel>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="textarea"
                                        inputRef={(node) => { this._inputTodoDesc = node }}/>
                                </FormGroup>

                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Select label</ControlLabel>
                                    <MultiSelectReact
                                        options={this.props.todoTopicsForProps}
                                        optionClicked={this.optionClicked.bind(this)}
                                        selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                                        selectedOptionsStyles={selectedOptionsStyles}
                                        optionsListStyles={optionsListStyles}
                                        isTextWrap={true}/>
                                </FormGroup>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            block
                            bsSize="large"
                            type="submit"
                            form="new_wallet_form"
                        >
                            create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>

        )
    }

    optionClicked = (optionsList) => {
        this.setState({ multiSelect: optionsList });
    }
    selectedBadgeClicked = (optionsList) => {
        this.setState({ multiSelect: optionsList });
    }
}

const putStateToProps = (state) => {
    return {
        todoItemsForProps: state.todoItems,
        todoUserForProps: state.user,
        todoTopicsForProps: state.todoTopics
    }
}

const putActionsToProps = (dispatch) => {
    return {
        createNewTodoForProps: bindActionCreators(createNewTodo, dispatch),
        changeVoteForProps: bindActionCreators(changeVote, dispatch)
    }
}

export default  connect(putStateToProps, putActionsToProps)(TodoListAll);