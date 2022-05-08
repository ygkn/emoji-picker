declare module 'emoji-datasource/emoji.json' {
  export type Emoji = {
    name: string;
    unified: string;
    non_qualified: string | null;
    short_name: string;
    short_names: string[];
    text: string | null;
    texts: string[] | null;
    category: string;
    subcategory: string;
  };
  const emoji: Emoji[];
  export = emoji;
}
