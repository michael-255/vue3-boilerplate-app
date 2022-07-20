import { DexieTable, SettingKey } from '@/constants/data-enums'
import type { ISetting } from '@/models/Setting'
import { db } from '@/services/LocalDatabase'
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
      const DEBUG: ISetting | undefined = await db.getById(DexieTable.SETTINGS, SettingKey.DEBUG)
      const NOTIFY: ISetting | undefined = await db.getById(DexieTable.SETTINGS, SettingKey.NOTIFY)

      const addSetting = async (id: SettingKey, value: boolean | string | number) => {
        return await db.add(DexieTable.SETTINGS, { id, value })
      }

      if (!DEBUG) {
        await addSetting(SettingKey.DEBUG, false)
      } else {
        this.DEBUG = DEBUG.value as boolean
      }
      if (!NOTIFY) {
        await addSetting(SettingKey.NOTIFY, false)
      } else {
        this.NOTIFY = NOTIFY.value as boolean
      }
    },

    async setDEBUG(bool: boolean): Promise<void> {
      await db.updateById(DexieTable.SETTINGS, SettingKey.DEBUG, { value: !!bool })
      this.DEBUG = !!bool
    },

    async setNOTIFY(bool: boolean): Promise<void> {
      await db.updateById(DexieTable.SETTINGS, SettingKey.NOTIFY, { value: !!bool })
      this.NOTIFY = !!bool
    },
  },
})
