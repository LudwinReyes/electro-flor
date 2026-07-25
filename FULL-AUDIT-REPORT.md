# Full Audit Report

- URL: `https://electroflorperu.com/`
- Generated: `2026-07-24T19:21:44.982203`
- Overall score: `56/100`
- Score confidence: `Medium`
- Scoring version: `1`

## Score Card

| Category | Weight | Score |
| --- | ---: | ---: |
| Security Headers | 8 | 55 |
| Social Meta | 5 | 62 |
| Robots and Crawlers | 8 | 80 |
| Broken Links | 10 | 100 |
| Internal Links | 8 | 60 |
| Redirects | 3 | 100 |
| AI Search | 5 | 0 |
| Performance and Core Web Vitals | 13 | 0 |
| On-Page SEO | 10 | 100 |
| Readability | 8 | 0 |
| Entity SEO | 5 | 0 |
| Link Profile | 7 | 55 |
| Hreflang | 5 | 0 |
| Content Uniqueness | 5 | 0 |

## Findings

| Severity | Area | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- |
| Critical | Schema | No Organization/Person entity found in JSON-LD. |  | Add Organization or Person schema with name, url, logo, and sameAs properties. |
| Critical | environment | 4 security headers missing | Missing headers reduce trust and can expose the site to browser/security risks. | Set headers via server config (Nginx/Apache) or CDN edge rules. |
| Critical | link_profile | 7 orphan page(s) with zero inbound internal links. |  | Add internal links from relevant content pages to these orphan pages. |
| Critical | security | 🔴 4 security headers missing — poor security posture |  |  |
| Critical | social | 🔴 Missing required: og:image |  |  |
| Critical | social | 🔴 Missing required: og:url |  |  |
| Warning | environment | Meta description is missing or out of range | This can reduce SERP CTR and snippet quality. | Use your SEO plugin (Yoast/RankMath/AIOSEO) or theme templates to set title/meta and OG/Twitter tags. |
| Warning | environment | No llms.txt found | AI crawlers and assistants have no curated machine-readable guidance for key pages. | Create /llms.txt at web root or route it through your web server. |
| Warning | environment | Social meta tags are incomplete | Missing OG/Twitter tags weakens social previews and share quality. | Use your SEO plugin (Yoast/RankMath/AIOSEO) or theme templates to set title/meta and OG/Twitter tags. |
| Warning | environment | Content readability is difficult | Long, complex text can reduce engagement and comprehension. | Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings. |
| Warning | internal_links | ⚠️ 16 potential orphan page(s) (≤1 internal link pointing to them) |  |  |
| Warning | internal_links | ⚠️ 9 link(s) have no anchor text |  |  |
| Warning | readability | ⚠️ Content is difficult to read (Flesch: 0) — may reduce engagement |  |  |
| Warning | readability | ⚠️ 40.7% complex words (3+ syllables) — consider simplifying |  |  |
| Warning | readability | ⚠️ Thin content (81 words) — may rank poorly |  |  |
| Warning | robots | ⚠️ 11 AI crawlers not explicitly managed: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended |  |  |
| Warning | security | ⚠️ HSTS missing includeSubDomains directive |  |  |
| Info | Wikidata | No Wikidata entry found for 'ELECTRO FLOR'. |  | If the entity meets Wikidata notability guidelines, create or improve an item with accurate third-party references. Do not create one solely for SEO. |
| Info | Wikipedia | No Wikipedia article found for 'ELECTRO FLOR'. |  | Only pursue Wikipedia if the entity meets independent notability standards. Otherwise, strengthen official schema, sameAs profiles, citations, and About/Contact signals. |
| Info | environment | Performance measurement incomplete | PageSpeed API returned an error, so CWV recommendations are less reliable. | Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output. |
| info | pagespeed | pagespeed measurement incomplete | Rate limited by Google API. Wait a few minutes or add an API key. | Rerun this check after resolving the environment/API/network limitation. |
| Info | sameAs | Missing sameAs link to Wikipedia (Primary KG signal). |  | Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO. |
| Info | sameAs | Missing sameAs link to Wikidata (Primary KG signal). |  | Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO. |
| Info | sameAs | Missing sameAs link to LinkedIn (Strong KG signal). |  | Add 'linkedin.com' profile URL to sameAs array in your entity schema. |
| Info | sameAs | Missing sameAs link to Twitter/X (Strong KG signal). |  | Add 'x.com' profile URL to sameAs array in your entity schema. |

## Measurement Notes

1 checks returned errors or incomplete measurements; treat affected scores as directional.
