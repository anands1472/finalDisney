import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import {
  Typography,
  TextField,
  Autocomplete,
  Button,
  Grid,
  Box
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { getMetaData } from '../../../features/sampleSlice'
import { useSelector, useDispatch } from 'react-redux'
import './styles.css'
import { fetchStageApiCall, resetData } from '../../../features/stageSlice'
import get from 'lodash/get'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  padding: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

const SearchForm = () => {
  const dispatch = useDispatch()
  const metaData = useSelector(getMetaData)

  const errorSchema = yup.object({
    environment: yup.object().required('Environment is required'),
    brand: yup.object().required('Brand is required'),
    application: yup.object().required('Application is required'),
    url: yup.object().required('URL is required'),
    hubId: yup.string().required('Hub ID is required')
  })

  const defaultValue = {
    environment: null,
    brand: null,
    application: null,
    url: null,
    hubId: ''
  }
  const { brands: brandsOptions, environments: environmentOptions } = metaData
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(errorSchema),
    defaultValues: defaultValue
  })
  const watchEnvironment = watch('environment')
  const watchBrand = watch('brand')
  const watchApplication = watch('application')
  const watchUrl = watch('url')
  const watchHubId = watch('hubId')

  const getApplicationOptions = (data, env, brand) => {
    const appNamesKey = `${brand}_APP_NAMES`
    return data?.[env]?.[brand]?.[appNamesKey] || []
  }

  const getAppUrlsByAppName = (data, env, brand, appName) => {
    const appUrlsKey = `${brand}_APP_URLS`
    return data?.[env]?.[brand]?.[appUrlsKey]?.[appName] || []
  }

  const applicationOptions = getApplicationOptions(
    metaData,
    watchEnvironment?.value,
    watchBrand?.value
  )
  const urlOptions = getAppUrlsByAppName(
    metaData,
    watchEnvironment?.value,
    watchBrand?.value,
    watchApplication?.value
  )

  const handleReset = () => {
    dispatch(resetData())
    reset(defaultValue)
  }
  const onSubmit = (data) => {
    const customPayload = {
      application: get(data, 'application.value', null),
      brand: get(data, 'brand.value', null),
      environment: get(data, 'environment.value', null),
      hubId: get(data, 'hubId', null),
      url: get(data, 'url.value', null),
      getUrl: get(data, 'url.getApi', null)
    }
    dispatch(fetchStageApiCall(customPayload))
  }

  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        spacing={2}
      >
        <Grid size={{ xs: 6, md: 10 }}>
          <Item>
            <Box sx={{ maxWidth: '100%', padding: 2 }}>
              <Grid container spacing={2} style={{ paddingBottom: '1rem' }}>
                <Grid item xs={12} md={6}>
                  <Typography
                    gutterBottom
                    style={{ fontSize: 16, fontWeight: 700, color: '#000' }}
                  >
                    Select Fields for Clear Cache
                  </Typography>
                </Grid>
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={4} xs={12} sm={12} size={3}>
                    <Controller
                      name="environment"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          onChange={(_, value) => field.onChange(value)}
                          options={environmentOptions}
                          size="small"
                          slotProps={{
                            paper: {
                              sx: {
                                fontSize: '0.8rem' // ✅ Smaller font size for dropdown items
                              }
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 4]
                                  }
                                }
                              ]
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select a Environment"
                              fullWidth
                              error={!!errors.environment}
                              helperText={errors.environment?.message}
                              sx={{
                                fontSize: '0.8rem', // Input font size
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  fontSize: '0.8rem', // Input value font size
                                  height: 40, // Optional: reduce overall height
                                  borderRadius: 2,
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                },
                                '& .MuiInputLabel-root': {
                                  fontSize: '0.75rem', // Label font size
                                  fontWeight: 700
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: '0.8rem', // Placeholder & typed text
                                  paddingY: 1
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* Color */}
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={12} size={3}>
                    <Controller
                      name="brand"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          onChange={(_, value) => field.onChange(value)}
                          options={brandsOptions}
                          size="small"
                          slotProps={{
                            paper: {
                              sx: {
                                fontSize: '0.8rem' // ✅ Smaller font size for dropdown items
                              }
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 4]
                                  }
                                }
                              ]
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select a Brand"
                              fullWidth
                              error={!!errors.brand}
                              helperText={errors.brand?.message}
                              sx={{
                                fontSize: '0.8rem', // Input font size
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  fontSize: '0.8rem', // Input value font size
                                  height: 40, // Optional: reduce overall height
                                  borderRadius: 2,
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                },
                                '& .MuiInputLabel-root': {
                                  fontSize: '0.75rem', // Label font size
                                  fontWeight: 700
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: '0.8rem', // Placeholder & typed text
                                  paddingY: 1
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={12} size={3}>
                    <Controller
                      name="application"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          onChange={(_, value) => field.onChange(value)}
                          options={applicationOptions}
                          size="small"
                          slotProps={{
                            paper: {
                              sx: {
                                fontSize: '0.8rem' // ✅ Smaller font size for dropdown items
                              }
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 4]
                                  }
                                }
                              ]
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select an Application"
                              fullWidth
                              error={!!errors.application}
                              helperText={errors.application?.message}
                              sx={{
                                fontSize: '0.8rem', // Input font size
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  fontSize: '0.8rem', // Input value font size
                                  height: 40, // Optional: reduce overall height
                                  borderRadius: 2,
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                },
                                '& .MuiInputLabel-root': {
                                  fontSize: '0.75rem', // Label font size
                                  fontWeight: 700
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: '0.8rem', // Placeholder & typed text
                                  paddingY: 1
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={12} size={3}>
                    <Controller
                      name="hubId"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="HUB ID"
                          variant="outlined"
                          fullWidth
                          error={!!errors.hubId}
                          helperText={errors.hubId?.message}
                          size="small"
                          slotProps={{
                            paper: {
                              sx: {
                                fontSize: '0.8rem' // ✅ Smaller font size for dropdown items
                              }
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 4]
                                  }
                                }
                              ]
                            }
                          }}
                          sx={{
                            fontSize: '0.8rem', // Input font size
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                              fontSize: '0.8rem', // Input value font size
                              height: 40, // Optional: reduce overall height
                              borderRadius: 2,
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '0.75rem', // Label font size
                              fontWeight: 700
                            },
                            '& .MuiInputBase-input': {
                              fontSize: '0.8rem', // Placeholder & typed text
                              paddingY: 1
                            }
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={12} size={6}>
                    <Controller
                      name="url"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          onChange={(_, value) => field.onChange(value)}
                          options={urlOptions}
                          size="small"
                          slotProps={{
                            paper: {
                              sx: {
                                fontSize: '0.8rem' // ✅ Smaller font size for dropdown items
                              }
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 4]
                                  }
                                }
                              ]
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select a URL"
                              fullWidth
                              error={!!errors.url}
                              helperText={errors.url?.message}
                              sx={{
                                fontSize: '0.8rem', // Input font size
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  fontSize: '0.8rem', // Input value font size
                                  height: 40, // Optional: reduce overall height
                                  borderRadius: 2,
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                },
                                '& .MuiInputLabel-root': {
                                  fontSize: '0.75rem', // Label font size
                                  fontWeight: 700
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: '0.8rem', // Placeholder & typed text
                                  paddingY: 1
                                }
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  spacing={2}
                  style={{ padding: '1rem' }}
                >
                  {/* Submit Button */}
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={4} size={2}>
                    <Button
                      onClick={handleReset}
                      variant="contained"
                      color="primary"
                      fullWidth
                      className="button-secondry"
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xl={3} lg={3} md={4} xs={12} sm={4} size={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      className="button-primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </>
  )
}

export default SearchForm
