import React from 'react'
import HomeComponent from '../Components/HomeComponent';
import BasicLayout from '../Layouts/BasicLayout/BasicLayout';

export default function Home() {
  var sideBarData = 'akash';
  return (
    <BasicLayout sideBarData={sideBarData}>
      <HomeComponent />
    </BasicLayout>
  )
}
