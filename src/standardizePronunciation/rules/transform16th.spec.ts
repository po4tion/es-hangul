import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform16th } from './transform16th';

describe('transform16th', () => {
  it('한글 자모의 이름은 그 받침소리를 연음하되, "ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ"의 경우에는 특별히 다음과 같이 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('귿'));
    const next = defined(disassembleCompleteHangulCharacter('이'));
    const phrase = '디귿이';
    const index = 1;

    expect(
      transform16th({
        currentSyllable: current,
        nextSyllable: next,
        index,
        phrase,
      })
    ).toEqual({
      current: {
        first: 'ㄱ',
        middle: 'ㅡ',
        last: '',
      },
      next: {
        first: 'ㅅ',
        middle: 'ㅣ',
        last: '',
      },
    });
  });

  it('자모의 이름이 "ㄱ, ㄴ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ"일 경우', () => {
    const current = defined(disassembleCompleteHangulCharacter('역'));
    const next = defined(disassembleCompleteHangulCharacter('이'));
    const phrase = '기역이';
    const index = 1;

    expect(
      transform16th({
        currentSyllable: current,
        nextSyllable: next,
        index,
        phrase,
      })
    ).toEqual({
      current: {
        first: 'ㅇ',
        middle: 'ㅕ',
        last: '',
      },
      next: {
        first: 'ㄱ',
        middle: 'ㅣ',
        last: '',
      },
    });
  });
});
