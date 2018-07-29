import React, {Component} from 'react';
import { Panel, Row, Col} from "react-bootstrap";

import './index.scss';

export default class TodoListItem extends Component{
    createTodoItem = (item) => {
        debugger
        let todoLabelItem = item.todoLabels.map(this.todoLabels);
        let todoShowByFilter = item.filterActive;//false
        let todoFilterClassName = (todoShowByFilter === false) ? 'hide_by_filter' : '';

        return(
            <div className={`todo_item ${todoFilterClassName}`} key={item.todoKey}>
                <Panel>
                    <Row>
                        <Col xs={1}>
                            <div className="todo_item_vote" onClick={this.props.onVote} datatodoid={item.todoKey}>
                                <span className="glyphicon glyphicon-triangle-top"></span>
                                <span className="vote_value">{item.todoVotes.value}</span>
                            </div>
                        </Col>

                        <Col xs={11}>
                            <Panel.Heading>{item.todoTitle}</Panel.Heading>
                            <Panel.Body>{item.todoDesc}</Panel.Body>
                            <Panel.Body>
                                <span className="todo_date">
                                    {this.todoCreatedTime(item.todoDate)} ago
                                </span>
                                <span className="todo_author"> by {item.todoAuthor}</span>
                                <span className="todo_labels">
                                    {todoLabelItem}
                                </span>
                            </Panel.Body>
                        </Col>
                    </Row>
                </Panel>
            </div>
        );
    };

    todoCreatedTime = (todoCreatAt) => {
        let todayDate = Date.now();

        var todaySeconds = (todayDate / 1000).toFixed(0);
        var todayMinutes = Math.floor(todaySeconds / 60);
        var todayHours = Math.floor(todayMinutes / 60);
        var todayDays = Math.floor(todayHours / 60);

        var createdSeconds = (todoCreatAt / 1000).toFixed(0);
        var createdMinutes = Math.floor(createdSeconds / 60);
        var createdHours = Math.floor(createdMinutes / 60);
        var createdDays = Math.floor(createdHours / 60);

        var differenceSeconds = todaySeconds - createdSeconds;
        var differenceMinutes = todayMinutes - createdMinutes;
        var differenceHours =  todayHours - createdHours;
        var differenceDays = todayDays - createdDays;

        if (differenceSeconds < 60) {
            return differenceSeconds + " seconds";
        } else if (differenceMinutes < 60) {
            return differenceMinutes + " minuts";
        } else if (differenceHours < 24) {
            return differenceHours + " hours";
        } else {
            return differenceDays + " days"
        }
    };

    todoLabels = (item) => {
        return(
            <span key={item.id} className="label_item">{item.label}</span>
        )
    }

    render(){
        // debugger
        let todoEnteries = this.props.enteries;
        let todoItem = todoEnteries.map(this.createTodoItem);

        return(
            <div className="todo_list">
                {todoItem}
            </div>
        )
    }
}