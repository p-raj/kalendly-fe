import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Link, Switch } from "react-router-dom";

import { Layout, Menu } from "antd";
import Login from "modules/auth";
const { Header, Content } = Layout;

const KalendlyLayout = (props) => {
    const ctxAuth = useContext(props.contextAuth);

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

    const renderBody = () => {
        if (ctxAuth.user) {
            return (
                <>
                    <Header>{renderNavLinks()}</Header>
                    <Content id={"content"}>{renderContents()}</Content>
                </>
            );
        } else {
            return (
                <Content id={"content"}>
                    <Login />
                </Content>
            );
        }
    };

    {
        return <Layout id={"layout"}>{renderBody()}</Layout>;
    }
};

KalendlyLayout.propTypes = {
    fnNavLinks: PropTypes.func,
    contextAuth: PropTypes.object,
};

export default KalendlyLayout;
