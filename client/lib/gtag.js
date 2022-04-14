export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}

/*
    Below is a reference for what is needed.

    This goes into the app file 

    import Script from 'next/script'
    import { useRouter } from 'next/router'
    import * as gtag from '../lib/gtag'

    const router = useRouter(
    useEffect(() => {
        const handleRouteChange = (url) => {
        gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
        router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

    The below would go into the return for the _app file.

    <Script
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script
    id="gtag-init"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
    __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
        page_path: window.location.pathname,
        });
    `,
    }}

    import * as gtag from '../lib/gtag'

    Below is an example of how to use a google analytics with a form onsubmit.
    Action, category, and label can be found in google documents.
    Choose the one we want to use.

    gtag.event({
        action: 'submit_form',
        category: 'Contact',
        label: this.state.message,
        })

*/