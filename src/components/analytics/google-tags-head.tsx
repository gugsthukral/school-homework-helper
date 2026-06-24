import { analyticsConfig } from "@/lib/analytics-config";
import { googleTagsEnabled } from "@/lib/google-tags-config";

/**
 * Server-rendered Google tags in <head> so Search Console and crawlers see gtag.js
 * in the initial HTML (client-only Script components only emit preload links).
 */
export function GoogleTagsHead() {
  if (!googleTagsEnabled()) return null;

  const { measurementId } = analyticsConfig;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `,
        }}
      />
      {analyticsConfig.enabled && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                gtag('config', '${measurementId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
