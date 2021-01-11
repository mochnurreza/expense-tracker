import React, {useState, useEffect, useContext} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import InfoCard from '../InfoCard'
import Form from './form/Form'
import List from './list/List'
import useStyles from './Styles';
import { useSpeechContext } from '@speechly/react-client';
import { ExpenseTrackerContext } from '../../context/Context';

const ExpenseTracker = () => {
    const classes = useStyles()
    const {balance} = useContext(ExpenseTrackerContext)
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader title="Expense Tracker" subheader="Powered by Speechly"/>
                <CardContent >
                    <Typography variant="h5" align="center">Total Balance ${balance}</Typography>
                    <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                        <InfoCard/>
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Form/>
                </CardContent>
                <CardContent className={classes.cartContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default ExpenseTracker
