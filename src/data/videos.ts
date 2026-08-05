export type SiteVideo = {
  id: string;
  label: string;
  title: string;
  src: string;
  poster?: string;
  description?: string;
  date?: string;
};

export const SITE_VIDEOS: SiteVideo[] = [
  {
    id: "rgmlS8vWfuCD8XUAhyXk6M28W3gSfppUAG4XTrXfL6U",
    label: "ベースボールクラブ",
    title: "卒業のメンバー「またな！！」",
    src: "/videos/rgmlS8vWfuCD8XUAhyXk6M28W3gSfppUAG4XTrXfL6U.mp4",
    poster: "/videos/posters/baseball_matana.jpg",
  },
  {
    id: "video_608853753726763115-ztUU8t63",
    label: "風舞流曲技太鼓",
    title: "お釈迦様生誕祭に夜桜公演としてお招きいただきました",
    src: "/videos/video_608853753726763115-ztUU8t63.mp4",
    poster: "/videos/posters/taiko_yozakura.jpg",
  },
  {
    id: "video_609845645553434999-GkpsXeXK",
    label: "器械体操教室",
    title: "初めてのリレー",
    src: "/videos/video_609845645553434999-GkpsXeXK.mp4",
    poster: "/videos/posters/taiso_relay.jpg",
  },
  {
    id: "taiso_bakuten",
    label: "器械体操教室",
    title: "丹波市やまなみ小学生体操教室",
    src: "/videos/taiso_bakuten.mp4",
  },
];
