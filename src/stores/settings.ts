import { SettingKey } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * App settings state.
 */
const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    DEBUG: false,
    NOTIFY: false,
    INFO: false,
  }),

  actions: {
    /**
     * This must be called during app startup so the store is properly initialized.
     */
    async initSettings(): Promise<void> {
      await DB.initSettings()
      this.DEBUG = (await DB.getSetting(SettingKey.DEBUG))?.value as boolean
      this.NOTIFY = (await DB.getSetting(SettingKey.NOTIFY))?.value as boolean
      this.INFO = (await DB.getSetting(SettingKey.INFO))?.value as boolean
    },

    async setDEBUG(bool: boolean): Promise<void> {
      await DB.updateSetting(SettingKey.DEBUG, !!bool)
      this.DEBUG = !!bool
    },

    async setNOTIFY(bool: boolean): Promise<void> {
      await DB.updateSetting(SettingKey.NOTIFY, !!bool)
      this.NOTIFY = !!bool
    },

    async setINFO(bool: boolean): Promise<void> {
      await DB.updateSetting(SettingKey.INFO, !!bool)
      this.INFO = !!bool
    },
  },
})

export default useSettingsStore
