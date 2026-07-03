import type { AppScreen } from '@/types/common';

/**
 * TODO: Implement analytics tracking.
 * Recommended integrations: Google Analytics 4, Mixpanel, or Posthog.
 *
 * Events to track:
 * - Screen views (trackScreen)
 * - Step completions (trackStepComplete)
 * - Score generated (trackScoreGenerated)
 * - Product recommendation shown (trackRecommendationShown)
 * - CTA clicks (trackCTAClick)
 */

export function trackScreen(screen: AppScreen): void {
  // TODO: gtag('event', 'page_view', { page_title: screen });
  console.log('[analytics] Screen:', screen);
}

export function trackStepComplete(level: 1 | 2, step: number): void {
  // TODO: gtag('event', 'step_complete', { level, step });
  console.log('[analytics] Step complete:', { level, step });
}

export function trackScoreGenerated(score: number, stage: string): void {
  // TODO: gtag('event', 'score_generated', { score, stage });
  console.log('[analytics] Score generated:', { score, stage });
}

export function trackCTAClick(cta: string): void {
  // TODO: gtag('event', 'cta_click', { cta_name: cta });
  console.log('[analytics] CTA click:', cta);
}
