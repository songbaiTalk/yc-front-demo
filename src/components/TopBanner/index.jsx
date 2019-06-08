/**
 * @file 页面顶部Banner
 * @author zhangluyao01
 */
import React from 'react';

import './index.css';

export class TopBanner extends React.Component {
    render() {
        return (
            <div className="top-banner">
                <div className="logo">学长帮</div>
                <div className="logout">
                    <span>
                        {this.props.userName}
                    </span>
                    <span
                        className="logout-btn"
                        onClick={() => {
                            this.props.handleLogout
                            && this.props.handleLogout();
                        }}
                    >退出</span>
                </div>
            </div>
        );
    }
}
