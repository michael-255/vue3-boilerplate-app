<script setup lang="ts">
import { QPage, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Links, Icon, Strings } from '@/constants/ui-enums'
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white text-h3">About</QCardSection>

        <QCardSection>
          {{ Strings.APP_NAME }} is a Vue 3 Typescript project created by michael-255 on GitHub
        </QCardSection>

        <QCardActions align="left">
          <QBtn
            class="q-my-sm"
            color="primary"
            label="GitHub"
            target="_blank"
            :href="Links.GITHUB"
            :icon="Icon.CODE"
          />

          <QBtn
            disable
            color="primary"
            label="My Apps"
            target="_blank"
            :href="Links.MYAPPS"
            :icon="Icon.WEB"
          />
        </QCardActions>
      </QCard>
    </div>
  </QPage>
</template>
