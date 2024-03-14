/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */

import { Descriptions, InputNumber, Layout, Space, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { getResume, getTableData } from 'data'

import PaymentTable from 'containers/payment-table'

const { Content, Footer } = Layout

const defaultFine = {
    capital: 300000,
    type: 'mixed',
    durationYears: 35,
    durationMonths: 420,
    spread: 0.007,
    fixed: {
        years: 5,
        months: 60,
        interest: 0.028,
        spread: 0.007
    },
    variable: {
        years: 30,
        months: 360,
        interest: 0.03901,
        spread: 0.007
    }
}

const Simulator = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()
    const [capital, setCapital] = useState(300000)
    const [fine, setFine] = useState(defaultFine)
    const [data, setData] = useState([])
    const [resume, setResume] = useState([])
    const [spread, setSpread] = useState(0.0075)
    const [duration, setDuration] = useState(30)
    const [durationFixed, setDurationFixed] = useState(5)
    const [fixedRate, setFixedRate] = useState(0.028)
    const [variableRate, setVariableRate] = useState(0.04)

    useEffect(() => {
        setFine({
            capital,
            durationYears: duration,
            durationMonths: duration * 12,
            spread,
            fixed: {
                years: durationFixed,
                months: durationFixed * 12,
                interest: fixedRate,
                spread
            },
            variable: {
                years: duration - durationFixed,
                months: (duration - durationFixed) * 12,
                interest: variableRate,
                spread
            }
        })
    }, [spread, duration, durationFixed, fixedRate, variableRate, capital])

    useEffect(() => {
        setResume(getResume(fine))
        setData(getTableData(fine))
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
                    <Space>
                        <InputNumber
                            addonBefore={'Capital'}
                            defaultValue={capital}
                            min={10000}
                            formatter={value => `€ ${value}`}
                            parser={value => value.replace('€ ', '')}
                            onChange={setCapital}
                        />
                        <InputNumber
                            addonBefore={'Duração'}
                            defaultValue={30}
                            min={5}
                            max={40}
                            formatter={value => `${value} anos`}
                            parser={value => value.replace(' anos', '')}
                            onChange={setDuration}
                        />
                        <InputNumber
                            addonBefore={'Spread'}
                            defaultValue={0.75}
                            min={0}
                            max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={_ => setSpread(_ * 0.01)}
                        />
                    </Space>
                    <Space>
                        <InputNumber
                            addonBefore={'Duração Fixa'}
                            defaultValue={5}
                            min={0}
                            max={40}
                            formatter={value => `${value} anos`}
                            parser={value => value.replace(' anos', '')}
                            onChange={setDurationFixed}
                        />
                        <InputNumber
                            addonBefore={'Taxa'}
                            defaultValue={(fixedRate * 100).toFixed(2)}
                            min={0}
                            max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={_ => setFixedRate(_ * 0.01)}
                        />
                        <InputNumber
                            disabled
                            addonBefore={'Total'}
                            value={(fixedRate + spread) * 100}
                            min={0}
                            max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                        />
                    </Space>
                    <Space>
                        <InputNumber
                            disabled
                            addonBefore={'Duração Variavel'}
                            value={duration - durationFixed}
                            min={0}
                            max={40}
                            formatter={value => `${value} anos`}
                            parser={value => value.replace(' anos', '')}
                        />
                        <InputNumber
                            addonBefore={'Taxa'}
                            defaultValue={4}
                            min={0}
                            max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={_ => setVariableRate(_ * 0.01)}
                        />
                        <InputNumber
                            disabled
                            value={((variableRate + spread) * 100).toFixed(2)}
                            addonBefore={'Total'}
                            defaultValue={0.75}
                            min={0}
                            max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                        />
                    </Space>
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
export default Simulator

Simulator.propTypes = {}
