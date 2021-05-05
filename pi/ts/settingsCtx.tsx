import React from 'react'
import TogglClient from '../../plugin/ts/toggl-client'
import StreamDeckClient from '../../plugin/ts/sd-client'

export const defaultContext = {}

export type IAccounts = Record<string, {
  name: string
  id: string
  apiToken: string
}>

export interface IContext {
  togglClient?: TogglClient
  sdClient?: StreamDeckClient
  accounts?: IAccounts
  selectedAccount?: string | number // done
  actionType?: string
  entryName?: string // done
  buttonLabel?: string
  projectId?: string
  workspaceId?: string
  tags?: string[]
  billable?: boolean
}

function createCtx (defaultValue: IContext): any {
  type UpdateType = React.Dispatch<React.SetStateAction<IContext>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate
  })

  const Provider = (props: React.PropsWithChildren<Record<string, unknown>>): React.ReactElement => {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }} {...props} />
  }

  return [ctx, Provider] as const
}

const [ctx, Provider] = createCtx(defaultContext)

export const SettingsContext = ctx
export const SettingsProvider = Provider