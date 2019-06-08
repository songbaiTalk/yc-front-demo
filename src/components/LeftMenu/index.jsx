/**
 * @file 左侧导航栏
 * @author zhangluyao01
*/
import React from 'react';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export class LeftMenu extends React.Component {
    render() {
        return (
            <Menu
                onClick={e => {
                    this.props.handleClick
                    && this.props.handleClick(e);

                }}
                style={{width: 256, height: '100%', float: 'left'}}
                defaultSelectedKeys={this.props.defaultSelectedKeys}
                defaultOpenKeys={this.props.defaultOpenKeys}
                mode="inline"
            >
                {
                    this.props.options
                    && this.props.options.map(firstItem => {
                        if (firstItem.children) {
                            return (
                                <SubMenu
                                    key={firstItem.key}
                                    title={
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '100%'
                                            }}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.props.handleClick({
                                                    key: firstItem.key,
                                                    keyPath: [firstItem.key],
                                                    domEvent: e
                                                });
                                            }}
                                        >
                                            {firstItem.title}
                                        </span>
                                    }
                                >
                                    {
                                        firstItem.children.map(secondItem => (
                                            <Item key={secondItem.key}>
                                                {secondItem.title}
                                            </Item>
                                        ))
                                    }
                                </SubMenu>
                            );
                        }
                        return (
                            <Item key={firstItem.key}>
                                {firstItem.title}
                            </Item>
                        );
                    })
                }
            </Menu>
        );
    }
}
