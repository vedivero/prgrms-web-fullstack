import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

// export const listsContainer = style({
//    height: 'max-content',
//    display: 'flex',
//    flexWrap: 'wrap',
//    rowGap: vars.spacing.listSpacing,
//    margin: vars.spacing.listSpacing,
// });

export const listsContainer = style({
   display: 'flex',
   flexDirection: 'row',
   gap: vars.spacing.listSpacing,
   margin: vars.spacing.listSpacing,
   overflowX: 'auto', // 가로 스크롤 가능
   width: '100%', // 부모 컨테이너에 맞추기
});
