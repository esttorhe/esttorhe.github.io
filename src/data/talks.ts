// ABOUTME: Talks shelf — manually-curated archive of Esteban's conference talks. Hugo-era port.
// ABOUTME: Cover image URLs are Speaker Deck og:image (hot-linked; cached at the data layer).

export interface Talk {
  /** Talk title. Backticks in the original Hugo data render as code spans; keep them. */
  title: string;
  /** ISO date string YYYY-MM-DD. The talk date, not when the slides were published. */
  date: string;
  /** Conference / venue display name. */
  conference: string;
  /** Conference homepage / lineup link, when one exists / still resolves. */
  conferenceUrl?: string;
  /** City + country shorthand, or 'Online'. Hidden when absent. */
  location?: string;
  /** Speaker Deck or other slides URL. */
  slidesUrl?: string;
  /** Video URL (Skills Matter, Vimeo, YouTube). Skills Matter URLs may 404 — they shut down. */
  videoUrl?: string;
  /**
   * Cover image URL — typically the Speaker Deck og:image. Fall back to the
   * Sigil compact SVG when absent.
   */
  coverImage?: string;
  /** Optional one-line description; if absent the title carries the row. */
  description?: string;
}

/**
 * Talks in reverse-chronological order. Newest first.
 */
export const talks: Talk[] = [
  {
    title: 'Facing the `VIPER`',
    date: '2017-09-15',
    conference: 'NSSpain',
    conferenceUrl: 'http://nsspain.com',
    location: 'Logroño, Spain',
    slidesUrl: 'https://speakerdeck.com/esttorhe/facing-the-viper',
    videoUrl: 'https://vimeo.com/album/4786409/video/235312913',
    coverImage:
      'https://files.speakerdeck.com/presentations/29e4ca1b60b9451cb8ddb45db97f11ab/slide_0.jpg?8590915',
  },
  {
    title: '`MVVM(DC)`: Taming your architecture',
    date: '2017-02-16',
    conference: 'MobOS',
    conferenceUrl: 'http://romobos.com/agenda-2',
    location: 'Cluj-Napoca, Romania',
    slidesUrl: 'https://speakerdeck.com/esttorhe/mvvm-dc-taming-your-architecture',
    coverImage:
      'https://files.speakerdeck.com/presentations/badd9436b19b4f2ea7ee6d41c788d279/slide_0.jpg?7604246',
  },
  {
    title: 'Hacking (?) `SiriKit`',
    date: '2016-10-16',
    conference: 'Mobilization',
    conferenceUrl: 'http://2016.mobilization.pl',
    location: 'Łódź, Poland',
    slidesUrl: 'https://speakerdeck.com/esttorhe/hacking-siriki-mobilization-2016',
    coverImage:
      'https://files.speakerdeck.com/presentations/b19b1c9bd1a941cbb2a0203e8dc82bcb/slide_0.jpg?7087679',
  },
  {
    title: '`MVVM` + `RxSwift` + DataControllers',
    date: '2016-09-16',
    conference: 'NSSpain',
    conferenceUrl: 'http://nsspain.com',
    location: 'Logroño, Spain',
    slidesUrl: 'https://speakerdeck.com/esttorhe/mvvm-plus-rxswift-plus-datacontrollers-1',
    coverImage:
      'https://files.speakerdeck.com/presentations/c70ac241bfe040babb8089e589fe22b3/slide_0.jpg?6843486',
  },
  {
    title: "`Xcode`'s 8 Source Editor Extensions",
    date: '2016-06-28',
    conference: 'CocoaHeads Costa Rica',
    location: 'San José, Costa Rica',
    slidesUrl: 'https://speakerdeck.com/esttorhe/xcodes-8-source-editor-extensions',
    coverImage:
      'https://files.speakerdeck.com/presentations/b95485e40d28466699e0f76be1af5dda/slide_0.jpg?6592494',
  },
  {
    title: '`MVVM` + `RxSwift` + DataControllers',
    date: '2016-05-26',
    conference: 'iOScon',
    location: 'London, UK',
    slidesUrl: 'https://speakerdeck.com/esttorhe/mvvm-plus-rxswift-plus-datacontrollers',
    videoUrl: 'https://skillsmatter.com/skillscasts/7863-mvvm-rxswift-and-datacontrollers',
    coverImage:
      'https://files.speakerdeck.com/presentations/7d5ec318cd9744f69818c716a2fc1642/slide_0.jpg?6396471',
  },
  {
    title: 'Using `Jekyll` & `Octopress`',
    date: '2015-06-12',
    conference: 'Log(n) Tech Talks',
    location: 'San José, Costa Rica',
    slidesUrl: 'https://speakerdeck.com/esttorhe/using-jekyll-and-octopress',
    coverImage:
      'https://files.speakerdeck.com/presentations/56b126e53c83418a991f4abc63270437/slide_0.jpg?4916082',
  },
  {
    title: 'Continuous Delivery for iOS Apps',
    date: '2015-04-21',
    conference: 'CocoaHeads Costa Rica',
    location: 'San José, Costa Rica',
    slidesUrl: 'https://speakerdeck.com/esttorhe/continuos-delivery-for-ios-apps',
    coverImage:
      'https://files.speakerdeck.com/presentations/ce3838a631c543bead75c2fad41ba0a9/slide_0.jpg?4693595',
  },
];
