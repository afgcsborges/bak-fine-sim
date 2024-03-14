/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable sort-keys */

import { isEmpty } from 'lodash'

export const getResume = fine =>
    isEmpty(fine)
        ? []
        : [
              {
                  key: '1',
                  label: 'Capital',
                  children: fine.capital
              },
              {
                  key: '2',
                  label: 'Duração',
                  children: `${fine.fixed.years + fine.variable.years} anos / ${
                      fine.fixed.months + fine.variable.months
                  } meses`
              },
              {
                  key: '3',
                  label: 'Spread',
                  children: `${(fine.spread * 100).toFixed(3)}%`
              },
              {
                  key: '4',
                  label: 'Taxa Fixa',
                  children: `${fine.fixed.years} anos / ${fine.fixed.months} meses`
              },
              {
                  key: '5',
                  label: 'Taxa',
                  children: `${(fine.fixed.interest * 100).toFixed(3)}%`
              },
              {
                  key: '6',
                  label: 'Total',
                  children: `${(fine.fixed.interest * 100 + fine.fixed.spread * 100).toFixed(3)}%`
              },
              {
                  key: '4',
                  label: 'Taxa Variavel',
                  children: `${fine.variable.years} anos / ${fine.variable.months} meses`
              },
              {
                  key: '5',
                  label: 'Euribor (6M)',
                  children: `${(fine.variable.interest * 100).toFixed(3)}%`
              },
              {
                  key: '6',
                  label: 'Total',
                  children: `${(fine.variable.interest * 100 + fine.variable.spread * 100).toFixed(3)}%`
              }
          ]

const calculateMothlyPayment = (principal, rate, periods) => {
    const monthlyRate = rate / 12
    const denominator = (1 + monthlyRate) ** periods - 1
    return (principal * monthlyRate * (1 + monthlyRate) ** periods) / denominator
}

const sum = (a, b) => Number(a) + Number(b)

export const getTableData = (fine, bonus24MBCP, capitalAmortizations = [{ month: 25, amortization: 150000 }]) => {
    const data = []
    console.log(fine)
    if (isEmpty(fine)) return data

    // eslint-disable-next-line no-unused-vars, prefer-const
    let { capital, durationYears, durationMonths, fixed, variable } = fine

    for (let i = 1; i <= durationMonths; ++i) {
        const { amortization } = capitalAmortizations.find(a => a.month === i) || { amortization: 0 }
        capital -= amortization

        const installment =
            i > fixed.months
                ? calculateMothlyPayment(capital, variable.interest + variable.spread, durationMonths - i + 1)
                : calculateMothlyPayment(capital, fixed.interest + fixed.spread, durationMonths - i + 1)
        const interest =
            i > fixed.months
                ? (capital * (variable.interest + variable.spread)) / 12
                : (capital * (fixed.interest + fixed.spread)) / 12
        const bonusInterest = i <= 24 && fixed.months >= 24 && bonus24MBCP ? (capital * fixed.interest) / 12 : null
        const bonusInstallment =
            i <= 24 && fixed.months >= 24 && bonus24MBCP ? installment - (interest - bonusInterest) : null
        data.push({
            key: i.toString(),
            month: i.toString(),
            amortization: (installment - interest).toFixed(2),
            interest: bonusInterest ? bonusInterest.toFixed(2) : interest.toFixed(2),
            installment: bonusInstallment ? bonusInstallment.toFixed(2) : installment.toFixed(2),
            debt: (capital - (installment - interest)).toFixed(2)
        })
        capital -= installment - interest
    }

    const finalData = []

    for (let i = 1; i <= durationYears; ++i) {
        let installment = 0
        let interest = 0
        let amortization = 0
        const capitalSum = data[i * 12 - 1].debt

        const rows = []

        for (let j = 0; j < 12; ++j) {
            interest = sum(data[j + (i - 1) * 12].interest, interest)
            amortization = sum(data[j + (i - 1) * 12].amortization, amortization)
            installment = sum(data[j + (i - 1) * 12].installment, installment)
            rows.push(data[j + (i - 1) * 12])
        }

        finalData.push({
            key: `${i.toString()}Y`,
            year: i,
            amortization: Math.round(amortization * 100) / 100,
            interest: Math.round(interest * 100) / 100,
            installment: Math.round(installment * 100) / 100,
            debt: capitalSum,
            rows
        })
    }

    return finalData
}
