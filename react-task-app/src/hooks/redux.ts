import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const logger = useSelector((state: RootState) => state.logger);
