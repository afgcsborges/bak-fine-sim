/* eslint-disable sort-keys */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */

import PropTypes from 'prop-types'
import React from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: 'Ano',
        dataIndex: 'year',
        key: 'year'
    },
    {
        title: 'Amortização',
        dataIndex: 'amortization',
        key: 'amortization'
    },
    {
        title: 'Juros',
        dataIndex: 'interest',
        key: 'interest'
    },
    {
        title: 'Prestação',
        dataIndex: 'installment',
        key: 'installment'
    },
    {
        title: 'Capital em dívida (após prestação)',
        dataIndex: 'debt',
        key: 'debt'
    }
]

const expandedRowRender = row => {
    const innerColumns = [
        {
            title: 'Mês',
            dataIndex: 'month',
            key: 'month'
        },
        {
            title: 'Amortização',
            dataIndex: 'amortization',
            key: 'amortization'
        },
        {
            title: 'Juros',
            dataIndex: 'interest',
            key: 'interest'
        },
        {
            title: 'Prestação',
            dataIndex: 'installment',
            key: 'installment'
        },
        {
            title: 'Capital em dívida (após prestação)',
            dataIndex: 'debt',
            key: 'debt'
        }
    ]

    return <Table columns={innerColumns} dataSource={row.rows} pagination={false} />
}

const PaymentTable = ({ data }) => (
    <Table
        columns={columns}
        expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ['0']
        }}
        pagination={false}
        dataSource={data}
        size="small"
    />
)

PaymentTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}

export default PaymentTable
