import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link, Switch } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

class KalendlyLayout extends Component {
    renderNavLinks = () => {
        const links = this.props.fnNavLinks();
        return (
            <Menu
                theme={"dark"}
                mode="horizontal"
                defaultSelectedKeys={["Home"]}>
                {links.links.map((link) => (
                    <Menu.Item key={link.title}>
                        <Link to={link.link}> {link.title} </Link>
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    renderContents = (routerProps) => {
        const links = this.props.fnNavLinks();
        return <Switch>{links.router(routerProps)}</Switch>;
    };

    render() {
        return (
            <Layout>
                <Header>{this.renderNavLinks()}</Header>
                <Content className={"py-10 px-14"}>
                    {this.renderContents()}
                </Content>
            </Layout>
        );
    }
}

KalendlyLayout.propTypes = {
    fnNavLinks: PropTypes.func,
    routerProps: PropTypes.object,
};

export default KalendlyLayout;
