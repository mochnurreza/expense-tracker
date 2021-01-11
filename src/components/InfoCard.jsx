import React from 'react'


const isIncome = Math.round(Math.random())
const InfoCard = () => {
    return (
        <div elevation={3} style={{textAlign:'center', padding: '0 10%'}}>
            Try saying: <br/>
            Add {isIncome ? 'Income' : 'Expense'}
            for {isIncome ? 'Rp 10.000.000' : 'Rp 500.000'}
            in Category {isIncome ? 'salary' : 'travel'}
            for {isIncome ? 'monday' : 'friday'}
        </div>
    )
}

export default InfoCard
