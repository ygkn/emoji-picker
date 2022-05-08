import {
  type ChangeEventHandler,
  type FC,
  useCallback,
  useState,
  MouseEventHandler,
} from 'react';
import {
  copyEmoji,
  display,
  EmojiSource,
  groupEmoji,
  ImageType,
  queryEmoji,
  randomEmoji,
} from './emoji';

const placeholderEmoji = randomEmoji();

const placeholder = [
  placeholderEmoji.short_name,
  placeholderEmoji.name.toLowerCase() === placeholderEmoji.short_name
    ? ''
    : placeholderEmoji.name.toLowerCase(),
  display(placeholderEmoji.unified),
  placeholderEmoji.text,
]
  .filter(Boolean)
  .map((text) => `"${text}"`)
  .join(' or ');

const useInputValue = <Value extends string>(
  initialValue: Value,
  options?: {
    checkable?: boolean;
  }
): [Value, ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState<Value>(initialValue);
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (options?.checkable && !event.currentTarget.checked) {
        return;
      }
      setValue(event.currentTarget.value as Value);
    },
    [options]
  );
  return [value, handleChange];
};

export const App: FC = () => {
  const [query, handleChangeQuery] = useInputValue<string>('');
  const [source, handleChangeSource] = useInputValue<EmojiSource>('unicode');
  const [imageType, handleChangeImageType] = useInputValue<ImageType>('svg');

  const handleClickEmoji = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      const unified = event.currentTarget.dataset['emojiUnified'];
      if (unified === undefined) {
        throw new Error('data-emoji-unified is undefined');
      }

      try {
        await copyEmoji(unified, source, imageType);

        alert(
          `Copied ${display(unified)} as ${
            source !== 'unicode' ? `${source} ${imageType}` : 'text'
          } to clipboard!`
        );
      } catch (e) {
        if (e instanceof Error) {
          alert(e);
        } else {
          throw e;
        }
      }
    },
    [source, imageType]
  );

  return (
    <main className="flex flex-col gap-4 items-center p-4 mx-auto w-full max-w-2xl min-h-full">
      <h1 className="text-3xl font-black">
        <span aria-hidden>😃</span>
        Emoji Picker
      </h1>
      <p>Pick and copy emoji as text or image</p>
      <label className="flex sticky flex-col gap-2 w-full">
        <span>Input emoji query here</span>
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleChangeQuery}
          className="input input-primary"
          placeholder={placeholder}
        />
      </label>
      <div className="flex flex-wrap gap-4">
        {(
          [
            {
              values: ['unicode', 'twemoji', 'noto'],
              current: source,
              label: 'Source',
              onChange: handleChangeSource,
            },
            {
              values: ['svg', 'png'],
              current: imageType,
              label: 'Image type',
              onChange: handleChangeImageType,
            },
          ] as const
        ).map(({ values, current, label, onChange }, index) => (
          <div key={label} className="flex gap-2 items-center">
            <div className="font-bold">{label}</div>
            {values.map((value) => (
              <label key={value} className="cursor-pointer label">
                <input
                  type="radio"
                  value={value}
                  className={`radio ${
                    ['radio-primary', 'radio-secondary'][index]
                  }`}
                  checked={value === current}
                  onChange={onChange}
                  disabled={source === 'unicode' && label === 'Image type'}
                />
                <span className="inline-block pl-2 label-text">{value}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-4 w-full">
        {Array.from(groupEmoji(queryEmoji(query))).map(
          ([category, subcategories]) => (
            <details key={category} className="space-y-2 w-full" open>
              <summary>
                <span className="font-bold">{category}</span>
              </summary>

              {Array.from(subcategories).map(([subcategory, items]) => (
                <div key={subcategory}>
                  <h2>{subcategory}</h2>

                  <div className="flex flex-wrap gap-2">
                    {items.map((emoji) => (
                      <button
                        key={emoji.unified}
                        className="btn btn-sm"
                        onClick={handleClickEmoji}
                        data-emoji-unified={emoji.unified}
                        title={emoji.name.toLowerCase()}
                      >
                        {display(emoji.unified)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </details>
          )
        )}
      </div>
    </main>
  );
};
