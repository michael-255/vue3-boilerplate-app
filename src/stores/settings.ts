import { DexieTable, SettingKey } from '@/constants/data-enums'
import { database } from '@/services/LocalDatabase'
import { defineStore } from 'pinia'

/**
 * @todo Typescript for the state?
 */
export const useSettingsStore = defineStore({
  id: 'settings',

  state: () => ({
    DEBUG: false,
    NOTIFY: false,
  }),

  actions: {
    async initSettings(): Promise<void> {
      const DEBUG = await database.getById(DexieTable.SETTINGS, SettingKey.DEBUG)
      const NOTIFY = await database.getById(DexieTable.SETTINGS, SettingKey.NOTIFY)

      const addSetting = async (id: SettingKey, value: boolean | string | number) => {
        return await database.add(DexieTable.SETTINGS, { id, value })
      }

      if (!DEBUG) {
        await addSetting(SettingKey.DEBUG, false)
      }
      if (!NOTIFY) {
        await addSetting(SettingKey.NOTIFY, false)
      }
    },

    async setDEBUG(bool: boolean): Promise<void> {
      await database.updateById(DexieTable.SETTINGS, SettingKey.DEBUG, !!bool)
      this.DEBUG = !!bool
    },

    async setNOTIFY(bool: boolean): Promise<void> {
      await database.updateById(DexieTable.SETTINGS, SettingKey.NOTIFY, !!bool)
      this.NOTIFY = !!bool
    },
  },
})
