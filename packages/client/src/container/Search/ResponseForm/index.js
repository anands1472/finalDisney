import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { getApiGetResponse } from '../../../features/stageSlice'
import { useSelector, useDispatch } from 'react-redux'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

export default function ResponseForm() {
  const apiGetResponse = useSelector(getApiGetResponse)

  console.log('response', JSON.stringify(apiGetResponse, null, 2))
  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      spacing={2}
      style={{ paddingTop: '5rem' }}
    >
      <Grid size={10}>
        <Item>
          <TextareaAutosize
            maxRows={4}
            placeholder="Response"
            defaultValue={JSON.stringify(apiGetResponse, null, 2)}
            style={{
              width: '100%',
              fontSize: '0.95rem',
              fontFamily: 'Roboto, sans-serif',
              border: '1px solid #ccc',
              height: '27rem',
              outline: 'none',
              resize: 'vertical',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'border 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.border = '1px solid #3f51b5'
              e.target.style.boxShadow = '0 0 0 3px rgba(63, 81, 181, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid #ccc'
              e.target.style.boxShadow = 'none'
            }}
          />
        </Item>
      </Grid>
    </Grid>
  )
}
