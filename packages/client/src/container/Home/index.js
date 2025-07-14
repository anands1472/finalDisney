import React, { useEffect } from 'react'
import { fetchSample } from '../../features/sampleSlice'
import { useDispatch, useSelector } from 'react-redux'
import Page from '../../components/Page'
import SearchForm from '../Search/SearchForm'
import ResponseForm from '../Search/ResponseForm'
import BackDropLoading from '../../components/BackDropLoading'
import { status, showComponent } from '../../features/stageSlice'
const Home = () => {
  const dispatch = useDispatch()
  const getStatus = useSelector(status)
  const isComponent = useSelector(showComponent)
  useEffect(() => {
    dispatch(fetchSample())
  }, [])

  return (
    <Page style={{ marginTop: '4rem' }}>
      {getStatus === 'loading' ? (
        <BackDropLoading />
      ) : (
        <>
          <SearchForm />
          {isComponent && <ResponseForm />}
        </>
      )}
    </Page>
  )
}
export default Home
