import React, { Component } from 'react';

interface MyProps {
   weather: string;
   children: React.ReactNode;
}

// const MyWeather: React.FC<MyProps> = (props) => {
const MyWeather: React.FC<MyProps> = ({ children, weather }) => {
   //const { children, weather } = props;

   return (
      <div>
         {children}
         <p />
         {/* 오늘의 날씨는 {props.weather} 입니다. */}
         오늘의 날씨는 {weather} 입니다.
      </div>
   );
};

class MyWeather2 extends Component<MyProps> {
   render() {
      const { children, weather } = this.props;
      return (
         <div>
            {children}
            <p></p>오늘의 날씨는 {weather}입니다.
         </div>
      );
   }
}

export default MyWeather;
