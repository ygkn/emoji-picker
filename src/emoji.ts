import emojiJson, { Emoji } from 'emoji-datasource/emoji.json';

export type EmojiSource = 'unicode' | 'twemoji' | 'noto';
export type ImageType = 'svg' | 'png';

export class ImageNotFoundError extends Error {
  constructor(unified: string, source: EmojiSource, type: ImageType) {
    super(
      `Image not found for emoji: ${display(unified)} from ${source} ${type}`
    );
  }
}

export const display = (emoji: Emoji['unified']): string =>
  String.fromCodePoint(...emoji.split('-').map((code) => parseInt(code, 16)));

export const queryEmoji = (query: string): Emoji[] =>
  query === ''
    ? emojiJson
    : emojiJson.filter(
        (emoji: Emoji) =>
          display(emoji.unified) === query ||
          emoji.name.toLowerCase().includes(query) ||
          emoji.short_names.some((name) => name.includes(query))
      );

export const groupEmoji = (
  emoji: Emoji[]
): Map<Emoji['category'], Map<Emoji['subcategory'], Emoji[]>> =>
  emoji.reduce((accumulator, emoji) => {
    const category = accumulator.get(emoji.category);
    if (category !== undefined) {
      const subcategory = category.get(emoji.subcategory);
      if (subcategory !== undefined) {
        subcategory.push(emoji);
      } else {
        category.set(emoji.subcategory, [emoji]);
      }
    } else {
      accumulator.set(emoji.category, new Map([[emoji.subcategory, [emoji]]]));
    }
    return accumulator;
  }, new Map());

export const randomEmoji = (): Emoji =>
  emojiJson[Math.floor(Math.random() * emojiJson.length)]!;

export const copyEmoji = async (
  unified: Emoji['unified'],
  emojiSource: EmojiSource,
  imageType: ImageType
) => {
  if (emojiSource === 'unicode') {
    await navigator.clipboard.writeText(display(unified));
  }
  if (emojiSource === 'twemoji') {
    if (imageType === 'svg') {
      const result = await fetch(`twemoji/svg/${unified.toLowerCase()}.svg`);
      if (result.status === 200) {
        const text = await result.text();
        await navigator.clipboard.writeText(text);
      } else {
        throw new ImageNotFoundError(unified, emojiSource, imageType);
      }
    }
    if (imageType === 'png') {
      const result = await fetch(`twemoji/72x72/${unified.toLowerCase()}.png`);
      if (result.status === 200) {
        const blob = await result.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
      } else {
        throw new ImageNotFoundError(unified, emojiSource, imageType);
      }
    }
  }
  if (emojiSource === 'noto') {
    if (imageType === 'svg') {
      const result = await fetch(
        `noto-emoji/svg/emoji_u${unified.toLowerCase()}.svg`
      );
      if (result.status === 200) {
        const text = await result.text();
        await navigator.clipboard.writeText(text);
      } else {
        throw new ImageNotFoundError(unified, emojiSource, imageType);
      }
    }
    if (imageType === 'png') {
      const result = await fetch(
        `noto-emoji/72/emoji_u${unified.toLowerCase()}.png`
      );
      if (result.status === 200) {
        const blob = await result.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
      } else {
        throw new ImageNotFoundError(unified, emojiSource, imageType);
      }
    }
  }
};

if (import.meta.vitest) {
  const { test, it, expect } = import.meta.vitest;

  test('display', () => {
    it('should display emoji', () => {
      expect(display('1F914')).toBe('🤔');
      expect(display('1F97A')).toBe('🥺');
      expect(display('1F468-200D-1F469-200D-1F467-200D-1F466')).toBe('👨‍👩‍👧‍👦');
    });
  });

  test('queryEmoji', () => {
    it('should query emoji', () => {
      expect(queryEmoji('thinking').map((emoji) => emoji.unified)).toEqual([
        '1F914',
      ]);
    });
  });

  test('groupEmoji', () => {
    it('should group emoji', () => {
      const grouped = groupEmoji(emojiJson);

      expect(grouped.size).toBe(10);
      expect(grouped.has('Smileys & Emotion')).toBe(true);
      expect(grouped.get('Smileys & Emotion')?.has('face-smiling')).toBe(true);
      expect(
        grouped
          .get('Smileys & Emotion')
          ?.get('face-smiling')
          ?.every(
            (emoji) =>
              emoji.category === 'Smileys & Emotion' &&
              emoji.subcategory === 'face-smiling'
          )
      ).toBe(true);
    });
  });
}
