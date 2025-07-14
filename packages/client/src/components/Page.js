import React, { forwardRef } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import './style.css'
const useStyles = styled((theme) => ({
  root: {
    height: '100%',
    overflowY: 'auto',
    padding: '4rem 2rem 0 2rem',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::-webkit-scrollbar': {
      width: 9
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[600],
      borderRadius: 7
    }
  }
}))

const Page = forwardRef(({ title, children, ...rest }, ref) => {
  const classes = useStyles()
  return (
    <Grid container direction="column" className={classes.root}>
      <div className={classes.main} ref={ref} {...rest}>
        <div className="bgImage">
          <Helmet>
            <title>{title}</title>
          </Helmet>
          {children}
        </div>
      </div>
    </Grid>
  )
})

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default Page
