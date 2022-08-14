import { DexieTable, SettingKey } from '@/constants/data-enums'
import type { ISetting } from '@/models/Setting'
import { DB } from '@/services/LocalDatabase'
import { defineStore, type StoreDefinition } from 'pinia'

export const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    DEBUG: false,
    NOTIFY: false,
    INFO: false,
  }),

  actions: {
    /**
     * This must be called suring app startup and after clearing the Settings table.
     */
    async initSettings(): Promise<void> {
      const debug: ISetting | undefined = await DB.getById(DexieTable.SETTINGS, SettingKey.DEBUG)
      const notify: ISetting | undefined = await DB.getById(DexieTable.SETTINGS, SettingKey.NOTIFY)
      const info: ISetting | undefined = await DB.getById(DexieTable.SETTINGS, SettingKey.INFO)

      const addSetting = async (id: SettingKey, value: boolean | string | number) => {
        return await DB.add(DexieTable.SETTINGS, { id, value })
      }

      /**
       * @see
       * MUST ADD EACH SETTING BELOW
       */
      if (!debug) {
        await addSetting(SettingKey.DEBUG, false)
      } else {
        this.DEBUG = debug.value as boolean
      }
      if (!notify) {
        await addSetting(SettingKey.NOTIFY, false)
      } else {
        this.NOTIFY = notify.value as boolean
      }
      if (!info) {
        await addSetting(SettingKey.INFO, false)
      } else {
        this.INFO = info.value as boolean
      }
    },

    async setDEBUG(bool: boolean): Promise<void> {
      await DB.updateById(DexieTable.SETTINGS, SettingKey.DEBUG, { value: !!bool })
      this.DEBUG = !!bool
    },

    async setNOTIFY(bool: boolean): Promise<void> {
      await DB.updateById(DexieTable.SETTINGS, SettingKey.NOTIFY, { value: !!bool })
      this.NOTIFY = !!bool
    },

    async setINFO(bool: boolean): Promise<void> {
      await DB.updateById(DexieTable.SETTINGS, SettingKey.INFO, { value: !!bool })
      this.INFO = !!bool
    },
  },
})
