import emojiJson, { Emoji } from 'emoji-datasource/emoji.json';

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
