'use client'

import { useTranslation } from '../lib/i18n/useTranslation'

export default function ErrorComponent () {
  const { t } = useTranslation()
  return <section>{t('error.generic')}</section>
}
