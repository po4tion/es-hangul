---
title: romanize
---

# romanize

Change the Hangul string to Roman.

For detailed examples, see below.

```typescript
function romanize(hangul: string): string;
```

## Examples

```tsx
romanize('백마'); // 'baengma'
romanize('학여울'); // 'hangnyeoul'
romanize('해돋이'); // 'haedoji'
romanize('좋고'); // 'joko'
romanize('압구정'); // 'apgujeong'
romanize('구미'); // 'gumi'
romanize('대관령'); // 'daegwallyeong'
romanize('ㄱ'); // 'g'
romanize('한국어!'); // 'hangugeo!'
romanize('안녕하세요'); // 'annyeonghaseyo'
```
