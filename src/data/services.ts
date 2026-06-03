type ScheduleInfo = {
  dayOfWeek?: string;
  venueName?: string;
  time?: string;
  target?: string;
};

export const SERVICES: Record<
  string,
  {
    title: string;
    bodyText: string;
    metaDescription: string;
    keywords: string;
    image: string;
    imageAlt: string;
    schedule?: ScheduleInfo;
  }
> = {
  taiko: {
    title: "風舞流曲技太鼓(ふうぶりゅうきょくぎだいこ)",
    bodyText:
      "鼓道会、鼓蝶会、鼓粋会を中心に芸術性を重視した唯一無二の曲技太鼓。様々な方が在籍されております。一緒に和太鼓を始めませんか？",
    metaDescription:
      "風舞流曲技太鼓（和太鼓・太鼓）の教室です。芸術性を重視した曲技太鼓。太鼓を始めたい方、アーティストモーションで一緒に和太鼓を楽しみませんか。只今準備中、しばらくお待ちください。",
    keywords: "風舞流曲技太鼓,太鼓,和太鼓,曲技太鼓,太鼓 教室,和太鼓 教室,アーティストモーション",
    image: "/images/taiko/shinichi_shihan1.jpeg",
    imageAlt: "風舞流曲技太鼓（和太鼓・太鼓）集合写真",
    schedule: {
      dayOfWeek: "日曜日、火曜日",
      venueName: "神戸市北区神田道場、丹波市山南町やまなみホール",
      time: "",
      target: "大人",
    },
  },
  baseball: {
    title: "ベースボールクラブ",
    bodyText:
      "低学年を中心にこれから野球を始めたいお子様を対象にしております。野球の楽しさが詰まった新しい形の野球スクールです。",
    metaDescription:
      "丹波市の野球・ベースボールクラブ（野球クラブ）です。低学年を中心にこれから野球を始めたいお子様向け。丹波市山南町を拠点とした野球スクール。アーティストモーション、只今準備中、しばらくお待ちください。",
    keywords: "ベースボールクラブ,野球クラブ,野球,野球 教室,ベースボール,少年野球,丹波市,丹波市 野球,丹波 野球クラブ,山南町,アーティストモーション",
    image: "/images/baseball/baseball_swing.jpeg",
    imageAlt: "野球・ベースボールクラブ",
    schedule: {
      dayOfWeek: "木曜日",
      venueName: "丹波市立山南中学校",
      time: "18:30〜20:00",
      target: "年長〜小学2年生&野球初心者",
    },
  },
  taiso: {
    title: "器械体操教室",
    bodyText:
      "「回る、逆さになる」といった体操要素はもちろん様々な運動を取り入れた教室。保護者と三位一体でお子様の心身の成長をサポートします。",
    metaDescription:
      "器械体操教室です。回る・逆さになるといった体操要素と様々な運動を取り入れ、お子様の心身の成長をサポート。体操教室をお探しならアーティストモーション。只今準備中、しばらくお待ちください。",
    keywords: "器械体操,器械体操教室,体操教室,体操,アーティストモーション",
    image: "/images/taiso/taiso1.jpeg",
    imageAlt: "器械体操教室",
    schedule: {
      dayOfWeek: "月〜木曜日",
      venueName: "三田市狭間が丘教室\n丹波市やまなみ教室\nスポーツクラブNAS教室",
      time: "",
      target: "",
    },
  },
  fitness: {
    title: "フィットネスクラス",
    bodyText:
      "パーソナルトレーニング（個別指導）からエアロビクス（グループレッスン）まで対応。「運動を始めたい」「筋肉をつけたい」「シェイプアップしたい」という方、まずはご相談を！",
    metaDescription:
      "フィットネスクラスです。パーソナルトレーニングからエアロビクスまで。運動を始めたい・筋肉をつけたい・シェイプアップしたい方、アーティストモーションでご相談ください。只今準備中、しばらくお待ちください。",
    keywords: "フィットネス,フィットネスクラス,パーソナルトレーニング,エアロビクス,アーティストモーション",
    image: "/images/fitness/image.jpg",
    imageAlt: "フィットネスクラス",
    schedule: {
      dayOfWeek: "",
      venueName: "西脇NIBBジム、久下自治会館",
      time: "",
      target: "",
    },
  },
};
