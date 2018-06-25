import React, {Component} from 'react';
import { Media} from "react-bootstrap";


import './wallets_all.scss';

export default class WalletsAll extends Component{

    createWalletItem(item){
        return(
            <div className="wallet_item" key={item.key}>
                <Media >
                    <Media.Left>
                        <img width={64} height={64} src="./images/avatar-default.png" alt="thumbnail" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{item.walletName}</Media.Heading>
                        <p>
                            $ {item.walletMoney}
                        </p>
                    </Media.Body>
                </Media>
            </div>
        );
    }

    render(){
        let walletEnteries = this.props.enteries;
        let walletItem = walletEnteries.map(this.createWalletItem);

        return(
            <div className="wallets">
                {walletItem}
            </div>
        )
    }
}