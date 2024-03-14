/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */

import { Descriptions, Layout, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { getResume, getTableData } from 'data'

import PaymentTable from 'containers/payment-table'
import { getFineByIdentifier } from 'state/axios'

const { Content, Footer, Sider } = Layout

const fcbcpIdentifier = 'francisco_carla_mbcp_original'

const bonus24MBCP = true

const Resume = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()
    const [fine, setFine] = useState({})
    const [data, setData] = useState([])
    const [resume, setResume] = useState([])

    useEffect(() => {
        getFineByIdentifier(fcbcpIdentifier, setFine)
    }, [])

    useEffect(() => {
        setResume(getResume(fine))
        setData(getTableData(fine, bonus24MBCP))
    }, [fine])
    return (
        <Layout>
            <Content
                style={{
                    margin: '16px 16px'
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 200,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Descriptions bordered title="Resumo" size={'small'} items={resume} />
                </div>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <PaymentTable data={data} />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center'
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
}
export default Resume

Resume.propTypes = {}
