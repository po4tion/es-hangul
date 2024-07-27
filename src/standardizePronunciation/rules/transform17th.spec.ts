import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform17th } from './transform17th';

describe('transform17th', () => {
  it('받침 "ㄷ", "ㅌ(ㄾ)"이 조사나 접미사의 모음 "ㅣ"와 결합되는 경우에는, "ㅈ", "ㅊ"으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('굳'));
    const next = defined(disassembleCompleteHangulCharacter('이'));

    expect(transform17th(current, next)).toEqual({
      current: {
        first: 'ㄱ',
        middle: 'ㅜ',
        last: '',
      },
      next: {
        first: 'ㅈ',
        middle: 'ㅣ',
        last: '',
      },
    });
  });

  it('"ㄷ" 뒤에 접미사 "히"가 결합되어 "티"를 이루는 것은 "치"로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('굳'));
    const next = defined(disassembleCompleteHangulCharacter('히'));

    expect(transform17th(current, next)).toEqual({
      current: {
        first: 'ㄱ',
        middle: 'ㅜ',
        last: '',
      },
      next: {
        first: 'ㅊ',
        middle: 'ㅣ',
        last: '',
      },
    });
  });
});
