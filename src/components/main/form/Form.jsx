import React, {useState, useContext, useEffect} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@material-ui/core';
import useStyles from './Styles'
import {ExpenseTrackerContext} from '../../../context/Context'
import {v4 as uuidv4} from 'uuid'
import {incomeCategories, expenseCategories} from '../../../constants/Categories'
import formatDate from '../../../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}

const NewTransactionForm = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const {addTransaction} = useContext(ExpenseTrackerContext)
    const {segment} = useSpeechContext()
    const [open, setOpen] = useState(false)

    const createTransaction = () => {
            if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return

            if(incomeCategories.map((iC) => iC.type).includes(formData.category)) {
                setFormData({...formData, type: 'Income'})
            } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
                setFormData({...formData, type:'Expense'})
            }

            setOpen(true)
            addTransaction({...formData, amount: Number(formData.amount), id: uuidv4()})
            setFormData(initialState)
    }

    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense') {
                setFormData({...formData, type: 'Expense'})
            } else if (segment.intent.intent === 'add_income') {
                setFormData({...formData, type: 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction()
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState)
            }

            segment.entities.forEach((s) => { 
                const category = `${s.value.charAt(0)} ${s.value.slice(1).toLowerCase()}`

                switch(s.type) {
                    case 'amount':
                    setFormData({...formData, amount: s.value})
                    break

                    case 'category':
                        if(incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({...formData,type: 'Income', category})
                        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({...formData, type:'Expense', category})
                        }
                        break

                    case 'date':
                            setFormData({...formData,date: s.value })
                            break
                            default:
                            break
                }
            })
        }
        if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
            createTransaction();
        }
    }, [segment])
    
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories
    return (
        <Grid container spacing={2}>
            <Snackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                   {segment ? (
                       <div className="segment">
                           {segment.words.map((w) => w.value).join("")}
                       </div>
                   ) : null}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <MenuItem value="business">business</MenuItem>
                        <MenuItem value="salary">salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default NewTransactionForm
