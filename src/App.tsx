import type { Emoji } from 'emoji-datasource/emoji.json';
import { type ChangeEventHandler, type FC, useCallback, useState } from 'react';
import { display, groupEmoji, queryEmoji, randomEmoji } from './emoji';

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

const copyEmoji = async (emoji: Emoji) => {
  const text = display(emoji.unified);
  await navigator.clipboard.writeText(text);
  alert(`Copied ${emoji.name} "${text}" to clipboard`);
};

const useInputValue = <Value extends string>(
  initialValue: Value
): [Value, ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState<Value>(initialValue);
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(event.currentTarget.value as Value);
    },
    []
  );
  return [value, handleChange];
};

export const App: FC = () => {
  const [query, handleChangeQuery] = useInputValue<string>('');

  return (
    <main className="min-h-full p-4 space-y-4 flex flex-col items-center max-w-2xl w-full mx-auto">
      <h1 className="font-black text-3xl">Emoji Picker</h1>
      <label className="flex flex-col space-y-2 w-full sticky">
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
      <div className="space-y-4 w-full">
        {Array.from(groupEmoji(queryEmoji(query))).map(
          ([category, subcategories]) => (
            <details key={category} className="w-full space-y-2" open>
              <summary>
                <span className="font-bold">{category}</span>
              </summary>

              {Array.from(subcategories).map(([subcategory, items]) => (
                <div key={subcategory}>
                  <h2>{subcategory}</h2>

                  <div className="flex flex-wrap gap-2">
                    {items.map((emoji) => (
                      <span
                        key={emoji.unified}
                        className="tooltip"
                        data-tip={emoji.name}
                      >
                        <button
                          className="btn btn-sm"
                          onClick={() => copyEmoji(emoji)}
                        >
                          {display(emoji.unified)}
                        </button>
                      </span>
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
