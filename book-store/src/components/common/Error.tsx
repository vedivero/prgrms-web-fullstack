import { useRouteError } from 'react-router-dom';

interface RouteError {
   statusText?: string;
   message?: string;
}

function Error() {
   const error = useRouteError() as RouteError;
   return (
      <div>
         <h1>존재하지 않는 페이지 입니다.</h1>
         <p>{error.statusText}</p>
         <p>{error.message}</p>
      </div>
   );
}

export default Error;
