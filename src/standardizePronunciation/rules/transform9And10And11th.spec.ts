import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform9And10And11th } from './transform9And10And11th';

describe('transform9And10And11th', () => {
  it('9항 - 받침 "ㄲ, ㅋ" / "ㅅ, ㅆ, ㅈ, ㅊ, ㅌ" / "ㅍ"은 어말 또는 자음 앞에서 각각 대표음 "ㄱ, ㄷ, ㅂ"으로 발음한다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('닦'));
    const next = disassembleCompleteHangulCharacter('다');

    expect(transform9And10And11th(current, next)).toEqual({
      current: {
        first: 'ㄷ',
        middle: 'ㅏ',
        last: 'ㄱ',
      },
    });
  });

  it('10항 - 겹받침 "ㄳ" / "ㄵ" / "ㄼ, ㄽ, ㄾ" / "ㅄ"은 어말 또는 자음 앞에서 각각 "ㄱ, ㄴ, ㄹ, ㅂ"으로 발음한다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('앉'));
    const next = disassembleCompleteHangulCharacter('다');

    expect(transform9And10And11th(current, next)).toEqual({
      current: {
        first: 'ㅇ',
        middle: 'ㅏ',
        last: 'ㄴ',
      },
    });
  });

  it('11항 - 겹받침 "ㄺ" / "ㄻ" / "ㄿ"은 어말 또는 자음 앞에서 각각 "ㄱ, ㅁ, ㅂ"으로 발음한다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('흙'));
    const next = disassembleCompleteHangulCharacter('과');

    expect(transform9And10And11th(current, next)).toEqual({
      current: {
        first: 'ㅎ',
        middle: 'ㅡ',
        last: 'ㄱ',
      },
    });
  });
});
