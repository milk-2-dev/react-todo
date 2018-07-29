import React, {Component} from 'react';

import { Grid, Row, Col} from "react-bootstrap";

import './index.scss'

import Header from '../../components/header/index.js';
import Sidebar from '../../components/side_bar/index.js';
import TodoListAll from '../../components/todo_list_all/index.jsx';


class App extends Component {
    render(){
        return(
            <div className="main_wrapper">
                <Header/>

                <main>
                    <div className="container-fluid">
                        <Grid>
                            <Row>
                                <Col xs={12} md={3}>
                                    <Sidebar/>
                                </Col>
                                <Col xs={6} md={9}>
                                    <TodoListAll/>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </main>
            </div>
        )
    }
}

export default App;