<script setup lang="ts">
import { QPage, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon, Views } from '@/constants/ui-enums'
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard style="max-width: 300px">
        <QCardSection class="bg-deep-purple text-white">
          <div class="text-h3">404</div>
          <div class="text-subtitle1">Page Not Found</div>
        </QCardSection>

        <QCardActions align="left">
          <QBtn flat :to="{ name: Views.DASHBOARD }" :icon="Icon.UNDO" label="Back to Dashboard" />
        </QCardActions>
      </QCard>
    </div>
  </QPage>
</template>
