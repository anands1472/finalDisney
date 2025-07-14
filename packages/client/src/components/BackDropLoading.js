import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Loading from './Loading'

function BackDropLoading({ size, thickness }) {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
      onClick={handleClose}
    >
      <Loading size={size || 150} thickness={thickness || 5} />
    </Backdrop>
  )
}

export default BackDropLoading
