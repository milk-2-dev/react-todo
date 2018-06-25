import React, {Component} from 'react';

import { Grid, Row, Col, Modal, Button, FormGroup, ControlLabel, FormControl, Radio} from "react-bootstrap";

import Preloader from './../preloader/index';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createNewTodo } from '../../store/actions.js'

import './index.scss';

class WalletItem extends Component{
    state = {
        show: false,
        loading: true,
        noWalletId: false,
        thisWallet: {}
    };

    componentDidMount(){
        const cachedWallets = localStorage.getItem('wallets');

        JSON.parse(cachedWallets).map(item => this.props.createNewTodoForProps(item))
    }

    toggleModal = () => this.setState({ show: !this.state.show })

    componentWillReceiveProps(nextProps){
        const walletId = parseInt(this.props.match.params.number);
        const walletObj = nextProps.walletsItemsForProps.find(x => x.key === walletId);

        if(walletObj == null){

            this.setState({loading: false});
            this.setState({noWalletId: true});
            return
        }

        this.setState({loading: false});
        this.setState({thisWallet: walletObj});
    }

    render(){
        if (this.state.loading) {
            return (
                <div>
                    <Preloader/>
                </div>
            )
        }

        else if(this.state.noWalletId){
            return (
                <div>
                    Sorry, but we can't find wallet id that you resive
                </div>
            )
        }

        return(
            <div className="wallet_container">
                <div className="wallet_header">
                    <h1 className="wallet_name">
                        {this.state.thisWallet.walletName}
                    </h1>
                </div>
                <div className="wallet_body">
                    <Grid>
                        <div className="add_new_transaction_button">
                            <Row>
                                <Col xs={12} md={4}>
                                    <button className="button button_primary" onClick={this.toggleModal}>Add new transaction</button>
                                </Col>
                            </Row>
                        </div>

                        <div className="balance_info">
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="balance_info_item">
                                        <p className="balance_info_item_title">Current Wallet Balance</p>
                                        <p className="balance_info_item_value value_color_green">$ {this.state.thisWallet.walletMoney}</p>
                                    </div>
                                </Col>

                                <Col xs={12} md={3}>
                                    <div className="balance_info_item">
                                        <p className="balance_info_item_title">Total Period Change</p>
                                        <p className="balance_info_item_value value_color_red">$ {this.state.thisWallet.walletMoney}</p>
                                    </div>
                                </Col>

                                <Col xs={12} md={3}>
                                    <div className="balance_info_item">
                                        <p className="balance_info_item_title">Total Period Expenses</p>
                                        <p className="balance_info_item_value value_color_red">$ {this.state.thisWallet.walletMoney}</p>
                                    </div>
                                </Col>

                                <Col xs={12} md={3}>
                                    <div className="balance_info_item">
                                        <p className="balance_info_item_title">Total Period Income</p>
                                        <p className="balance_info_item_value value_color_green">$ {this.state.thisWallet.walletMoney}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Grid>
                </div>
            </div>
        )
    }
}
const putStateToProps = (state) => {
    return {
        walletsItemsForProps: state.walletItems
    }
}

const putActionsToProps = (dispatch) => {
    return {
        createNewTodoForProps: bindActionCreators(createNewTodo, dispatch),
    }
}

export default  connect(putStateToProps, putActionsToProps)(WalletItem);