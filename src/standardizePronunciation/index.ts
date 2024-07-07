import { joinString } from '../_internal';
import { isHangulAlphabet, isHangulCharacter } from '../_internal/hangul';
import { combineHangulCharacter } from '../combineHangulCharacter';
import { disassembleCompleteHangulCharacter } from '../disassembleCompleteHangulCharacter';
import { isNotUndefined } from '../utils';
import {
  Nullable,
  applyㄴㄹ덧남,
  apply경음화,
  apply제12항,
  apply제13과14항,
  apply제16항,
  apply제17항,
  apply제18항,
  apply제19항,
  apply제20항,
  apply제9와10과11항,
  type Syllable,
} from './standardizePronunciation.rules';

type Options = {
  hardConversion: boolean;
};

type NotHangul = {
  index: number;
  syllable: string;
};

/**
 * 주어진 한글 문자열을 표준 발음으로 변환합니다.
 * @param hangul 한글 문자열을 입력합니다.
 * @param options 변환 옵션을 설정합니다.
 * @param options.hardConversion 경음화 등의 된소리를 적용할지 여부를 설정합니다. 기본값은 true입니다.
 * @returns 변환된 표준 발음 문자열을 반환합니다.
 */
export function standardizePronunciation(hangul: string, options: Options = { hardConversion: true }): string {
  if (!hangul) {
    return '';
  }

  const processSyllables = (syllables: Syllable[], phrase: string, options: Options) =>
    syllables.map((currentSyllable, I, array) => {
      const nextSyllable = I < array.length - 1 ? array[I + 1] : null;

      const { current, next } = applyRules({
        currentSyllable,
        phrase,
        index: I,
        nextSyllable,
        options,
      });

      if (next) {
        array[I + 1] = next;
      }

      return current;
    });

  const transformHangulPhrase = (phrase: string, options: Options): string => {
    const { notHangulPhrase, disassembleHangul } = 음절분해(phrase);
    const processedSyllables = processSyllables(disassembleHangul, phrase, options);

    return assembleChangedHangul(processedSyllables, notHangulPhrase);
  };

  return hangul
    .split(' ')
    .map(phrase => transformHangulPhrase(phrase, options))
    .join(' ');
}

function 음절분해(hangulPhrase: string): {
  notHangulPhrase: NotHangul[];
  disassembleHangul: Syllable[];
} {
  const notHangulPhrase: NotHangul[] = [];
  const disassembleHangul = Array.from(hangulPhrase)
    .filter((syllable, index) => {
      if (!isHangulCharacter(syllable) || isHangulAlphabet(syllable)) {
        notHangulPhrase.push({
          index,
          syllable,
        });

        return false;
      }

      return true;
    })
    .map(disassembleCompleteHangulCharacter)
    .filter(isNotUndefined);

  return { notHangulPhrase, disassembleHangul };
}

type ApplyParameters = {
  currentSyllable: Syllable;
  nextSyllable: Nullable<Syllable>;
  index: number;
  phrase: string;
  options: NonNullable<Parameters<typeof standardizePronunciation>[1]>;
};

function applyRules(params: ApplyParameters): {
  current: Syllable;
  next: Nullable<Syllable>;
} {
  const { currentSyllable, nextSyllable, index, phrase, options } = params;

  let current = { ...currentSyllable };
  let next = nextSyllable ? { ...nextSyllable } : nextSyllable;

  if (next && options.hardConversion) {
    ({ next } = apply경음화(current, next));
  }

  if (next) {
    ({ current, next } = apply제16항({
      currentSyllable: current,
      nextSyllable: next,
      index,
      phrase,
    }));
    ({ current, next } = apply제17항(current, next));
    ({ next } = apply제19항(current, next));
    ({ current, next } = applyㄴㄹ덧남(current, next));
    ({ current } = apply제18항(current, next));
    ({ current, next } = apply제20항(current, next));
  }

  ({ current, next } = apply제12항(current, next));

  if (next) {
    ({ current, next } = apply제13과14항(current, next));
  }

  ({ current } = apply제9와10과11항(current, next));

  return {
    current,
    next,
  };
}

function assembleChangedHangul(disassembleHangul: Syllable[], notHangulPhrase: NotHangul[]): string {
  const changedSyllables = disassembleHangul
    .filter(isNotUndefined)
    .map(syllable => combineHangulCharacter(syllable.first, syllable.middle, syllable.last));

  for (const { index, syllable } of notHangulPhrase) {
    changedSyllables.splice(index, 0, syllable);
  }

  return joinString(...changedSyllables);
}
