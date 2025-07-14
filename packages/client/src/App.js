import React, { useEffect, useState } from 'react'
import { fetchSample } from './features/sampleSlice'
import { useSelector, useDispatch } from 'react-redux'
const App = () => {
  //const [backend, setBackend] = useState()
  const dispatch = useDispatch()
  // const getstroeData = useSelector(getData)
  
  // useEffect(() => {
  //   fetch("/api/disney/sampleApi")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackend(data);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(fetchSample())
  }, [])

  return <>sample data</>
}
export default App
