import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const LoggerModal = () => {
   const logger = useSelector((state: RootState) => state.logger);
   return <div>LoggerModal</div>;
};

export default LoggerModal;
