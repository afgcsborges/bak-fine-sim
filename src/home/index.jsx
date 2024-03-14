/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { useState } from 'react'

import Resume from 'pages/resume'
import Simulator from 'pages/simulator'

const { Sider } = Layout

const Home = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Router>
            <Layout
                style={{
                    minHeight: '100vh'
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/">Resumo</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to="/sim">Simulador</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Routes>
                    <Route path="/" element={<Resume />} />
                    <Route path="/sim" element={<Simulator />} />
                </Routes>
            </Layout>
        </Router>
    )
}
export default Home

Home.propTypes = {}
