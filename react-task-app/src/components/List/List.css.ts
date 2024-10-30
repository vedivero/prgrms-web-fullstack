import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

// export const listWrapper = style({
//    display: 'flex',
//    flexDirection: 'column',
//    marginRight: vars.spacing.listSpacing,
//    padding: vars.spacing.big2,
//    minWidth: vars.minWidth.list,
//    width: 'max-content',
//    height: 'max-content',
//    borderRadius: 10,
//    backgroundColor: vars.color.list,
// });
export const listWrapper = style({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between', // 내부 아이템 간의 간격 균일하게 설정
   marginRight: vars.spacing.listSpacing,
   padding: vars.spacing.big2,
   minWidth: vars.minWidth.list,
   width: '300px', // 고정 폭 설정으로 리스트의 정렬 보장
   height: 'auto',
   borderRadius: 10,
   backgroundColor: vars.color.list,
});

export const header = style({
   display: 'flex',
   alignItems: 'center',
});
export const name = style({
   fontSize: vars.fontSizing.T3,
   marginBottom: vars.spacing.big2,
});
export const deleteButton = style({
   padding: vars.spacing.small,
   borderRadius: 20,
   fontSize: vars.fontSizing.T2,
   marginLeft: 'auto',
   marginTop: '-15px',
   marginRight: '5px',
   cursor: 'pointer',
   ':hover': {
      backgroundColor: vars.color.task,
      boxShadow: vars.shadow.basic,
      opacity: 0.8,
   },
});
