/* eslint-disable import/no-mutable-exports */
import { latestVars } from './env.latest'
import { stageVars } from './env.stage'

let envConfig = {}

/**
 * ENV_VAR is a global variable set by the server.js
 */
switch ('env') {
  case 'stage':
    envConfig = stageVars
    break
  case 'latest':
    envConfig = latestVars
    break
  default:
    envConfig = stageVars
}

export { envConfig }
