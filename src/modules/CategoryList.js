import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CategoryList extends React.Component {
    render() {
        let i = 0
        let rows = this.props.categories.map(category => (
                <TableRow key={i++}>
                    <TableCell align='center'>
                        {category.id}
                    </TableCell>
                    <TableCell align='center'>
                        {category.quantity}
                    </TableCell>
                    <TableCell align='center'>
                        {category.available}
                    </TableCell>
                </TableRow>
            )
        )
        const classes = makeStyles({
            table: {
              minWidth: 650
            },
        })
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Quantity</TableCell>
                            <TableCell align='center'>Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
            

        )
    }
}

export default CategoryList
