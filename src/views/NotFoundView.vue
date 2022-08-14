<script setup lang="ts">
import { QPage, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon, View } from '@/constants/ui-enums'
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard style="width: 320px">
        <QCardSection class="bg-deep-purple text-white">
          <div class="text-h3">404</div>
          <div class="text-subtitle1">Page Not Found</div>
        </QCardSection>

        <QCardActions align="left">
          <QBtn flat :to="{ name: View.DASHBOARD }" :icon="Icon.UNDO" label="Return to Dashboard" />
        </QCardActions>
      </QCard>
    </div>
  </QPage>
</template>
