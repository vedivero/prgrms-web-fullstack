import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

// export const container = style({
//    display: 'flex',
//    flexDirection: 'row',
//    alignItems: 'center',
//    flexWrap: 'wrap',
//    rowGap: 15,
//    minHeight: 'max-content',
//    padding: vars.spacing.big2,
//    backgroundColor: vars.color.mainDarker,
// });
export const container = style({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'flex-start', // 왼쪽 정렬
   alignItems: 'flex-start', // 상단 정렬
   gap: vars.spacing.listSpacing, // 리스트 간 간격 유지
   padding: vars.spacing.big2,
   backgroundColor: vars.color.mainDarker,
   overflowX: 'auto', // 스크롤 가능
   height: '100%', // 컨테이너가 꽉 차도록 설정
});

export const title = style({
   color: vars.color.brightText,
   fontSize: vars.fontSizing.T2,
   marginRight: vars.spacing.big1,
});
export const addButton = style({
   color: vars.color.brightText,
   fontSize: vars.fontSizing.T2,
   cursor: 'pointer',
   marginLeft: vars.spacing.big1,
   ':hover': {
      opacity: 0.8,
   },
});
export const boardItem = style({
   color: vars.color.brightText,
   fontSize: vars.fontSizing.ТЗ,
   backgroundColor: vars.color.mainFaded,
   padding: vars.spacing.medium,
   borderRadius: 10,
   cursor: 'pointer',
   marginRight: vars.spacing.big1,
   ':hover': {
      opacity: 0.8,
      transform: 'scale(1.03)',
   },
});
export const boardItemActive = style({
   color: vars.color.brightText,
   fontSize: vars.fontSizing.ТЗ,
   backgroundColor: vars.color.selectedTab,
   padding: vars.spacing.medium,
   borderRadius: 10,
   cursor: 'pointer',
   marginRight: vars.spacing.big1,
});
export const addSection = style({
   display: 'flex',
   alignItems: 'center',
   marginLeft: 'auto',
});
export const smallTitle = style({
   color: vars.color.brightText,
   fontSize: vars.fontSizing.ТЗ,
});
