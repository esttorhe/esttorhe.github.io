// ABOUTME: Defines the grouped narrative for /cv/ — companies (or eras) bundled with a short paragraph + the roles inside.
// ABOUTME: Narratives are drawn strictly from the role descriptions in external/cv/cv.md (no invented metrics or stories).

export interface CvGroup {
  /** Group heading — usually a company + city. */
  title: string;
  /** Span covering the entire group. Drives the mono kicker beside the title. */
  dateRange: string;
  /** 1–3 sentence narrative summarising the group; rendered as prose above the role list. */
  narrative: string;
  /**
   * Stable role keys (matches cvParser's `key`: `${company}|${title}`) that
   * belong to this group, in display order (newest first within the group).
   */
  roleKeys: string[];
}

/**
 * Group display order. Top of the list shows first on the page.
 */
export const cvGroups: CvGroup[] = [
  {
    title: 'Zenjob · Berlin',
    dateRange: 'May 2023 → present',
    narrative:
      'Joined as Engineering Manager for the Platform & Infrastructure team, scaled it to introduce KPIs, an API Gateway, and an APM service, and cut CI/CD duration and instability by over 50%. Promoted to Head of Engineering for the Supply vertical and then to Head of Platform Engineering — now leading cost reduction, the DataDog rollout, IaC-standardised alerting, and the move to Slack-first incident response.',
    roleKeys: [
      'Zenjob|Head of Platform Engineering',
      'Zenjob|Head of Engineering (Supply Vertical)',
      'Zenjob|Engineering Manager',
    ],
  },
  {
    title: 'Spotify · Berlin',
    dateRange: 'Jan 2022 → May 2023',
    narrative:
      'Led a highly distributed team across Sweden, the UK, Germany, Colorado, and New York to ship the first three monetised Backstage plugins and lay the foundations for the plugin marketplace — a new revenue stream for Spotify.',
    roleKeys: ['Spotify|Engineering Manager'],
  },
  {
    title: 'SoundCloud · Berlin',
    dateRange: 'Oct 2016 → Jan 2022',
    narrative:
      'Joined to architect modular iOS framework extractions and integrate the in-house media player. Moved into Core Clients, writing Swift services that cut compile times by seven minutes and reduced flaky-test churn through CI metrics tooling. Ended leading the Back-End Engineering Productivity team alongside Core Clients, supporting the JVMKit library that underpins SoundCloud’s microservices.',
    roleKeys: [
      'SoundCloud|BEEP Engineering Manager',
      'SoundCloud|Core Clients Engineer',
      'SoundCloud|iOS Developer',
    ],
  },
  {
    title: 'Berlin · parallel ventures',
    dateRange: '2015 → 2021',
    narrative:
      'Reactive iOS work at Brewbot — introducing ViewModel + DataControllers and integrating fastlane into the delivery flow. In parallel, co-founded Craft Kollective, a weekly local-beer subscription for offices that ran from 2015 to 2021.',
    roleKeys: ['Brewbot|iOS Developer', 'Craft Kollective|Co Founder'],
  },
  {
    title: 'Costa Rica · iOS leadership',
    dateRange: '2010 → 2015',
    narrative:
      'Six years across iOS consultancies and small ventures in San José. Built the iOS practice at Samtec (a six-developer team with a career path program), led mobile at Log(n) (four engineers, CI established on Mac Minis with Buildasaur), and tech-led at Mobiquity on a Hollywood document manager. Plus contract iOS work at Kidaptive and a short-lived self-started studio (Little Maven Bird) with a friend in Austin.',
    roleKeys: [
      'Log(n)|Senior iOS Developer | Mobile Lead Engineer',
      'Kidaptive, Inc.|iOS Developer',
      'Mobiquity|iOS Senior Developer (Tech Lead)',
      'Samtec|iOS Technical Lead',
      'Little Maven Bird|iOS Analyst and Developer',
    ],
  },
  {
    title: 'Early career',
    dateRange: '2005 → 2009',
    narrative:
      'Backend software analyst work before the iOS turn. Code generation and Reflection-based plugin infrastructure at Global Processing Services; Flash + COM bridges for GEFanuc shop-floor manufacturing software at SlimSoft; a brief turn at EtereaSoft in Java/.NET consultancy.',
    roleKeys: [
      'SlimSoft Solutions Inc.|Software Analyst and Developer',
      'Global Processing Services|Software Analyst and Developer',
      'EtereaSoft S.A.|Software Analyst and Developer',
    ],
  },
];

/** Build a Map keyed by role-key for O(1) group lookup during render. */
export function buildRoleToGroupIndex(): Map<string, CvGroup> {
  const index = new Map<string, CvGroup>();
  for (const group of cvGroups) {
    for (const key of group.roleKeys) {
      index.set(key, group);
    }
  }
  return index;
}
