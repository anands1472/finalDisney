import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const useStyles = styled((theme) => ({
  paperContainer: {
    borderTop: `5px solid ${theme.palette.primary[700]}`,
    padding: (props) => (props.padding ? props.padding : '40px 65px 0px'),
    minHeight: (props) => (props.minHeight ? props.minHeight : '40vh'),
    marginTop: '5rem'
  }
}))

const PaperContainer = (props) => {
  const classes = useStyles(props)
  const { children } = props
  return (
    <Paper elevation={1} className={classes.paperContainer}>
      {children}
    </Paper>
  )
}

PaperContainer.propTypes = {
  children: PropTypes.node
}

export default PaperContainer
