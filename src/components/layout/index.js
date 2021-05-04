import React from "react";
import PropTypes from "prop-types";

import { Link, Switch } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

const KalendlyLayout = (props) => {
    const renderNavLinks = () => {
        const links = props.fnNavLinks();
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

    const renderContents = () => {
        const links = props.fnNavLinks();
        return <Switch>{links.router()}</Switch>;
    };

    {
        return (
            <Layout>
                <Header>{renderNavLinks()}</Header>
                <Content className={"py-10 px-14"}>{renderContents()}</Content>
            </Layout>
        );
    }
};

KalendlyLayout.propTypes = {
    fnNavLinks: PropTypes.func,
};

export default KalendlyLayout;
