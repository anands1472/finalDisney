const forge = require('node-forge')

export const encryptPassword = async (props) => {
  return new Promise((resolve, reject) => {
    try{
      const key = props.key || '$napRestAd@@2019'
      const iv = props.iv || 'AODVNUASDNVVAOVF'
      const cipher = forge.cipher.createCipher('AES-CBC', key)
      cipher.start({ iv })
      cipher.update(forge.util.createBuffer(props.password))
      cipher.finish()
      const encrypted = cipher.output
      const finalEncrypted = forge.util.encode64(encrypted.data)
      resolve(finalEncrypted)
    } catch (e){
      reject(e)
    }
  })
}

export const fillQueryParams = (path, params) => {
  Object.keys(params).forEach(key => {
    if (path.indexOf('?') === -1) {
      path += `${key}=${params[key]}`
    } else {
      path += `&${key}=${params[key]}`
    }
  })
  return path
}

const paramExp = /:([^/]+)/g

export const fillPathParams = (path, params) =>
  path.replace(paramExp, (m, p1) => params[p1])
