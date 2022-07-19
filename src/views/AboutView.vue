<script setup lang="ts">
import { QPage, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Links, Icon } from '@/constants/ui-enums'
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white">
          <div class="text-h3">About</div>
          <div class="text-subtitle1">Fitness Tracker created by Michael Joy</div>
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
