import React, { Component } from "react";
import PropTypes from "prop-types";

import { BrowserRouter, Link, Switch } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

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

    renderContents = () => {
        const links = this.props.fnNavLinks();
        return <Switch>{links.router()}</Switch>;
    };

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header>{this.renderNavLinks()}</Header>
                    <Content className={"py-10 px-14"}>
                        {this.renderContents()}
                    </Content>
                    <Footer></Footer>
                </Layout>
            </BrowserRouter>
        );
    }
}

KalendlyLayout.propTypes = {
    fnNavLinks: PropTypes.func,
};

export default KalendlyLayout;
